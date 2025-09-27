import { Phone, Mail, ExternalLink, Home, Film, Tv, TrendingUp, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background/95 border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Rwaflix</h3>
            <p className="text-sm text-muted-foreground">
              Stream your favorite movies and TV shows online with premium quality content.
            </p>
            <div className="space-y-2">
              <a 
                href="https://wa.me/250791114163" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>+250 791 114 163</span>
              </a>
              <a 
                href="mailto:henryhappyreal@gmail.com"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>henryhappyreal@gmail.com</span>
              </a>
              <a 
                href="https://meethenry.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>My Portfolio</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/movies" 
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Film className="h-4 w-4" />
                  <span>Movies</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/tv-shows" 
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Tv className="h-4 w-4" />
                  <span>TV Shows</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/popular" 
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Popular</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/faq" 
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>FAQ</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">About</h4>
            <p className="text-sm text-muted-foreground">
              Rwaflix is your premier destination for streaming entertainment. 
              Enjoy unlimited access to movies and TV shows.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Rwaflix. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a 
                href="https://wa.me/250791114163" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                WhatsApp Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;