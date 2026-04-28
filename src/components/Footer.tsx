import { Phone, Mail, ExternalLink, Home, Film, Tv, TrendingUp, HelpCircle, MessageCircle, Instagram, Globe, Shield, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import CommentSection from "./CommentSection";
import SITE_CONFIG from "@/config/site";
import { FooterAd } from "./AdSense";

interface FooterProps {
  showComments?: boolean;
}

const Footer = ({ showComments = true }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-card/50 to-card border-t border-border/50 mt-8 sm:mt-12 lg:mt-16">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {SITE_CONFIG.NAME}
            </h3>
            <p className="text-sm text-muted-foreground">
              {SITE_CONFIG.TAGLINE}
            </p>
            <div className="space-y-2">
              {SITE_CONFIG.CONTACT.PHONE && (
                <a 
                  href={`https://wa.me/${SITE_CONFIG.CONTACT.WHATSAPP}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>{SITE_CONFIG.CONTACT.PHONE}</span>
                </a>
              )}
              <a 
                href={`mailto:${SITE_CONFIG.CONTACT.EMAIL}`}
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>{SITE_CONFIG.CONTACT.EMAIL}</span>
              </a>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Globe className="h-4 w-4" />
                <span>{SITE_CONFIG.CONTACT.ADDRESS}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to={SITE_CONFIG.NAV.HOME}
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  to={SITE_CONFIG.NAV.MOVIES}
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Film className="h-4 w-4" />
                  <span>Movies</span>
                </Link>
              </li>
              <li>
                <Link 
                  to={SITE_CONFIG.NAV.TV_SHOWS}
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Tv className="h-4 w-4" />
                  <span>TV Shows</span>
                </Link>
              </li>
              <li>
                <Link 
                  to={SITE_CONFIG.NAV.POPULAR}
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
            <h4 className="text-sm font-semibold text-foreground">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to={SITE_CONFIG.NAV.FAQ}
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>FAQ</span>
                </Link>
              </li>
              <li>
                <Link 
                  to={SITE_CONFIG.NAV.CONTACT}
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link 
                  to={SITE_CONFIG.NAV.ABOUT}
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
                  to={SITE_CONFIG.LEGAL.PRIVACY_POLICY_URL}
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Shield className="h-4 w-4" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link 
                  to={SITE_CONFIG.LEGAL.TERMS_URL}
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  <span>Terms of Service</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* AdSense Footer Ad */}
        <div className="mt-8">
          <FooterAd />
        </div>

        {/* General Comments Section */}
        {showComments && (
          <div className="mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-border/50">
            <CommentSection />
          </div>
        )}

        {/* Copyright */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © {currentYear} {SITE_CONFIG.NAME}. All rights reserved.
            </p>
            <div className="flex items-center justify-center sm:justify-end gap-4">
              <a 
                href={`https://wa.me/${SITE_CONFIG.CONTACT.WHATSAPP}`}
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