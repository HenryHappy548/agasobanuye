import { ExternalLink, Percent } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: string;
  name: string;
  nameKiny: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  link: string;
}

const products: Product[] = [
  {
    id: '1',
    name: '1.4K Webcam Video Camera',
    nameKiny: 'Kamera ya Webcam 1.4K',
    price: 15,
    image: '//ae01.alicdn.com/kf/S5a92eb021da345619f82e7b374534e04R.jpg_140x140.jpg',
    link: 'https://s.click.aliexpress.com/e/_c3GAXAgz'
  },
  {
    id: '2',
    name: 'Dell Latitude Laptop Battery 7.6V 60Wh',
    nameKiny: 'Bateri ya Laptop Dell Latitude',
    price: 45,
    image: '//ae01.alicdn.com/kf/S7ff0e74d17654b769fff5149dc211494f.jpg_80x80.jpg',
    link: 'https://s.click.aliexpress.com/e/_c3qSkcdr'
  },
  {
    id: '3',
    name: 'Ergonomic Wrist Rest Mouse Pad',
    nameKiny: 'Pad ya Mouse Yorohereza Ikiganza',
    price: 12,
    image: '//ae01.alicdn.com/kf/Se9da8d9466e2445eb9ac3a20d171f0af1.jpg_80x80.jpg',
    link: 'https://s.click.aliexpress.com/e/_c3wYqicl'
  },
  {
    id: '4',
    name: 'USB RGB Gaming Keyboard 104 Keys',
    nameKiny: 'Keyboard ya Gaming RGB',
    price: 25,
    image: '//ae01.alicdn.com/kf/S5bcf260555154f15b22c45593ed17ab1q.jpg_80x80.jpg',
    link: 'https://s.click.aliexpress.com/e/_c4DRQ3yZ'
  },
  {
    id: '5',
    name: 'Wireless Bluetooth Mouse RGB Rechargeable',
    nameKiny: 'Mouse Idakoresha Insinga RGB',
    price: 14,
    originalPrice: 20,
    discount: 30,
    image: '//ae01.alicdn.com/kf/S1e7037b8c29f412e8ef76ea446a331eew.jpg_80x80.jpg',
    link: 'https://s.click.aliexpress.com/e/_c2Q9SY5X'
  },
  {
    id: '6',
    name: '2.4GHz Mini Wireless Gaming Mouse',
    nameKiny: 'Mouse Nto ya Gaming',
    price: 8,
    image: '//ae01.alicdn.com/kf/Hbd41dfce4913479c98abe35b9a1e76abq.jpg_80x80.jpg',
    link: 'https://s.click.aliexpress.com/e/_c3w9muS1'
  }
];

const AliExpressProductStrip = () => {
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
    <div className="w-full bg-gradient-to-r from-primary/10 via-background to-primary/10 py-3 sm:py-4 px-2 sm:px-4 border-y border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <span className="text-xs sm:text-sm font-medium text-primary">🔥 Hot Deals</span>
          <span className="text-[10px] sm:text-xs text-muted-foreground">| Sponsored</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="group cursor-pointer bg-card/50 hover:bg-card rounded-lg p-2 sm:p-3 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border border-border/30 hover:border-primary/50 relative"
            >
              {product.discount && (
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-destructive text-destructive-foreground text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center gap-0.5 sm:gap-1 z-10">
                  <Percent className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  -{product.discount}%
                </div>
              )}
              
              <div className="aspect-square mb-1.5 sm:mb-2 overflow-hidden rounded-md bg-muted/30">
                <img
                  src={`https:${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              
              <h3 className="text-[10px] sm:text-xs font-medium text-foreground line-clamp-2 mb-0.5 sm:mb-1 leading-tight">
                {product.nameKiny}
              </h3>
              
              <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-bold text-primary">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-[10px] sm:text-xs text-muted-foreground line-through">${product.originalPrice}</span>
                )}
              </div>
              
              <div className="flex items-center gap-1 mt-1 sm:mt-1.5 text-[9px] sm:text-[10px] text-muted-foreground">
                <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>AliExpress</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AliExpressProductStrip;
