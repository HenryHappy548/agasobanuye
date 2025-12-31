import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const INDEXNOW_KEY = "b86be84dbe0f4020abb8d721cf272d5f";
const SITE_HOST = "rwaflix.store";
const KEY_LOCATION = `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`;

// Helper to create URL slug from movie title
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

async function submitToIndexNow(urls: string[]): Promise<{ success: boolean; message: string }> {
  if (urls.length === 0) {
    return { success: false, message: "No URLs to submit" };
  }

  console.log(`Submitting ${urls.length} URLs to IndexNow:`, urls);

  try {
    const response = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host: SITE_HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: urls,
      }),
    });

    console.log(`IndexNow response status: ${response.status}`);

    if (response.status === 200) {
      return { success: true, message: `Successfully submitted ${urls.length} URL(s) to IndexNow` };
    } else if (response.status === 202) {
      return { success: true, message: `URLs accepted for processing` };
    } else {
      const errorText = await response.text();
      console.error(`IndexNow error: ${response.status} - ${errorText}`);
      return { success: false, message: `IndexNow error: ${response.status}` };
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("Error submitting to IndexNow:", errorMessage);
    return { success: false, message: `Error: ${errorMessage}` };
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { movieId, movieTitle, urls, type } = await req.json();
    
    let urlsToSubmit: string[] = [];

    if (urls && Array.isArray(urls)) {
      // Direct URL submission
      urlsToSubmit = urls;
    } else if (movieId && movieTitle) {
      // Single movie notification
      const slug = slugify(movieTitle);
      urlsToSubmit = [
        `https://${SITE_HOST}/movie/${slug}`,
        `https://${SITE_HOST}/`, // Also notify homepage update
      ];
    } else if (type === "all-movies") {
      // Submit all movies - fetch from database
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { data: movies, error } = await supabase
        .from("movies")
        .select("title")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      urlsToSubmit = [
        `https://${SITE_HOST}/`,
        `https://${SITE_HOST}/movies`,
        `https://${SITE_HOST}/tv-shows`,
        `https://${SITE_HOST}/popular`,
        ...movies.map((m: { title: string }) => `https://${SITE_HOST}/movie/${slugify(m.title)}`),
      ];
    } else {
      // Default: submit main pages
      urlsToSubmit = [
        `https://${SITE_HOST}/`,
        `https://${SITE_HOST}/movies`,
        `https://${SITE_HOST}/tv-shows`,
        `https://${SITE_HOST}/popular`,
      ];
    }

    const result = await submitToIndexNow(urlsToSubmit);
    
    console.log("IndexNow result:", result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: result.success ? 200 : 400,
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('Error in indexnow function:', errorMessage);
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
