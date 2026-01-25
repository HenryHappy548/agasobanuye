import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  affiliate_link: string;
  image_url: string;
  category: string;
  is_active: boolean;
  display_order: number;
}

interface UseProductsOptions {
  limit?: number;
  category?: string;
  activeOnly?: boolean;
  enableRealtime?: boolean; // Only enable for admin pages
}

const fetchProductsFromDB = async ({
  limit,
  category,
  activeOnly,
}: UseProductsOptions): Promise<Product[]> => {
  let query = supabase
    .from("products")
    .select("*")
    .order("display_order", { ascending: true })
    .limit(limit || 20);

  if (activeOnly) query = query.eq("is_active", true);
  if (category && category !== "general") query = query.eq("category", category);

  const { data } = await query;
  return (data as Product[]) || [];
};

export const useProducts = ({
  limit = 20,
  category,
  activeOnly = true,
  enableRealtime = false, // Default to false for public pages
}: UseProductsOptions = {}) => {
  const queryClient = useQueryClient();
  const queryKey = ['products', limit, category, activeOnly];

  const { data: products = [], isLoading: loading, refetch } = useQuery({
    queryKey,
    queryFn: () => fetchProductsFromDB({ limit, category, activeOnly }),
    staleTime: 5 * 60 * 1000, // 5 minutes - longer cache for slow connections
    gcTime: 15 * 60 * 1000, // 15 minutes cache
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // Real-time subscription ONLY for admin pages
  useEffect(() => {
    if (!enableRealtime) return; // Skip for public pages
    
    let debounceTimer: NodeJS.Timeout;
    
    const channel = supabase
      .channel(`products-${category || "all"}-${limit}-${activeOnly ? "active" : "all"}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => {
          // Debounce to prevent rapid refetches
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
          }, 3000);
        }
      )
      .subscribe();

    return () => {
      clearTimeout(debounceTimer);
      supabase.removeChannel(channel);
    };
  }, [activeOnly, category, limit, queryClient, enableRealtime]);

  return { products, loading, refetch };
};
