import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  affiliate_link: string;
  image_url: string;
  category: string;
}

interface ProductSliderProps {
  category?: string;
  limit?: number;
  title?: string;
}

export const ProductSlider = ({ category, limit = 20, title = "Recommended Products" }: ProductSliderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      let query = supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true })
        .limit(limit);

      if (category && category !== "general") {
        query = query.eq("category", category);
      }

      const { data } = await query;
      setProducts(data || []);
      setLoading(false);
    };

    fetchProducts();
  }, [category, limit]);

  const handleClick = async (product: Product) => {
    // Log click
    await supabase.from("affiliate_clicks").insert({
      product_name: product.name,
      category: product.category,
      user_agent: navigator.userAgent,
      referrer: window.location.href,
    });

    window.open(product.affiliate_link, "_blank", "noopener,noreferrer");
  };

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById(`product-slider-${category || "all"}`);
    if (!container) return;

    const scrollAmount = 300;
    const newPosition = direction === "left" 
      ? Math.max(0, scrollPosition - scrollAmount)
      : scrollPosition + scrollAmount;

    container.scrollTo({ left: newPosition, behavior: "smooth" });
    setScrollPosition(newPosition);
  };

  if (loading) {
    return (
      <div className="py-4">
        <div className="flex gap-4 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-40 h-48 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("left")}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("right")}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        id={`product-slider-${category || "all"}`}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollBehavior: "smooth" }}
        onScroll={(e) => setScrollPosition((e.target as HTMLDivElement).scrollLeft)}
      >
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleClick(product)}
            className="flex-shrink-0 w-36 sm:w-40 cursor-pointer group"
          >
            <div className="relative bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              {product.original_price && product.original_price > product.price && (
                <div className="absolute top-1 left-1 bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 rounded font-bold z-10">
                  -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                </div>
              )}
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image_url.replace('_80x80', '_300x300').replace('_140x140', '_300x300')}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-2">
                <p className="text-xs font-medium text-foreground line-clamp-2 h-8 leading-4">
                  {product.name}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-sm font-bold text-primary">${product.price}</span>
                  {product.original_price && (
                    <span className="text-xs text-muted-foreground line-through">
                      ${product.original_price}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  <ExternalLink className="w-3 h-3" />
                  <span>View Deal</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
