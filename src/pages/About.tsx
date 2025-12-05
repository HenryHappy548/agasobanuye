import { Helmet } from "react-helmet-async";
import { Film, Users, Globe, Heart } from "lucide-react";
import StreamingHeader from "@/components/StreamingHeader";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>About Us - Rwaflix | Your Premier Streaming Destination</title>
        <meta name="description" content="Learn about Rwaflix, Rwanda's premier streaming platform for movies and TV series. Discover our mission to bring quality entertainment to Africa." />
        <link rel="canonical" href="https://rwaflix.store/about" />
      </Helmet>
      
      <StreamingHeader searchQuery="" onSearch={() => {}} onPlayVideo={() => {}} />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">About Rwaflix</h1>
        
        <div className="space-y-8">
          {/* Hero Section */}
          <section className="bg-card rounded-lg p-6 md:p-8 border border-border">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Rwaflix is your premier destination for streaming entertainment in Africa. We bring you 
              unlimited access to a vast library of movies, TV series, and exclusive content from around 
              the world, all in one convenient platform.
            </p>
          </section>

          {/* Features Grid */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <Film className="h-10 w-10 text-primary mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Vast Content Library</h2>
              <p className="text-muted-foreground">
                Access thousands of movies and TV series across all genres including action, drama, 
                comedy, thriller, and more. New content added regularly.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 border border-border">
              <Globe className="h-10 w-10 text-primary mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Global & Local Content</h2>
              <p className="text-muted-foreground">
                Enjoy Hollywood blockbusters, Korean dramas, African films, and international 
                content with multiple language options including dubbed versions.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 border border-border">
              <Users className="h-10 w-10 text-primary mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Community Driven</h2>
              <p className="text-muted-foreground">
                Join our growing community of movie enthusiasts. Share comments, vote for your 
                favorite series, and help us curate the best content for you.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 border border-border">
              <Heart className="h-10 w-10 text-primary mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Made with Love</h2>
              <p className="text-muted-foreground">
                Built in Rwanda with passion for entertainment. We're committed to providing 
                quality streaming experience to audiences across Africa and beyond.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="bg-card rounded-lg p-6 md:p-8 border border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              At Rwaflix, our mission is to make quality entertainment accessible to everyone. 
              We believe that great stories have the power to inspire, educate, and bring people together.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We are dedicated to providing a seamless streaming experience with high-quality video, 
              easy navigation, and a diverse content library that caters to all tastes and preferences.
            </p>
          </section>

          {/* Contact Section */}
          <section className="bg-card rounded-lg p-6 md:p-8 border border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-4">
              Have questions, suggestions, or feedback? We'd love to hear from you!
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p><strong>Email:</strong> henryhappyreal@gmail.com</p>
              <p><strong>WhatsApp:</strong> +250 791 114 163</p>
              <p><strong>Location:</strong> Kigali, Rwanda</p>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
