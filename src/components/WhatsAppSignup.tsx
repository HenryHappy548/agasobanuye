import { useState, useEffect, memo } from "react";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "rwaflix.wa.subscribed";

const WhatsAppSignup = memo(() => {
  const [visible, setVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Don't show if already subscribed
    if (localStorage.getItem(STORAGE_KEY)) return;
    // Show after 15s of browsing
    const timer = setTimeout(() => setVisible(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, "dismissed");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = phone.trim().replace(/\s+/g, "");
    if (clean.length < 10 || submitting) return;

    setSubmitting(true);
    try {
      await supabase.from("whatsapp_subscribers" as any).insert({ phone: clean } as any);
    } catch {
      // ignore duplicates
    }
    localStorage.setItem(STORAGE_KEY, "subscribed");
    setDone(true);
    setTimeout(() => setVisible(false), 2000);
    setSubmitting(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 flex justify-center animate-fade-in">
      <div className="w-full max-w-sm bg-card border border-border rounded-xl shadow-lg p-4 relative">
        <button
          onClick={dismiss}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground p-1"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {done ? (
          <p className="text-sm text-primary font-medium text-center py-1">
            ✓ Murakoze! Uzakira amakuru mashya.
          </p>
        ) : (
          <>
            <p className="text-sm font-medium text-foreground mb-1">
              Ukunda movie? 🎬
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              Shyiraho nimero yawe ukire update za movie nshya kuri WhatsApp
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
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
                disabled={submitting || phone.trim().length < 10}
                className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {submitting ? "..." : "OK"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
});

WhatsAppSignup.displayName = "WhatsAppSignup";
export default WhatsAppSignup;
