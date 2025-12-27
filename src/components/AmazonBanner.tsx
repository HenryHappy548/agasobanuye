import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AFFILIATE_LINK = "https://www.amazon.com?&linkCode=ll2&tag=rwaflixstore2-20&linkId=d299fad311d7855e639440853467495f&language=en_US&ref_=as_li_ss_tl";

const AmazonBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-card via-secondary/50 to-card border border-border/50 p-4 sm:p-6">
      {/* Subtle animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent animate-pulse" />
      </div>
      
      <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
            <ShoppingBag className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-foreground font-semibold text-lg">
              Rwaflix Recommended Gear
            </h3>
            <p className="text-muted-foreground text-sm">
              Upgrade your streaming setup with our top picks
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Link
            to="/shop"
            className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            Browse All
          </Link>
          <a
            href={AFFILIATE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors flex items-center gap-2 group"
          >
            Shop on Amazon
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AmazonBanner;
