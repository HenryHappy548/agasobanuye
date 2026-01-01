import { ExternalLink } from "lucide-react";
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

interface MiniProductStripProps {
  limit?: number;
}

const toMediumAliImage = (url: string) => {
  if (!url) return url;
  return url
    .replace("_80x80", "_140x140")
    .replace("_300x300", "_140x140")
    .replace("_800x800", "_140x140");
};

export const MiniProductStrip = ({ limit = 3 }: MiniProductStripProps) => {
  const { products } = useProducts({ limit, activeOnly: true });

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
    <aside className="flex gap-2 justify-center flex-wrap py-2" aria-label="Featured product deals">
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => handleClick(product)}
          className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border rounded-lg p-2 cursor-pointer hover:border-primary/50 transition-all duration-300 hover:shadow-md min-w-[140px] max-w-[180px]"
        >
          <img
            src={toMediumAliImage(product.image_url)}
            alt={`${product.name} thumbnail`}
            className="w-10 h-10 object-cover rounded"
            loading="lazy"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">{product.name}</p>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-primary">{formatRWF(product.price)}</span>
              {product.original_price && (
                <span className="text-[10px] text-muted-foreground line-through">
                  {formatRWF(product.original_price)}
                </span>
              )}
            </div>
          </div>
          <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0" />
        </div>
      ))}
    </aside>
  );
};
