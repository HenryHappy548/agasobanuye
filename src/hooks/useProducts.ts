import { useCallback, useEffect, useState } from "react";
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
}

export const useProducts = ({
  limit = 20,
  category,
  activeOnly = true,
}: UseProductsOptions = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);

    let query = supabase
      .from("products")
      .select("*")
      .order("display_order", { ascending: true })
      .limit(limit);

    if (activeOnly) query = query.eq("is_active", true);
    if (category && category !== "general") query = query.eq("category", category);

    const { data } = await query;
    setProducts((data as Product[]) || []);
    setLoading(false);
  }, [activeOnly, category, limit]);

  useEffect(() => {
    fetchProducts();

    const channel = supabase
      .channel(`products-${category || "all"}-${limit}-${activeOnly ? "active" : "all"}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => {
          fetchProducts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeOnly, category, fetchProducts, limit]);

  return { products, loading, refetch: fetchProducts };
};
