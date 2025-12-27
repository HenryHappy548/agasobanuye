import { Helmet } from "react-helmet-async";
import { ShoppingBag, Headphones, Tv, Gamepad2, Speaker, ExternalLink, Star, Percent, TrendingUp } from "lucide-react";
import StreamingHeader from "@/components/StreamingHeader";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useMemo } from "react";

const AFFILIATE_LINK = "https://amzn.to/3MT8BFY";

interface Product {
  id: string;
  name: string;
  nameRw: string;
  category: string;
  image: string;
  description: string;
  descriptionRw: string;
  rating: number;
  originalPrice: number;
  discount: number;
}

const allProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headset",
    nameRw: "Headset Nziza Cyane",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    description: "Immersive sound quality",
    descriptionRw: "Amajwi meza cyane yo kureba filimi",
    rating: 5,
    originalPrice: 149,
    discount: 30,
  },
  {
    id: "2",
    name: "4K Smart TV 55 inch",
    nameRw: "TV 4K Nziza - 55\"",
    category: "Display",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    description: "Crystal clear visuals",
    descriptionRw: "Amashusho meza cyane",
    rating: 5,
    originalPrice: 599,
    discount: 35,
  },
  {
    id: "3",
    name: "Pro Gaming Controller",
    nameRw: "Controller ya Gaming",
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&h=400&fit=crop",
    description: "Precision gaming",
    descriptionRw: "Gukina neza cyane",
    rating: 4,
    originalPrice: 69,
    discount: 25,
  },
  {
    id: "4",
    name: "Bluetooth Soundbar 2.1",
    nameRw: "Soundbar ya Bluetooth",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop",
    description: "Cinema-quality sound",
    descriptionRw: "Amajwi nka sinema",
    rating: 5,
    originalPrice: 199,
    discount: 40,
  },
  {
    id: "5",
    name: "USB Condenser Microphone",
    nameRw: "Microphone ya USB",
    category: "Content Creation",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=400&fit=crop",
    description: "Professional audio",
    descriptionRw: "Amajwi meza ku bakora video",
    rating: 4,
    originalPrice: 129,
    discount: 20,
  },
  {
    id: "6",
    name: "RGB LED Light Strip 5m",
    nameRw: "Urumuri rwa LED 5m",
    category: "Ambiance",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    description: "Set the mood",
    descriptionRw: "Shyiraho urumuri rwiza",
    rating: 4,
    originalPrice: 29,
    discount: 50,
  },
  {
    id: "7",
    name: "HD Webcam 1080p",
    nameRw: "Webcam HD 1080p",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=400&fit=crop",
    description: "Crystal clear video",
    descriptionRw: "Video nziza cyane",
    rating: 5,
    originalPrice: 79,
    discount: 15,
  },
  {
    id: "8",
    name: "True Wireless Earbuds",
    nameRw: "Earbuds Wireless",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    description: "Portable audio",
    descriptionRw: "Amatwi meza yo kujyana",
    rating: 4,
    originalPrice: 89,
    discount: 25,
  },
  {
    id: "9",
    name: "Ergonomic Gaming Chair",
    nameRw: "Gaming Chair Nziza",
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=400&fit=crop",
    description: "Comfort for hours",
    descriptionRw: "Kwicara neza cyane",
    rating: 5,
    originalPrice: 299,
    discount: 30,
  },
  {
    id: "10",
    name: "HD Projector Mini",
    nameRw: "Projector Nto",
    category: "Display",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=400&fit=crop",
    description: "Big screen anywhere",
    descriptionRw: "Ecran nini ahantu hose",
    rating: 4,
    originalPrice: 179,
    discount: 45,
  },
  {
    id: "11",
    name: "Fire TV Stick 4K",
    nameRw: "Fire Stick 4K",
    category: "Streaming",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=400&fit=crop",
    description: "Stream everything",
    descriptionRw: "Reba byose kuri TV",
    rating: 5,
    originalPrice: 49,
    discount: 30,
  },
  {
    id: "12",
    name: "Popcorn Maker Machine",
    nameRw: "Popcorn Maker",
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=400&h=400&fit=crop",
    description: "Movie night essential",
    descriptionRw: "Kugirango urebe filimi neza",
    rating: 4,
    originalPrice: 39,
    discount: 35,
  },
];

