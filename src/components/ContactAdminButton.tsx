import { useState } from "react";
import { MessageCircle, Send, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const ContactAdminButton = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.message.trim()) {
      toast({
        title: "Uzuza aho harinzwe",
        description: "Izina n'ubutumwa ni ngombwa.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.phone.trim() && !formData.email.trim()) {
      toast({
        title: "Andika telefone cyangwa email",
        description: "Tugomba aho tukusubiza.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    const { error } = await supabase
      .from("contact_messages")
      .insert({
        name: formData.name.trim(),
        phone: formData.phone.trim() || null,
        email: formData.email.trim() || null,
        message: formData.message.trim()
      });

    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Habaye ikibazo",
        description: "Gerageza nanone nyuma.",
        variant: "destructive"
      });
      return;
    }

    setSubmitted(true);
    setFormData({ name: "", phone: "", email: "", message: "" });
    
    toast({
      title: "Ubutumwa bwoherejwe!",
      description: "Tuzagusubiza vuba."
    });

    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              size="icon"
              className="fixed bottom-24 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-br from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 z-50 animate-pulse hover:animate-none"
            >
              <MessageCircle className="h-6 w-6 text-white" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-green-700 text-white border-green-600 font-medium px-3 py-2">
          <p>Tugezeho ikibazo cyawe</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Twandikire Admin</DialogTitle>
          <DialogDescription>
            Twohereze ubutumwa, tuzagusubiza kuri WhatsApp cyangwa email.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <p className="text-lg font-medium text-center">Murakoze! Tuzagusubiza vuba.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Izina ryawe *</Label>
              <Input
                id="contact-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Andika izina ryawe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-phone">Numero ya WhatsApp</Label>
              <Input
                id="contact-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Urugero: +250 788 123 456"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-email">Email (niba uyifite)</Label>
              <Input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="email@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-message">Ubutumwa bwawe *</Label>
              <Textarea
                id="contact-message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Andika ubutumwa bwawe hano..."
                rows={4}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Kohereza...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Ohereza Ubutumwa
                </>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};