import { ExternalLink, Star } from "lucide-react";

interface AmazonProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  rating: number;
}

interface AmazonProductCardProps {
  product: AmazonProduct;
  affiliateLink: string;
}

const AmazonProductCard = ({ product, affiliateLink }: AmazonProductCardProps) => {
  return (
    <a
      href={affiliateLink}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="aspect-square bg-secondary/50 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ExternalLink className="w-3 h-3" />
          Shop Now
        </div>
      </div>
      <div className="p-4">
        <span className="text-xs text-primary font-medium uppercase tracking-wider">
          {product.category}
        </span>
        <h3 className="text-foreground font-semibold mt-1 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-1 mt-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < product.rating
                  ? "fill-yellow-500 text-yellow-500"
                  : "text-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </a>
  );
};

export default AmazonProductCard;
