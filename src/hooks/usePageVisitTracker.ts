import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

let tracked = false;

export const usePageVisitTracker = () => {
  useEffect(() => {
    if (tracked) return;
    tracked = true;

    const trackVisit = async () => {
      try {
        await supabase.from("page_visits").insert({
          page_path: window.location.pathname,
          user_agent: navigator.userAgent.slice(0, 256),
          referrer: document.referrer?.slice(0, 512) || null,
        });
      } catch (e) {
        // Silent fail - don't block user experience
      }
    };

    trackVisit();
  }, []);
};
