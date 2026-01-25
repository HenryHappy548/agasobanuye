import { useId, useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useProducts } from "@/hooks/useProducts";

// Format RWF currency
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

// Optimize image based on network
const getOptimizedAliImage = (url: string) => {
  if (!url) return url;
  
  const connection = (navigator as any).connection;
  const isSlowConnection = connection?.effectiveType === '2g' || 
                           connection?.effectiveType === 'slow-2g' ||
                           connection?.saveData === true;
  
  // Use smaller images for slow connections
  const targetSize = isSlowConnection ? "300x300" : "800x800";
  
  return url
    .replace(/_\d+x\d+/g, `_${targetSize}`)
    .replace("_80x80", `_${targetSize}`)
    .replace("_140x140", `_${targetSize}`);
};

export const ProductSlider = ({
  category,
  limit = 20,
  title = "Recommended Products",
}: ProductSliderProps) => {
  const sliderId = useId();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { products, loading } = useProducts({ category, limit, activeOnly: true });

  const handleClick = async (product: (typeof products)[number]) => {
    await supabase.from("affiliate_clicks").insert({
      product_name: product.name,
      category: product.category,
      user_agent: navigator.userAgent,
      referrer: window.location.href,
    });

    window.open(product.affiliate_link, "_blank", "noopener,noreferrer");
  };

  const canScroll = useMemo(() => products.length > 0, [products.length]);

  const scroll = (direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    const amount = 320;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="py-4" aria-label="Loading products">
        <div className="flex gap-4 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-40 h-48 bg-muted animate-pulse rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-4" aria-label={title}>
      <header className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {canScroll && (
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll("left")}
              className="h-8 w-8"
              aria-label="Scroll products left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll("right")}
              className="h-8 w-8"
              aria-label="Scroll products right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </header>

      <div
        id={`product-slider-${sliderId}`}
        ref={containerRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollBehavior: "smooth" }}
      >
        {products.map((product) => (
          <article
            key={product.id}
            onClick={() => handleClick(product)}
            className="flex-shrink-0 w-36 sm:w-40 cursor-pointer group"
          >
            <div className="relative bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              {product.original_price && product.original_price > product.price && (
                <div className="absolute top-1 left-1 bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 rounded font-bold z-10">
                  -
                  {Math.round(
                    ((product.original_price - product.price) / product.original_price) * 100
                  )}%
                </div>
              )}
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={getOptimizedAliImage(product.image_url)}
                  alt={`${product.name} product image`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-2">
                <p className="text-xs font-medium text-foreground line-clamp-2 h-8 leading-4">
                  {product.name}
                </p>
                <div className="flex flex-col mt-1">
                  <span className="text-sm font-bold text-primary">{formatRWF(product.price)}</span>
                  {product.original_price && (
                    <span className="text-xs text-muted-foreground line-through">
                      {formatRWF(product.original_price)}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  <ExternalLink className="w-3 h-3" />
                  <span>View Deal</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
