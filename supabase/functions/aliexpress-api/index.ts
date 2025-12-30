import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const APP_KEY = Deno.env.get('ALIEXPRESS_APP_KEY');
const APP_SECRET = Deno.env.get('ALIEXPRESS_APP_SECRET');

// Fixed USD to RWF conversion rate - stable rate to prevent price fluctuations
// This is a fixed rate to ensure price consistency between website and AliExpress
const USD_TO_RWF = 1400;

// Generate SHA256 signature for AliExpress API
async function generateSignature(params: Record<string, string>, apiPath?: string): Promise<string> {
  const sortedKeys = Object.keys(params).sort();
  let signString = sortedKeys.map(key => `${key}${params[key]}`).join('');
  
  if (apiPath) {
    signString = apiPath + signString;
  }
  
  const encoder = new TextEncoder();
  const keyData = encoder.encode(APP_SECRET);
  const messageData = encoder.encode(signString);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
  
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
}

// Search products by keyword
async function searchProducts(keyword: string, pageNo: number = 1, pageSize: number = 50) {
  const timestamp = Date.now().toString();
  
  const params: Record<string, string> = {
    app_key: APP_KEY!,
    timestamp,
    sign_method: 'sha256',
    method: 'aliexpress.affiliate.product.query',
    keywords: keyword,
    page_no: pageNo.toString(),
    page_size: Math.min(pageSize, 50).toString(), // Max 50 per request
    target_currency: 'USD',
    target_language: 'EN',
    sort: 'SALE_PRICE_ASC',
    ship_to_country: 'RW', // Rwanda
  };
  
  const sign = await generateSignature(params);
  params.sign = sign;
  
  const queryString = Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
  
  const url = `https://api-sg.aliexpress.com/sync?${queryString}`;
  
  console.log('Searching products:', keyword);
  
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  
  const data = await response.json();
  
  // Transform products with RWF prices
  const products = data?.aliexpress_affiliate_product_query_response?.resp_result?.result?.products?.product || [];
  
  const transformedProducts = products.map((p: any) => {
    const salePriceUSD = parseFloat(p.target_sale_price || p.target_app_sale_price || p.sale_price || '0');
    const originalPriceUSD = parseFloat(p.target_original_price || p.original_price || '0');
    
    return {
      product_id: p.product_id,
      product_title: p.product_title,
      sale_price_usd: salePriceUSD,
      original_price_usd: originalPriceUSD,
      sale_price_rwf: Math.round(salePriceUSD * USD_TO_RWF),
      original_price_rwf: Math.round(originalPriceUSD * USD_TO_RWF),
      product_main_image_url: p.product_main_image_url,
      promotion_link: p.promotion_link,
      commission_rate: p.commission_rate,
      discount: p.discount,
      category_name: p.first_level_category_name,
    };
  });
  
  return {
    success: true,
    total_count: data?.aliexpress_affiliate_product_query_response?.resp_result?.result?.total_record_count || 0,
    products: transformedProducts,
    usd_to_rwf_rate: USD_TO_RWF,
  };
}

// Bulk import products to database
async function bulkImportProducts(keywords: string[]) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  const allProducts: any[] = [];
  
  for (const keyword of keywords) {
    try {
      const result = await searchProducts(keyword, 1, 20);
      if (result.products) {
        allProducts.push(...result.products);
      }
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Error searching "${keyword}":`, error);
    }
  }
  
  // Remove duplicates based on product_id
  const uniqueProducts = allProducts.filter((product, index, self) =>
    index === self.findIndex((p) => p.product_id === product.product_id)
  );
  
  // Map to database format with RWF prices
  // Round to nearest 100 RWF for cleaner display and to reduce minor fluctuations
  const dbProducts = uniqueProducts.map((p, index) => {
    const salePrice = Math.round(p.sale_price_rwf / 100) * 100;
    const originalPrice = Math.round(p.original_price_rwf / 100) * 100;
    
    return {
      name: p.product_title,
      price: salePrice,
      original_price: originalPrice > salePrice ? originalPrice : null,
      affiliate_link: p.promotion_link,
      image_url: p.product_main_image_url?.replace(/_\d+x\d+\./, '_800x800.') || p.product_main_image_url,
      category: mapCategory(p.category_name),
      display_order: index * 1000,
      is_active: true,
    };
  });
  
  // Insert products
  const { data, error } = await supabase
    .from('products')
    .upsert(dbProducts, { onConflict: 'affiliate_link' })
    .select();
  
  if (error) {
    console.error('Database error:', error);
    throw new Error('Failed to import products to database');
  }
  
  return {
    success: true,
    imported_count: data?.length || 0,
    products: data,
  };
}

function mapCategory(categoryName: string): string {
  const name = (categoryName || '').toLowerCase();
  if (name.includes('computer') || name.includes('office')) return 'office';
  if (name.includes('electronic') || name.includes('phone')) return 'electronics';
  if (name.includes('game') || name.includes('gaming')) return 'gaming';
  if (name.includes('accessor')) return 'accessories';
  return 'general';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!APP_KEY || !APP_SECRET) {
      throw new Error('AliExpress API credentials not configured');
    }

    const { action, keyword, keywords, pageNo, pageSize } = await req.json();

    let result;

    switch (action) {
      case 'search':
        if (!keyword) throw new Error('Keyword is required for search');
        result = await searchProducts(keyword, pageNo || 1, pageSize || 50);
        break;
      
      case 'bulk_import':
        if (!keywords || !keywords.length) throw new Error('Keywords array is required');
        result = await bulkImportProducts(keywords);
        break;
      
      default:
        throw new Error('Invalid action. Use: search or bulk_import');
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error in aliexpress-api function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
