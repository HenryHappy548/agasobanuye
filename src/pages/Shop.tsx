import { useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { ExternalLink, Percent, ShoppingBag, Truck, Shield, Tag, Loader2, Search, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import StreamingHeader from '@/components/StreamingHeader';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';

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

const categoryLabels: Record<string, string> = {
  all: 'Byose',
  phones: '📱 Telefoni',
  watches: '⌚ Amasaha',
  shoes: '👟 Inkweto',
  motorcycle: '🏍️ Moto',
  audio: '🎧 Muzika',
  solar: '☀️ Solar',
  bags: '🎒 Ibikapu',
  fashion: '👔 Imyenda',
  computers: '💻 Mudasobwa',
  security: '📹 Umutekano',
  beauty: '💄 Ubwiza',
  tools: '🔧 Ibikoresho',
  kitchen: '🍳 Igikoni',
  lighting: '💡 Amatara',
  gaming: '🎮 Imikino',
  general: '🛍️ Ibindi'
};

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleProducts, setVisibleProducts] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchProducts();
  }, []);

  // Staggered fade-in animation
  useEffect(() => {
    if (!loading && products.length > 0) {
      const timer = setTimeout(() => {
        products.forEach((product, index) => {
          setTimeout(() => {
            setVisibleProducts(prev => new Set([...prev, product.id]));
          }, index * 30); // 30ms stagger
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading, products]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .limit(500);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    const cats = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];
    return cats.sort((a, b) => {
      if (a === 'all') return -1;
      if (b === 'all') return 1;
      return (categoryLabels[a] || a).localeCompare(categoryLabels[b] || b);
    });
  }, [products]);
  
  const filteredProducts = useMemo(() => {
    let result = products;
    
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        (p.category && p.category.toLowerCase().includes(query))
      );
    }
    
    return result;
  }, [products, selectedCategory, searchQuery]);

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
        <meta name="description" content="Best tech deals on electronics, phones, watches, shoes and more. Shop 200+ products with prices in Rwandan Francs (RWF). Free worldwide shipping." />
        <link rel="canonical" href="https://rwaflix.store/shop" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <StreamingHeader onSearch={() => {}} searchQuery="" onPlayVideo={() => {}} />
        
        {/* Hero Banner with smooth gradient animation */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-background to-primary/10 py-10 sm:py-16 px-4">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent animate-pulse" style={{ animationDuration: '4s' }} />
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4 animate-[fadeIn_0.6s_ease-out]">
              <Tag className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              <span className="bg-destructive text-destructive-foreground text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                🎉 Ubucuruzi Bwiza - Kugeza 60% OFF
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-3 animate-[fadeIn_0.8s_ease-out]">
              Ibicuruzwa Byiza Cyane
            </h1>
            <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-4 animate-[fadeIn_1s_ease-out]">
              Gura telefoni, amasaha, inkweto, moto n'ibindi byinshi. Ibiciro biri mu RWF.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm animate-[fadeIn_1.2s_ease-out]">
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full font-semibold">
                {products.length}+ Ibicuruzwa
              </span>
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-semibold">
                Kohereza Hirya no hino
              </span>
            </div>
          </div>
        </div>

        {/* Features with smooth entrance */}
        <div className="bg-card/50 border-y border-border/30 py-4 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-3 gap-2 sm:gap-4">
            {[
              { icon: Truck, text: 'Kohereza Hirya no hino' },
              { icon: Shield, text: 'Umutekano w\'Uguzi' },
              { icon: ShoppingBag, text: 'Ibiciro Byiza' }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="flex items-center justify-center gap-1 sm:gap-2 text-center opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                <span className="text-[10px] sm:text-sm text-muted-foreground">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Search Bar with smooth focus */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 pt-6">
          <div className="relative max-w-md mx-auto mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors" />
            <Input
              type="text"
              placeholder="Shakisha ibicuruzwa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 bg-card border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Category Filter with smooth scroll */}
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide scroll-smooth">
            {categories.map((cat, index) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setVisibleProducts(new Set());
                  setTimeout(() => {
                    filteredProducts.forEach((product, i) => {
                      setTimeout(() => {
                        setVisibleProducts(prev => new Set([...prev, product.id]));
                      }, i * 20);
                    });
                  }, 100);
                }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'bg-card text-muted-foreground hover:bg-card/80 border border-border hover:border-primary/50'
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid with staggered fade-in */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-10">
          <h2 className="text-lg sm:text-2xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            {categoryLabels[selectedCategory] || selectedCategory}
            <span className="text-sm font-normal text-muted-foreground">
              ({filteredProducts.length})
            </span>
          </h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-muted-foreground animate-pulse">Gushakisha ibicuruzwa...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">Nta bicuruzwa byabonetse muri iyi kategori.</p>
              <button 
                onClick={() => setSelectedCategory('all')}
                className="mt-4 text-primary hover:underline"
              >
                Reba byose →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {filteredProducts.map((product, index) => {
                const discount = getDiscount(product);
                const isVisible = visibleProducts.has(product.id);
                
                return (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className={`group cursor-pointer bg-card hover:bg-card/80 rounded-xl p-3 sm:p-4 border border-border/50 hover:border-primary/50 relative overflow-hidden
                      transition-all duration-500 ease-out
                      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                      hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1`}
                    style={{ transitionDelay: `${Math.min(index * 20, 500)}ms` }}
                  >
                    {discount && discount > 0 && (
                      <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 z-10 animate-pulse">
                        <Percent className="w-3 h-3" />
                        -{discount}%
                      </div>
                    )}
                    
                    <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-muted/30">
                      <img
                        src={product.image_url.startsWith('//') ? `https:${product.image_url}` : product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    
                    <div className="space-y-1 sm:space-y-2">
                      <span className="text-[9px] sm:text-[10px] text-primary/80 font-medium uppercase tracking-wider">
                        {categoryLabels[product.category]?.replace(/[^\w\s]/g, '').trim() || product.category || 'General'}
                      </span>
                      
                      <h3 className="text-xs sm:text-sm font-semibold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
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
                        <span className="text-[9px] sm:text-xs text-primary group-hover:translate-x-1 transition-transform">
                          Gura →
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

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
};

export default Shop;