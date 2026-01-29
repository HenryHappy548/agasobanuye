export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      affiliate_clicks: {
        Row: {
          category: string | null
          clicked_at: string
          id: string
          product_name: string
          referrer: string | null
          user_agent: string | null
        }
        Insert: {
          category?: string | null
          clicked_at?: string
          id?: string
          product_name: string
          referrer?: string | null
          user_agent?: string | null
        }
        Update: {
          category?: string | null
          clicked_at?: string
          id?: string
          product_name?: string
          referrer?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          comment: string
          created_at: string
          id: string
          movie_id: string | null
          movie_key: string | null
          user_id: string | null
          username: string
        }
        Insert: {
          comment: string
          created_at?: string
          id?: string
          movie_id?: string | null
          movie_key?: string | null
          user_id?: string | null
          username: string
        }
        Update: {
          comment?: string
          created_at?: string
          id?: string
          movie_id?: string | null
          movie_key?: string | null
          user_id?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string | null
          id: string
          message: string
          name: string
          phone: string | null
          status: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      download_links: {
        Row: {
          created_at: string | null
          id: string
          quality: string
          size: string | null
          type: string | null
          url: string
          video_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          quality: string
          size?: string | null
          type?: string | null
          url: string
          video_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          quality?: string
          size?: string | null
          type?: string | null
          url?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "download_links_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      movie_views: {
        Row: {
          id: string
          movie_id: string
          referrer: string | null
          user_agent: string | null
          viewed_at: string
        }
        Insert: {
          id?: string
          movie_id: string
          referrer?: string | null
          user_agent?: string | null
          viewed_at?: string
        }
        Update: {
          id?: string
          movie_id?: string
          referrer?: string | null
          user_agent?: string | null
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "movie_views_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["id"]
          },
        ]
      }
      movies: {
        Row: {
          category: string
          created_at: string
          description: string | null
          download_url: string | null
          dubbed: string | null
          featured: boolean | null
          genre: string
          id: string
          poster_url: string | null
          rating: string
          title: string
          updated_at: string
          video_url: string | null
          year: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          download_url?: string | null
          dubbed?: string | null
          featured?: boolean | null
          genre: string
          id?: string
          poster_url?: string | null
          rating: string
          title: string
          updated_at?: string
          video_url?: string | null
          year: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          download_url?: string | null
          dubbed?: string | null
          featured?: boolean | null
          genre?: string
          id?: string
          poster_url?: string | null
          rating?: string
          title?: string
          updated_at?: string
          video_url?: string | null
          year?: string
        }
        Relationships: []
      }
      poll_votes: {
        Row: {
          id: string
          series_name: string
          session_id: string
          user_id: string | null
          voted_at: string
        }
        Insert: {
          id?: string
          series_name: string
          session_id: string
          user_id?: string | null
          voted_at?: string
        }
        Update: {
          id?: string
          series_name?: string
          session_id?: string
          user_id?: string | null
          voted_at?: string
        }
        Relationships: []
      }
      premium_code_movies: {
        Row: {
          code_id: string
          created_at: string
          id: string
          movie_id: string
        }
        Insert: {
          code_id: string
          created_at?: string
          id?: string
          movie_id: string
        }
        Update: {
          code_id?: string
          created_at?: string
          id?: string
          movie_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "premium_code_movies_code_id_fkey"
            columns: ["code_id"]
            isOneToOne: false
            referencedRelation: "premium_codes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "premium_code_movies_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "premium_movies"
            referencedColumns: ["id"]
          },
        ]
      }
      premium_codes: {
        Row: {
          client_name: string
          client_phone: string | null
          code: string
          created_at: string
          id: string
          is_active: boolean
          updated_at: string
        }
        Insert: {
          client_name: string
          client_phone?: string | null
          code: string
          created_at?: string
          id?: string
          is_active?: boolean
          updated_at?: string
        }
        Update: {
          client_name?: string
          client_phone?: string | null
          code?: string
          created_at?: string
          id?: string
          is_active?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      premium_movies: {
        Row: {
          created_at: string
          description: string | null
          download_url: string | null
          genre: string | null
          id: string
          poster_url: string | null
          title: string
          updated_at: string
          video_url: string | null
          year: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          download_url?: string | null
          genre?: string | null
          id?: string
          poster_url?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
          year?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          download_url?: string | null
          genre?: string | null
          id?: string
          poster_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
          year?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          affiliate_link: string
          category: string | null
          created_at: string
          display_order: number | null
          id: string
          image_url: string
          is_active: boolean | null
          name: string
          original_price: number | null
          price: number
          updated_at: string
        }
        Insert: {
          affiliate_link: string
          category?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url: string
          is_active?: boolean | null
          name: string
          original_price?: number | null
          price: number
          updated_at?: string
        }
        Update: {
          affiliate_link?: string
          category?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          name?: string
          original_price?: number | null
          price?: number
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          role: string
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          role?: string
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      videos: {
        Row: {
          created_at: string | null
          embed_code: string
          episode: number | null
          host: string | null
          id: string
          season: number | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          video_key: string
        }
        Insert: {
          created_at?: string | null
          embed_code: string
          episode?: number | null
          host?: string | null
          id?: string
          season?: number | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          video_key: string
        }
        Update: {
          created_at?: string | null
          embed_code?: string
          episode?: number | null
          host?: string | null
          id?: string
          season?: number | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          video_key?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_premium_code: {
        Args: { client_name_input: string; client_phone_input?: string }
        Returns: string
      }
      get_movie_view_counts: {
        Args: never
        Returns: {
          movie_id: string
          view_count: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
      poll_get_results: {
        Args: never
        Returns: {
          series_name: string
          vote_count: number
        }[]
      }
      poll_has_voted: { Args: { _session_id: string }; Returns: boolean }
      validate_premium_code: {
        Args: { access_code: string }
        Returns: {
          description: string
          download_url: string
          genre: string
          movie_id: string
          poster_url: string
          title: string
          video_url: string
          year: string
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
