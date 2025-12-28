import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ExternalLink, Percent, ShoppingBag, Truck, Shield, Tag, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import StreamingHeader from '@/components/StreamingHeader';
import Footer from '@/components/Footer';

interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  image_url: string;
  affiliate_link: string;
  category: string;
}

const formatRWF = (price: number) => {
  return new Intl.NumberFormat('rw-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const trackClick = async (productName: string, category: string) => {
    try {
      await supabase.from('affiliate_clicks').insert({
        product_name: productName,
        category: category || 'aliexpress',
        referrer: window.location.href,
        user_agent: navigator.userAgent
      });
    } catch (error) {
      console.error('Failed to track click:', error);
    }
  };

  const handleProductClick = (product: Product) => {
    trackClick(product.name, product.category);
    window.open(product.affiliate_link, '_blank', 'noopener,noreferrer');
  };

  const getDiscount = (product: Product) => {
    if (product.original_price && product.original_price > product.price) {
      return Math.round(((product.original_price - product.price) / product.original_price) * 100);
    }
    return null;
  };

  return (
    <>
      <Helmet>
        <title>Shop Tech Deals | RwaFlix - Best Prices in RWF</title>
        <meta name="description" content="Best tech deals on electronics, accessories and gadgets. Shop webcams, keyboards, mice and more. Prices in Rwandan Francs (RWF)." />
        <link rel="canonical" href="https://rwaflix.com/shop" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <StreamingHeader onSearch={() => {}} searchQuery="" onPlayVideo={() => {}} />
        
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 py-8 sm:py-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Tag className="w-6 h-6 sm:w-8 sm:h-8 text-primary animate-pulse" />
              <span className="bg-destructive text-destructive-foreground text-xs sm:text-sm font-bold px-3 py-1 rounded-full">
                Holiday Sale - Up to 50% OFF
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-2 sm:mb-3">
              Tech Deals & Gadgets
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Discover amazing deals on electronics, accessories and more. Quality products at unbeatable prices in RWF.
            </p>
            <p className="text-xs text-primary mt-2 font-medium">
              {products.length}+ Products Available
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-card/50 border-y border-border/50 py-4 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-3 gap-2 sm:gap-4">
            <div className="flex items-center justify-center gap-1 sm:gap-2 text-center">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
              <span className="text-[10px] sm:text-sm text-muted-foreground">Worldwide Shipping</span>
            </div>
            <div className="flex items-center justify-center gap-1 sm:gap-2 text-center">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
              <span className="text-[10px] sm:text-sm text-muted-foreground">Buyer Protection</span>
            </div>
            <div className="flex items-center justify-center gap-1 sm:gap-2 text-center">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
              <span className="text-[10px] sm:text-sm text-muted-foreground">Best Deals</span>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 pt-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-muted-foreground hover:bg-card/80 border border-border'
                }`}
              >
                {cat === 'all' ? 'All Products' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-10">
          <h2 className="text-lg sm:text-2xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            {selectedCategory === 'all' ? 'All Products' : selectedCategory}
            <span className="text-sm font-normal text-muted-foreground">
              ({filteredProducts.length})
            </span>
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              No products found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {filteredProducts.map((product) => {
                const discount = getDiscount(product);
                return (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="group cursor-pointer bg-card hover:bg-card/80 rounded-xl p-3 sm:p-4 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 border border-border/50 hover:border-primary/50 relative overflow-hidden"
                  >
                    {discount && discount > 0 && (
                      <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 z-10">
                        <Percent className="w-3 h-3" />
                        -{discount}%
                      </div>
                    )}
                    
                    <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-muted/30">
                      <img
                        src={product.image_url.startsWith('//') ? `https:${product.image_url}` : product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    
                    <div className="space-y-1 sm:space-y-2">
                      <span className="text-[9px] sm:text-[10px] text-primary/80 font-medium uppercase tracking-wider">
                        {product.category || 'General'}
                      </span>
                      
                      <h3 className="text-xs sm:text-sm font-semibold text-foreground line-clamp-2 leading-snug">
                        {product.name}
                      </h3>
                      
                      <div className="flex flex-col gap-0.5 pt-1 sm:pt-2">
                        <span className="text-sm sm:text-base font-bold text-primary">
                          {formatRWF(product.price)}
                        </span>
                        {product.original_price && product.original_price > product.price && (
                          <span className="text-[10px] sm:text-xs text-muted-foreground line-through">
                            {formatRWF(product.original_price)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between pt-1 sm:pt-2">
                        <div className="flex items-center gap-1 text-[9px] sm:text-xs text-muted-foreground">
                          <ExternalLink className="w-3 h-3" />
                          <span>AliExpress</span>
                        </div>
                        <span className="text-[9px] sm:text-xs text-primary group-hover:underline">
                          View Deal →
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Shop;
