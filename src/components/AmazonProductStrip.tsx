import { ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AFFILIATE_LINK = "https://www.amazon.com?&linkCode=ll2&tag=rwaflixstore2-20&linkId=d299fad311d7855e639440853467495f&language=en_US&ref_=as_li_ss_tl";

interface Product {
  name: string;
  nameRw: string;
  image: string;
  category: string;
}

interface AmazonProductStripProps {
  category: "movies" | "trending" | "series" | "featured";
}

const productsByCategory: Record<string, Product[]> = {
  movies: [
    { name: "4K Smart TV", nameRw: "Televiziyo 4K", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=120&h=120&fit=crop", category: "Display" },
    { name: "Soundbar", nameRw: "Soundbar", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=120&h=120&fit=crop", category: "Audio" },
    { name: "Projector", nameRw: "Projecteur", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=120&h=120&fit=crop", category: "Display" },
  ],
  trending: [
    { name: "Wireless Headphones", nameRw: "Amatwi y'umuriro", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop", category: "Audio" },
    { name: "Streaming Stick", nameRw: "Agakoresho ka Streaming", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop", category: "Streaming" },
    { name: "LED Backlight", nameRw: "Urumuri rwa LED", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop", category: "Ambiance" },
  ],
  series: [
    { name: "Comfy Blanket", nameRw: "Ibirago byiza", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=120&h=120&fit=crop", category: "Comfort" },
    { name: "Snack Bowl Set", nameRw: "Ibikombe by'ibiryo", image: "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=120&h=120&fit=crop", category: "Snacks" },
    { name: "Wireless Earbuds", nameRw: "Amatwi mato", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=120&h=120&fit=crop", category: "Audio" },
  ],
  featured: [
    { name: "Gaming Chair", nameRw: "Intebe yo gukina", image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=120&h=120&fit=crop", category: "Furniture" },
    { name: "Monitor Stand", nameRw: "Icyicaro cya Monitor", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=120&h=120&fit=crop", category: "Setup" },
    { name: "USB Hub", nameRw: "USB Hub", image: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=120&h=120&fit=crop", category: "Tech" },
  ],
};

const trackClick = async (productName: string, category: string) => {
  try {
    await supabase.from("affiliate_clicks").insert({
      product_name: productName,
      category: category,
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
    });
  } catch (error) {
    console.error("Failed to track click:", error);
  }
};

const AmazonProductStrip = ({ category }: AmazonProductStripProps) => {
  const products = productsByCategory[category] || productsByCategory.movies;

  const handleProductClick = (product: Product) => {
    trackClick(product.name, category);
    window.open(AFFILIATE_LINK, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mt-4 mb-2">
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2">
        <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0 pl-1">
          🛒 Ibicuruzwa byiza:
        </span>
        {products.map((product, index) => (
          <button
            key={index}
            onClick={() => handleProductClick(product)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/60 border border-border/40 hover:border-primary/40 hover:bg-card transition-all duration-200 flex-shrink-0 group"
          >
            <img
              src={product.image}
              alt={product.nameRw}
              className="w-6 h-6 rounded-full object-cover"
              loading="lazy"
            />
            <span className="text-xs text-foreground/80 group-hover:text-primary transition-colors whitespace-nowrap">
              {product.nameRw}
            </span>
            <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        ))}
        <a
          href="/shop"
          className="text-xs text-primary hover:text-primary/80 whitespace-nowrap flex-shrink-0 pr-1"
        >
          Reba byose →
        </a>
      </div>
    </div>
  );
};

export default AmazonProductStrip;
