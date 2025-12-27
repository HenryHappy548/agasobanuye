import { ExternalLink } from "lucide-react";

const AFFILIATE_LINK = "https://www.amazon.com?&linkCode=ll2&tag=rwaflixstore2-20&linkId=d299fad311d7855e639440853467495f&language=en_US&ref_=as_li_ss_tl";

interface Product {
  name: string;
  image: string;
  category: string;
}

interface AmazonProductStripProps {
  category: "movies" | "trending" | "series" | "featured";
}

const productsByCategory: Record<string, Product[]> = {
  movies: [
    { name: "4K Smart TV", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=120&h=120&fit=crop", category: "Display" },
    { name: "Soundbar", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=120&h=120&fit=crop", category: "Audio" },
    { name: "Projector", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=120&h=120&fit=crop", category: "Display" },
  ],
  trending: [
    { name: "Wireless Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop", category: "Audio" },
    { name: "Streaming Stick", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop", category: "Streaming" },
    { name: "LED Backlight", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop", category: "Ambiance" },
  ],
  series: [
    { name: "Comfy Blanket", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=120&h=120&fit=crop", category: "Comfort" },
    { name: "Snack Bowl Set", image: "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=120&h=120&fit=crop", category: "Snacks" },
    { name: "Wireless Earbuds", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=120&h=120&fit=crop", category: "Audio" },
  ],
  featured: [
    { name: "Gaming Chair", image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=120&h=120&fit=crop", category: "Furniture" },
    { name: "Monitor Stand", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=120&h=120&fit=crop", category: "Setup" },
    { name: "USB Hub", image: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=120&h=120&fit=crop", category: "Tech" },
  ],
};

const AmazonProductStrip = ({ category }: AmazonProductStripProps) => {
  const products = productsByCategory[category] || productsByCategory.movies;

  return (
    <div className="mt-4 mb-2">
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2">
        <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0 pl-1">
          Recommended gear:
        </span>
        {products.map((product, index) => (
          <a
            key={index}
            href={AFFILIATE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/60 border border-border/40 hover:border-primary/40 hover:bg-card transition-all duration-200 flex-shrink-0 group"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-6 h-6 rounded-full object-cover"
              loading="lazy"
            />
            <span className="text-xs text-foreground/80 group-hover:text-primary transition-colors whitespace-nowrap">
              {product.name}
            </span>
            <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        ))}
        <a
          href={AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary hover:text-primary/80 whitespace-nowrap flex-shrink-0 pr-1"
        >
          See all →
        </a>
      </div>
    </div>
  );
};

export default AmazonProductStrip;
