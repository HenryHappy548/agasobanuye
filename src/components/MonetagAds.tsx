import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SiteSettings {
  vignette_zone_1: string;
  vignette_zone_2: string;
  vignette_script_1: string;
  vignette_script_2: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  vignette_zone_1: "10527776",
  vignette_zone_2: "10527843",
  vignette_script_1: "https://omg10.com/vignette.min.js",
  vignette_script_2: "https://nap5k.com/vignette.min.js",
};

export const MonetagInpush = () => null;
export const MonetagVignette = () => null;

export const MonetagAdsBootstrap = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    // Fetch settings from Supabase
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("id, value");

        if (error) {
          console.error("Error fetching site settings:", error);
          setSettings(DEFAULT_SETTINGS);
          return;
        }

        if (data && data.length > 0) {
          const settingsObj: SiteSettings = { ...DEFAULT_SETTINGS };
          data.forEach((row) => {
            if (row.id in settingsObj) {
              (settingsObj as any)[row.id] = row.value;
            }
          });
          setSettings(settingsObj);
        } else {
          setSettings(DEFAULT_SETTINGS);
        }
      } catch (e) {
        console.error("Error:", e);
        setSettings(DEFAULT_SETTINGS);
      }
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    if (!settings) return;

    const loadVignette = (zoneId: string, scriptUrl: string) => {
      if (typeof document === "undefined") return;
      if (document.querySelector(`script[data-zone="${zoneId}"]`)) return;

      try {
        (window as any).monetag = { zoneid: zoneId };
        const script = document.createElement("script");
        script.dataset.zone = zoneId;
        script.src = scriptUrl;
        script.async = true;
        script.onload = () => console.log(`Vignette ${zoneId} loaded`);
        script.onerror = () => console.error(`Failed to load vignette ${zoneId}`);
        document.head.appendChild(script);
      } catch (e) {
        console.error("Error loading vignette:", e);
      }
    };

    loadVignette(settings.vignette_zone_1, settings.vignette_script_1);
    
    setTimeout(() => {
      loadVignette(settings.vignette_zone_2, settings.vignette_script_2);
    }, 2000);
  }, [settings]);

  return null;
};