import { ExternalLink, Percent } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useMemo } from "react";

const AFFILIATE_LINK = "https://amzn.to/3MT8BFY";

interface Product {
  name: string;
  nameRw: string;
  image: string;
  category: string;
  discount?: number;
}

interface AmazonProductStripProps {
  category: "movies" | "trending" | "series" | "featured";
}

// Large pool of products to randomly pick from
const allProducts: Product[] = [
  // Audio
  { name: "Wireless Headset", nameRw: "Headset", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop", category: "Audio", discount: 30 },
  { name: "Bluetooth Earbuds", nameRw: "Earbuds", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=120&h=120&fit=crop", category: "Audio", discount: 25 },
  { name: "Soundbar Speaker", nameRw: "Soundbar", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=120&h=120&fit=crop", category: "Audio", discount: 40 },
  { name: "Studio Microphone", nameRw: "Microphone", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=120&h=120&fit=crop", category: "Audio", discount: 20 },
  
  // Display & Tech
  { name: "4K Smart TV", nameRw: "TV 4K", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=120&h=120&fit=crop", category: "Display", discount: 35 },
  { name: "HD Projector", nameRw: "Projector", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=120&h=120&fit=crop", category: "Display", discount: 45 },
  { name: "Webcam HD", nameRw: "Webcam", image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=120&h=120&fit=crop", category: "Tech", discount: 15 },
  { name: "LED Light Strip", nameRw: "LED Lights", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop", category: "Ambiance", discount: 50 },
  
  // Gaming & Setup
  { name: "Gaming Controller", nameRw: "Controller", image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=120&h=120&fit=crop", category: "Gaming", discount: 20 },
  { name: "Gaming Chair", nameRw: "Gaming Chair", image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=120&h=120&fit=crop", category: "Furniture", discount: 30 },
  { name: "Monitor Stand", nameRw: "Monitor Stand", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=120&h=120&fit=crop", category: "Setup", discount: 25 },
  { name: "USB Hub", nameRw: "USB Hub", image: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=120&h=120&fit=crop", category: "Tech", discount: 35 },
  
  // Comfort & Entertainment
  { name: "Cozy Blanket", nameRw: "Blanket", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=120&h=120&fit=crop", category: "Comfort", discount: 40 },
  { name: "Popcorn Maker", nameRw: "Popcorn Maker", image: "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=120&h=120&fit=crop", category: "Kitchen", discount: 25 },
  { name: "Streaming Device", nameRw: "Fire Stick", image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=120&h=120&fit=crop", category: "Streaming", discount: 30 },
  { name: "Phone Stand", nameRw: "Phone Stand", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=120&h=120&fit=crop", category: "Accessories", discount: 15 },
];

// Function to get random products based on category
const getRandomProducts = (category: string, count: number = 4): Product[] => {
  // Create a seed based on current hour so products change periodically
  const hourSeed = new Date().getHours();
  const categoryIndex = ["movies", "trending", "series", "featured"].indexOf(category);
  
  // Shuffle based on seed
  const shuffled = [...allProducts].sort((a, b) => {
    const seedA = (a.name.charCodeAt(0) + hourSeed + categoryIndex) % 10;
    const seedB = (b.name.charCodeAt(0) + hourSeed + categoryIndex) % 10;
    return seedA - seedB;
  });
  
  return shuffled.slice(0, count);
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
  // Memoize products so they don't change on every render
  const products = useMemo(() => getRandomProducts(category, 4), [category]);

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
            {product.discount && (
              <span className="flex items-center gap-0.5 text-[10px] font-bold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded">
                <Percent className="w-2.5 h-2.5" />
                {product.discount}
              </span>
            )}
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
