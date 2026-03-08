import { useState } from "react";
import { Phone, Mail, ExternalLink, Home, Film, Tv, TrendingUp, HelpCircle, MessageCircle, Instagram, Crown, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import CommentSection from "./CommentSection";
import { supabase } from "@/integrations/supabase/client";

interface FooterProps {
  showComments?: boolean;
}

const Footer = ({ showComments = true }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleWhatsAppSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || submitting) return;
    
    const cleanPhone = phone.trim().replace(/\s+/g, '');
    if (cleanPhone.length < 10) return;

    setSubmitting(true);
    try {
      await supabase.from("whatsapp_subscribers" as any).insert({
        phone: cleanPhone,
        name: name.trim() || null,
      } as any);
      setSubmitted(true);
      setPhone("");
      setName("");
    } catch {
      // silently fail
    }
    setSubmitting(false);
  };

  return (
    <footer className="bg-gradient-to-b from-card/50 to-card border-t border-border/50 mt-8 sm:mt-12 lg:mt-16">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Rwaflix
            </h3>
            <p className="text-sm text-muted-foreground">
              Reba Agasobanuye Kuri Rwaflix.
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
                href="mailto:rwaflixstore@gmail.com"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>rwaflixstore@gmail.com</span>
              </a>
             
              <a 
                href="https://meethappy.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>My Portfolio</span>
              </a>
              <a 
                href="https://whatsapp.com/channel/0029VbBuQXg0AgW6YX49VZ3I" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-green-500 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Follow on WhatsApp</span>
              </a>
              <a 
                href="https://www.instagram.com/rwaflix.store/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-pink-500 transition-colors"
              >
                <Instagram className="h-4 w-4" />
                <span>Follow on Instagram</span>
              </a>
              <a 
                href="https://vm.tiktok.com/ZMHcX8DnyfJgW-m8Gt6/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                <span>Follow on TikTok</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Quick Links</h4>
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
                  <span>Series</span>
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
              <li>
                <Link 
                  to="/pro-movies" 
                  className="flex items-center space-x-2 text-sm text-amber-500 hover:text-amber-400 transition-colors"
                >
                  <Crown className="h-4 w-4" />
                  <span>Pro Movies</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Support</h4>
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
              <li>
                <Link 
                  to="/contact" 
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>About Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/privacy-policy" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms-of-service" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* General Comments Section - Only on pages without movie-specific comments */}
        {showComments && (
          <div className="mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-border/50">
            <CommentSection />
          </div>
        )}

        {/* WhatsApp Updates Signup - Subtle */}
        <div className="mt-6 pt-6 border-t border-border/50">
          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-sm text-primary">
              <CheckCircle2 className="h-4 w-4" />
              <span>Murakoze! Uzakira amakuru mashya kuri WhatsApp.</span>
            </div>
          ) : (
            <form onSubmit={handleWhatsAppSignup} className="max-w-md mx-auto">
              <p className="text-sm text-muted-foreground text-center mb-3">
                Shyiraho nimero yawe ukire amakuru ya movie nshya kuri WhatsApp
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Izina (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 min-w-0 px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <input
                  type="tel"
                  placeholder="07xxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="flex-1 min-w-0 px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  disabled={submitting || !phone.trim()}
                  className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  {submitting ? "..." : "Ohereza"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Copyright */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © {currentYear} Rwaflix. All rights reserved.
            </p>
            <div className="flex items-center justify-center sm:justify-end gap-4">
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
