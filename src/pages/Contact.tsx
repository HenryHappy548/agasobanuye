import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Mail, Phone, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import StreamingHeader from "@/components/StreamingHeader";
import Footer from "@/components/Footer";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      toast({
        title: "Please fill in required fields",
        description: "Name and message are required.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    const { error } = await supabase
      .from("contact_messages")
      .insert({
        name: name.trim(),
        email: email.trim() || null,
        message: message.trim()
      });

    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Message sent!",
      description: "Thank you for contacting us. We'll respond soon."
    });

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Twandikire - Contact Us | Rwaflix Rwanda</title>
        <meta name="description" content="Twandikire kuri Rwaflix. Contact us for support, feedback, or movie requests. WhatsApp, email support available." />
        <meta name="keywords" content="rwaflix contact, twandikire, movie request rwanda, rwaflix support, agasobanuye help" />
        <link rel="canonical" href="https://rwaflix.store/contact" />
      </Helmet>
      
      <StreamingHeader searchQuery="" onSearch={() => {}} onPlayVideo={() => {}} />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Twandikire - Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  rows={5}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">Contact Information</h2>
              <div className="space-y-4">
                <a 
                  href="mailto:henryhappyreal@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>henryhappyreal@gmail.com</span>
                </a>
                
                <a 
                  href="mailto:kwizeracolin@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>kwizeracolin@gmail.com</span>
                </a>
                
                <a 
                  href="https://wa.me/250791114163"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <span>+250 791 114 163</span>
                </a>
                
                <a 
                  href="https://wa.me/250791114163"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>WhatsApp Support</span>
                </a>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">Office Location</h2>
              <p className="text-muted-foreground">
                Kigali, Rwanda<br />
                East Africa
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">Response Time</h2>
              <p className="text-muted-foreground">
                We typically respond within 24-48 hours. For urgent matters, 
                please reach out via WhatsApp for faster response.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
