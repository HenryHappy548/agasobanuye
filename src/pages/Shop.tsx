import { Helmet } from "react-helmet-async";
import { ShoppingBag, Headphones, Tv, Gamepad2, Speaker, ExternalLink, Star } from "lucide-react";
import StreamingHeader from "@/components/StreamingHeader";
import Footer from "@/components/Footer";
import AmazonProductCard from "@/components/AmazonProductCard";

const AFFILIATE_LINK = "https://www.amazon.com?&linkCode=ll2&tag=rwaflixstore2-20&linkId=d299fad311d7855e639440853467495f&language=en_US&ref_=as_li_ss_tl";

// Curated product recommendations for streaming enthusiasts
const products = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    description: "Immersive sound quality for the ultimate movie experience",
    rating: 5,
  },
  {
    id: "2",
    name: "4K Smart TV",
    category: "Displays",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    description: "Crystal clear visuals for your favorite shows and movies",
    rating: 5,
  },
  {
    id: "3",
    name: "Gaming Controller",
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&h=400&fit=crop",
    description: "Precision gaming for your entertainment setup",
    rating: 4,
  },
  {
    id: "4",
    name: "Bluetooth Soundbar",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop",
    description: "Cinema-quality sound in your living room",
    rating: 5,
  },
  {
    id: "5",
    name: "Streaming Microphone",
    category: "Content Creation",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=400&fit=crop",
    description: "Professional audio for streamers and creators",
    rating: 4,
  },
  {
    id: "6",
    name: "LED Light Strip",
    category: "Ambiance",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    description: "Set the mood with ambient backlighting",
    rating: 4,
  },
  {
    id: "7",
    name: "Webcam HD Pro",
    category: "Content Creation",
    image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=400&fit=crop",
    description: "Crystal clear video for streaming and calls",
    rating: 5,
  },
  {
    id: "8",
    name: "Wireless Earbuds",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    description: "Portable audio freedom for on-the-go entertainment",
    rating: 4,
  },
];

const categories = [
  { name: "All", icon: ShoppingBag },
  { name: "Audio", icon: Headphones },
  { name: "Displays", icon: Tv },
  { name: "Gaming", icon: Gamepad2 },
  { name: "Content Creation", icon: Speaker },
];

const Shop = () => {
  return (
    <>
      <Helmet>
        <title>Shop - Rwaflix Recommended Gear</title>
        <meta
          name="description"
          content="Discover the best streaming gear, audio equipment, and entertainment accessories recommended by Rwaflix."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <StreamingHeader onSearch={() => {}} searchQuery="" onPlayVideo={() => {}} />

        {/* Hero Section */}
        <section className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <ShoppingBag className="w-4 h-4" />
                Rwaflix Store
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Upgrade Your <span className="text-primary">Streaming Setup</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                Curated selection of premium gear to enhance your entertainment experience. 
                From audio equipment to display upgrades, we've got you covered.
              </p>
              <a
                href={AFFILIATE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-all hover:scale-105 shadow-lg shadow-primary/25"
              >
                <ExternalLink className="w-5 h-5" />
                Shop All on Amazon
              </a>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <a
                  key={category.name}
                  href={AFFILIATE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-secondary transition-all text-sm font-medium text-foreground"
                >
                  <category.icon className="w-4 h-4 text-primary" />
                  {category.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <AmazonProductCard
                  key={product.id}
                  product={product}
                  affiliateLink={AFFILIATE_LINK}
                />
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-card via-secondary/30 to-card rounded-2xl p-8 sm:p-12 border border-border/50">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  Can't Find What You Need?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Browse millions of products on Amazon and find exactly what you're looking for.
                </p>
                <a
                  href={AFFILIATE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold transition-all hover:scale-105 shadow-xl shadow-primary/30"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Explore Amazon Store
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badge */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <span>Trusted Recommendations</span>
              </div>
              <div className="h-4 w-px bg-border hidden sm:block" />
              <span>Secure Shopping via Amazon</span>
              <div className="h-4 w-px bg-border hidden sm:block" />
              <span>Fast & Reliable Delivery</span>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Shop;
