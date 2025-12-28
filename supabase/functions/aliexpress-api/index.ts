import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const APP_KEY = Deno.env.get('ALIEXPRESS_APP_KEY');
const APP_SECRET = Deno.env.get('ALIEXPRESS_APP_SECRET');

// Generate SHA256 signature for AliExpress API
async function generateSignature(params: Record<string, string>, apiPath?: string): Promise<string> {
  // Sort parameters by key in ASCII order
  const sortedKeys = Object.keys(params).sort();
  
  // Concatenate sorted parameters and values
  let signString = sortedKeys.map(key => `${key}${params[key]}`).join('');
  
  // For system interfaces (like /auth/token/create), prepend API path
  if (apiPath) {
    signString = apiPath + signString;
  }
  
  // Generate HMAC-SHA256 signature
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
  
  // Convert to hex string
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
}

// Search products by keyword
async function searchProducts(keyword: string, pageNo: number = 1, pageSize: number = 20) {
  const timestamp = Date.now().toString();
  
  const params: Record<string, string> = {
    app_key: APP_KEY!,
    timestamp,
    sign_method: 'sha256',
    method: 'aliexpress.affiliate.product.query',
    keywords: keyword,
    page_no: pageNo.toString(),
    page_size: pageSize.toString(),
    target_currency: 'USD',
    target_language: 'EN',
    sort: 'SALE_PRICE_ASC',
    ship_to_country: 'US',
  };
  
  const sign = await generateSignature(params);
  params.sign = sign;
  
  const queryString = Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
  
  const url = `https://api-sg.aliexpress.com/sync?${queryString}`;
  
  console.log('Searching products with URL:', url);
  
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  
  return await response.json();
}

// Get product details by ID
async function getProductDetails(productIds: string[]) {
  const timestamp = Date.now().toString();
  
  const params: Record<string, string> = {
    app_key: APP_KEY!,
    timestamp,
    sign_method: 'sha256',
    method: 'aliexpress.affiliate.productdetail.get',
    product_ids: productIds.join(','),
    target_currency: 'USD',
    target_language: 'EN',
    ship_to_country: 'US',
    fields: 'commission_rate,sale_price,app_sale_price,original_price,product_main_image_url,product_title,product_id,first_level_category_id,second_level_category_id,product_video_url,relevant_market_commission_rate,ship_to_days',
  };
  
  const sign = await generateSignature(params);
  params.sign = sign;
  
  const queryString = Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
  
  const url = `https://api-sg.aliexpress.com/sync?${queryString}`;
  
  console.log('Getting product details with URL:', url);
  
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  
  return await response.json();
}

// Generate affiliate link
async function generateAffiliateLink(productUrl: string) {
  const timestamp = Date.now().toString();
  
  const params: Record<string, string> = {
    app_key: APP_KEY!,
    timestamp,
    sign_method: 'sha256',
    method: 'aliexpress.affiliate.link.generate',
    source_values: productUrl,
    promotion_link_type: '0',
    tracking_id: 'default',
  };
  
  const sign = await generateSignature(params);
  params.sign = sign;
  
  const queryString = Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
  
  const url = `https://api-sg.aliexpress.com/sync?${queryString}`;
  
  console.log('Generating affiliate link with URL:', url);
  
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  
  return await response.json();
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!APP_KEY || !APP_SECRET) {
      throw new Error('AliExpress API credentials not configured');
    }

    const { action, keyword, productIds, productUrl, pageNo, pageSize } = await req.json();

    let result;

    switch (action) {
      case 'search':
        if (!keyword) throw new Error('Keyword is required for search');
        result = await searchProducts(keyword, pageNo || 1, pageSize || 20);
        break;
      
      case 'details':
        if (!productIds || !productIds.length) throw new Error('Product IDs are required');
        result = await getProductDetails(productIds);
        break;
      
      case 'affiliate':
        if (!productUrl) throw new Error('Product URL is required');
        result = await generateAffiliateLink(productUrl);
        break;
      
      default:
        throw new Error('Invalid action. Use: search, details, or affiliate');
    }

    console.log('API Response:', JSON.stringify(result, null, 2));

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
