import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  affiliate_link: string;
  image_url: string;
  category: string;
}

interface MiniProductStripProps {
  limit?: number;
}

export const MiniProductStrip = ({ limit = 3 }: MiniProductStripProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true })
        .limit(limit);

      setProducts(data || []);
    };

    fetchProducts();
  }, [limit]);

  const handleClick = async (product: Product) => {
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
    <div className="flex gap-2 justify-center flex-wrap py-2">
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => handleClick(product)}
          className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border rounded-lg p-2 cursor-pointer hover:border-primary/50 transition-all duration-300 hover:shadow-md min-w-[140px] max-w-[180px]"
        >
          <img
            src={product.image_url.replace('_80x80', '_140x140').replace('_300x300', '_140x140')}
            alt={product.name}
            className="w-10 h-10 object-cover rounded"
            loading="lazy"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">{product.name}</p>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-primary">${product.price}</span>
              {product.original_price && (
                <span className="text-[10px] text-muted-foreground line-through">
                  ${product.original_price}
                </span>
              )}
            </div>
          </div>
          <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0" />
        </div>
      ))}
    </div>
  );
};
