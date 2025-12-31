import { useId, useMemo, useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useProducts } from "@/hooks/useProducts";

const formatRWF = (amount: number) => {
  return new Intl.NumberFormat('rw-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0,
  }).format(amount);
};

interface ProductSliderProps {
  category?: string;
  limit?: number;
  title?: string;
}

const toHighResAliImage = (url: string) => {
  if (!url) return url;
  return url.replace("_80x80", "_800x800").replace("_140x140", "_800x800").replace("_300x300", "_800x800");
};

export const ProductSlider = ({ category, limit = 20, title = "Ibicuruzwa Byiza" }: ProductSliderProps) => {
  const sliderId = useId();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const { products, loading } = useProducts({ category, limit, activeOnly: true });

  useEffect(() => {
    if (!loading && products.length > 0) {
      products.forEach((product, index) => {
        setTimeout(() => setVisibleItems(prev => new Set([...prev, product.id])), index * 50);
      });
    }
  }, [loading, products]);

  const handleClick = async (product: (typeof products)[number]) => {
    await supabase.from("affiliate_clicks").insert({
      product_name: product.name, category: product.category, user_agent: navigator.userAgent, referrer: window.location.href,
    });
    window.open(product.affiliate_link, "_blank", "noopener,noreferrer");
  };

  const scroll = (direction: "left" | "right") => {
    containerRef.current?.scrollBy({ left: direction === "left" ? -320 : 320, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="py-4">
        <div className="flex gap-4 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-40 h-48 bg-muted/50 animate-pulse rounded-xl" style={{ animationDelay: `${i * 100}ms` }} />
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-6" aria-label={title}>
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
        </div>
        {products.length > 4 && (
          <div className="flex gap-1">
            <Button variant="outline" size="icon" onClick={() => scroll("left")} className="h-8 w-8 rounded-full"><ChevronLeft className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" onClick={() => scroll("right")} className="h-8 w-8 rounded-full"><ChevronRight className="h-4 w-4" /></Button>
          </div>
        )}
      </header>

      <div ref={containerRef} className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 scroll-smooth">
        {products.map((product, index) => {
          const isVisible = visibleItems.has(product.id);
          const discount = product.original_price && product.original_price > product.price
            ? Math.round(((product.original_price - product.price) / product.original_price) * 100) : null;

          return (
            <article key={product.id} onClick={() => handleClick(product)}
              className={`flex-shrink-0 w-36 sm:w-44 cursor-pointer group transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${index * 30}ms` }}>
              <div className="relative bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {discount && <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-[10px] px-2 py-1 rounded-full font-bold z-10">-{discount}%</div>}
                <div className="aspect-square overflow-hidden bg-muted/30">
                  <img src={toHighResAliImage(product.image_url)} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                </div>
                <div className="p-3">
                  <p className="text-xs font-medium text-foreground line-clamp-2 h-8 leading-4 group-hover:text-primary transition-colors">{product.name}</p>
                  <div className="flex flex-col mt-2">
                    <span className="text-sm font-bold text-primary">{formatRWF(product.price)}</span>
                    {product.original_price && <span className="text-[10px] text-muted-foreground line-through">{formatRWF(product.original_price)}</span>}
                  </div>
                  <div className="flex items-center justify-between mt-2 text-[10px] text-muted-foreground">
                    <div className="flex items-center gap-1"><ExternalLink className="w-3 h-3" /><span>AliExpress</span></div>
                    <span className="text-primary group-hover:translate-x-1 transition-transform">Gura →</span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};