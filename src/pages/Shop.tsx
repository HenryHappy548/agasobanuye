import { Helmet } from 'react-helmet-async';
import { ExternalLink, Percent, ShoppingBag, Truck, Shield, Tag } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import StreamingHeader from '@/components/StreamingHeader';
import Footer from '@/components/Footer';

interface Product {
  id: string;
  name: string;
  nameKiny: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  link: string;
  category: string;
}

const products: Product[] = [
  {
    id: '1',
    name: '1.4K Webcam Video Camera',
    nameKiny: 'Kamera ya Webcam 1.4K',
    description: 'High quality webcam for video calls, streaming and recording. Crystal clear 1.4K resolution.',
    price: 15,
    image: '//ae01.alicdn.com/kf/S5a92eb021da345619f82e7b374534e04R.jpg_140x140.jpg',
    link: 'https://s.click.aliexpress.com/e/_c3GAXAgz',
    category: 'Cameras'
  },
  {
    id: '2',
    name: 'Dell Latitude Laptop Battery 7.6V 60Wh',
    nameKiny: 'Bateri ya Laptop Dell Latitude',
    description: 'Compatible with Dell Latitude 12/13/14 7000 series. Long lasting 60Wh capacity.',
    price: 45,
    image: '//ae01.alicdn.com/kf/S7ff0e74d17654b769fff5149dc211494f.jpg_80x80.jpg',
    link: 'https://s.click.aliexpress.com/e/_c3qSkcdr',
    category: 'Laptop Parts'
  },
  {
    id: '3',
    name: 'Ergonomic Wrist Rest Mouse Pad',
    nameKiny: 'Pad ya Mouse Yorohereza Ikiganza',
    description: 'Memory foam wrist rest for comfortable typing. Protects wrists during long work sessions.',
    price: 12,
    image: '//ae01.alicdn.com/kf/Se9da8d9466e2445eb9ac3a20d171f0af1.jpg_80x80.jpg',
    link: 'https://s.click.aliexpress.com/e/_c3wYqicl',
    category: 'Accessories'
  },
  {
    id: '4',
    name: 'USB RGB Gaming Keyboard 104 Keys',
    nameKiny: 'Keyboard ya Gaming RGB',
    description: 'Mechanical feel gaming keyboard with RGB lighting. 104 keys standard layout.',
    price: 25,
    image: '//ae01.alicdn.com/kf/S5bcf260555154f15b22c45593ed17ab1q.jpg_80x80.jpg',
    link: 'https://s.click.aliexpress.com/e/_c4DRQ3yZ',
    category: 'Keyboards'
  },
  {
    id: '5',
    name: 'Wireless Bluetooth Mouse RGB Rechargeable',
    nameKiny: 'Mouse Idakoresha Insinga RGB',
    description: 'Dual mode Bluetooth and 2.4GHz wireless. Rechargeable with RGB lighting. Silent click.',
    price: 14,
    originalPrice: 20,
    discount: 30,
    image: '//ae01.alicdn.com/kf/S1e7037b8c29f412e8ef76ea446a331eew.jpg_80x80.jpg',
    link: 'https://s.click.aliexpress.com/e/_c2Q9SY5X',
    category: 'Mouse'
  },
  {
    id: '6',
    name: '2.4GHz Mini Wireless Gaming Mouse',
    nameKiny: 'Mouse Nto ya Gaming',
    description: 'Compact wireless mouse with USB receiver. 1200 DPI optical sensor for gaming.',
    price: 8,
    image: '//ae01.alicdn.com/kf/Hbd41dfce4913479c98abe35b9a1e76abq.jpg_80x80.jpg',
    link: 'https://s.click.aliexpress.com/e/_c3w9muS1',
    category: 'Mouse'
  }
];

const Shop = () => {
  const trackClick = async (productName: string) => {
    try {
      await supabase.from('affiliate_clicks').insert({
        product_name: productName,
        category: 'aliexpress',
        referrer: window.location.href,
        user_agent: navigator.userAgent
      });
    } catch (error) {
      console.error('Failed to track click:', error);
    }
  };

  const handleProductClick = (product: Product) => {
    trackClick(product.name);
    window.open(product.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Helmet>
        <title>Shop Tech Deals | RwaFlix</title>
        <meta name="description" content="Best tech deals on electronics, accessories and gadgets. Shop webcams, keyboards, mice and more." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <StreamingHeader onSearch={() => {}} searchQuery="" onPlayVideo={() => {}} />
        
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 py-8 sm:py-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Tag className="w-6 h-6 sm:w-8 sm:h-8 text-primary animate-pulse" />
              <span className="bg-destructive text-destructive-foreground text-xs sm:text-sm font-bold px-3 py-1 rounded-full">
                Holiday Sale - Up to 30% OFF
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-2 sm:mb-3">
              Tech Deals & Gadgets
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Discover amazing deals on electronics, accessories and more. Quality products at unbeatable prices.
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

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-10">
          <h2 className="text-lg sm:text-2xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            Featured Products
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="group cursor-pointer bg-card hover:bg-card/80 rounded-xl p-3 sm:p-4 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 border border-border/50 hover:border-primary/50 relative overflow-hidden"
              >
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 z-10">
                    <Percent className="w-3 h-3" />
                    -{product.discount}%
                  </div>
                )}
                
                <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-muted/30">
                  <img
                    src={`https:${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                
                <div className="space-y-1 sm:space-y-2">
                  <span className="text-[9px] sm:text-[10px] text-primary/80 font-medium uppercase tracking-wider">
                    {product.category}
                  </span>
                  
                  <h3 className="text-xs sm:text-sm font-semibold text-foreground line-clamp-2 leading-snug">
                    {product.nameKiny}
                  </h3>
                  
                  <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2 hidden sm:block">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center gap-2 pt-1 sm:pt-2">
                    <span className="text-base sm:text-lg font-bold text-primary">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs sm:text-sm text-muted-foreground line-through">${product.originalPrice}</span>
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
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Shop;