const categories = [
  { name: "All", nameRw: "Byose", icon: ShoppingBag },
  { name: "Audio", nameRw: "Audio", icon: Headphones },
  { name: "Display", nameRw: "Amashusho", icon: Tv },
  { name: "Gaming", nameRw: "Gaming", icon: Gamepad2 },
  { name: "Tech", nameRw: "Tech", icon: Speaker },
];

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

const Shop = () => {
  // Shuffle products for variety
  const shuffledProducts = useMemo(() => {
    return [...allProducts].sort(() => Math.random() - 0.5);
  }, []);

  const handleProductClick = (product: Product) => {
    trackClick(product.name, product.category);
    window.open(AFFILIATE_LINK, "_blank", "noopener,noreferrer");
  };

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return Math.round(price * (1 - discount / 100));
  };

  return (
    <>
      <Helmet>
        <title>Iduka - Rwaflix Ibicuruzwa Byiza</title>
        <meta
          name="description"
          content="Shakisha ibikoresho byiza byo kureba filimi, audio, n'ibindi byiza bikunzwe na Rwaflix."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <StreamingHeader onSearch={() => {}} searchQuery="" onPlayVideo={() => {}} />

        {/* Hero Section */}
        <section className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-medium mb-6 animate-pulse">
                <Percent className="w-4 h-4" />
                Discount kugeza 50% OFF!
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Ibicuruzwa <span className="text-primary">Byiza Cyane</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                Shakisha ibikoresho byiza byo kureba filimi, gutega amajwi, no gukina. 
                Ibicuruzwa byose duhitiyemo kuri Amazon.
              </p>
              <button
                onClick={() => {
                  trackClick("Shop All Button", "hero");
                  window.open(AFFILIATE_LINK, "_blank", "noopener,noreferrer");
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-all hover:scale-105 shadow-lg shadow-primary/25"
              >
                <ExternalLink className="w-5 h-5" />
                Gura kuri Amazon
              </button>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => {
                    trackClick(`Category: ${category.name}`, "category");
                    window.open(AFFILIATE_LINK, "_blank", "noopener,noreferrer");
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-secondary transition-all text-sm font-medium text-foreground"
                >
                  <category.icon className="w-4 h-4 text-primary" />
                  {category.nameRw}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Hot Deals Banner */}
        <section className="px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-xl p-4 border border-primary/30 flex items-center justify-center gap-3">
              <TrendingUp className="w-5 h-5 text-primary animate-bounce" />
              <span className="text-foreground font-medium">
                🔥 Ibicuruzwa bishya bifite discount nziza - Gura ubu!
              </span>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {shuffledProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="group block bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10 text-left relative"
                >
                  {/* Discount Badge */}
                  <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                    <Percent className="w-3 h-3" />
                    {product.discount}% OFF
                  </div>

                  <div className="aspect-square bg-secondary/50 relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.nameRw}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink className="w-3 h-3" />
                      Gura Nonaha
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-primary font-medium uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="text-foreground font-semibold mt-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.nameRw}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-1">
                      {product.descriptionRw}
                    </p>
                    
                    {/* Price */}
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-lg font-bold text-green-500">
                        ${calculateDiscountedPrice(product.originalPrice, product.discount)}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 mt-2">
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
                </button>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-card via-secondary/30 to-card rounded-2xl p-8 sm:p-12 border border-border/50">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  Ntago wabonye icyo ushaka?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Shakisha ibicuruzwa byinshi cyane kuri Amazon ubona icyo ukeneye.
                </p>
                <button
                  onClick={() => {
                    trackClick("Explore Amazon Button", "bottom_cta");
                    window.open(AFFILIATE_LINK, "_blank", "noopener,noreferrer");
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold transition-all hover:scale-105 shadow-xl shadow-primary/30"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Shakisha kuri Amazon
                </button>
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
                <span>Ibicuruzwa Byizewe</span>
              </div>
              <div className="h-4 w-px bg-border hidden sm:block" />
              <span>Kugura Kwizewe kuri Amazon</span>
              <div className="h-4 w-px bg-border hidden sm:block" />
              <span>Kohereza Byihuse</span>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Shop;
