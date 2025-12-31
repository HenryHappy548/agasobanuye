import { useState, useEffect } from "react";
import { ExternalLink, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useProducts } from "@/hooks/useProducts";

const formatRWF = (amount: number) => {
  return new Intl.NumberFormat('rw-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0,
  }).format(amount);
};

interface MiniProductStripProps {
  limit?: number;
}

const toMediumAliImage = (url: string) => {
  if (!url) return url;
  return url
    .replace("_80x80", "_300x300")
    .replace("_140x140", "_300x300")
    .replace("_800x800", "_300x300");
};

export const MiniProductStrip = ({ limit = 3 }: MiniProductStripProps) => {
  const { products } = useProducts({ limit, activeOnly: true });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      const timer = setTimeout(() => setIsVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, [products.length]);

  const handleClick = async (product: (typeof products)[number]) => {
    await supabase.from("affiliate_clicks").insert({
      product_name: product.name,
      category: product.category,
      user_agent: navigator.userAgent,
      referrer: window.location.href,
    });
    window.open(product.affiliate_link, "_blank", "noopener,noreferrer");
  };

  if (products.length === 0) return null;

  return (
    <aside 
      className={`flex gap-2 justify-center flex-wrap py-3 transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
      aria-label="Featured product deals"
    >
      <div className="flex items-center gap-1 text-xs text-primary mr-2">
        <Sparkles className="w-3 h-3" />
        <span className="font-medium">Deals:</span>
      </div>
      {products.map((product, index) => {
        const discount = product.original_price && product.original_price > product.price
          ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
          : null;

        return (
          <div
            key={product.id}
            onClick={() => handleClick(product)}
            className={`flex items-center gap-2 bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-2 cursor-pointer 
              hover:border-primary/50 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5
              transition-all duration-300 ease-out min-w-[160px] max-w-[200px]
              opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]`}
            style={{ animationDelay: `${0.4 + index * 0.15}s` }}
          >
            <div className="relative">
              <img
                src={toMediumAliImage(product.image_url)}
                alt={`${product.name} thumbnail`}
                className="w-11 h-11 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              {discount && discount > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[8px] px-1 py-0.5 rounded-full font-bold">
                  -{discount}%
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">{product.name}</p>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-primary">{formatRWF(product.price)}</span>
                {product.original_price && (
                  <span className="text-[9px] text-muted-foreground line-through">
                    {formatRWF(product.original_price)}
                  </span>
                )}
              </div>
            </div>
            <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          </div>
        );
      })}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </aside>
  );
};