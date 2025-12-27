import { Helmet } from "react-helmet-async";
import { ShoppingBag, Headphones, Tv, Gamepad2, Speaker, ExternalLink, Star } from "lucide-react";
import StreamingHeader from "@/components/StreamingHeader";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const AFFILIATE_LINK = "https://www.amazon.com?&linkCode=ll2&tag=rwaflixstore2-20&linkId=d299fad311d7855e639440853467495f&language=en_US&ref_=as_li_ss_tl";

interface Product {
  id: string;
  name: string;
  nameRw: string;
  category: string;
  image: string;
  description: string;
  descriptionRw: string;
  rating: number;
}

const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    nameRw: "Amatwi y'umuriro meza",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    description: "Immersive sound quality for the ultimate movie experience",
    descriptionRw: "Amajwi meza cyane yo kureba filimi",
    rating: 5,
  },
  {
    id: "2",
    name: "4K Smart TV",
    nameRw: "Televiziyo 4K Nziza",
    category: "Displays",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    description: "Crystal clear visuals for your favorite shows",
    descriptionRw: "Amashusho meza cyane yo kureba filimi zawe",
    rating: 5,
  },
  {
    id: "3",
    name: "Gaming Controller",
    nameRw: "Agakoresho ko gukina",
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&h=400&fit=crop",
    description: "Precision gaming for your entertainment setup",
    descriptionRw: "Gukina neza cyane",
    rating: 4,
  },
  {
    id: "4",
    name: "Bluetooth Soundbar",
    nameRw: "Soundbar ya Bluetooth",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop",
    description: "Cinema-quality sound in your living room",
    descriptionRw: "Amajwi nka sinema mu nzu yawe",
    rating: 5,
  },
  {
    id: "5",
    name: "Streaming Microphone",
    nameRw: "Mikoro yo gukoresha",
    category: "Content Creation",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=400&fit=crop",
    description: "Professional audio for streamers and creators",
    descriptionRw: "Amajwi meza ku bakora video",
    rating: 4,
  },
  {
    id: "6",
    name: "LED Light Strip",
    nameRw: "Urumuri rwa LED",
    category: "Ambiance",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    description: "Set the mood with ambient backlighting",
    descriptionRw: "Shyiraho urumuri rwiza",
    rating: 4,
  },
  {
    id: "7",
    name: "Webcam HD Pro",
    nameRw: "Kamera ya HD",
    category: "Content Creation",
    image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=400&fit=crop",
    description: "Crystal clear video for streaming and calls",
    descriptionRw: "Video nziza cyane",
    rating: 5,
  },
  {
    id: "8",
    name: "Wireless Earbuds",
    nameRw: "Amatwi mato",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    description: "Portable audio freedom for on-the-go entertainment",
    descriptionRw: "Amatwi meza yo kujyana",
    rating: 4,
  },
];

const categories = [
  { name: "Byose", nameRw: "Byose", icon: ShoppingBag },
  { name: "Audio", nameRw: "Amajwi", icon: Headphones },
  { name: "Displays", nameRw: "Amashusho", icon: Tv },
  { name: "Gaming", nameRw: "Gukina", icon: Gamepad2 },
  { name: "Content Creation", nameRw: "Gukora Video", icon: Speaker },
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
  const handleProductClick = (product: Product) => {
    trackClick(product.name, product.category);
    window.open(AFFILIATE_LINK, "_blank", "noopener,noreferrer");
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <ShoppingBag className="w-4 h-4" />
                Iduka rya Rwaflix
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

        {/* Products Grid */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="group block bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10 text-left"
                >
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
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                      {product.descriptionRw}
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
