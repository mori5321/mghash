export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  app: {
    Tables: {
      todos: {
        Row: {
          created_at: string
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      authors: {
        Row: {
          created_at: string | null
          tw_author_id: string
        }
        Insert: {
          created_at?: string | null
          tw_author_id: string
        }
        Update: {
          created_at?: string | null
          tw_author_id?: string
        }
        Relationships: []
      }
      images: {
        Row: {
          id: string
          image_number: number
          tw_tweet_id: string
          url: string
        }
        Insert: {
          id?: string
          image_number: number
          tw_tweet_id: string
          url: string
        }
        Update: {
          id?: string
          image_number?: number
          tw_tweet_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "images_tw_tweet_id_fkey"
            columns: ["tw_tweet_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["tw_tweet_id"]
          }
        ]
      }
      mangas: {
        Row: {
          created_at: string | null
          posted_at: string
          tw_author_id: string
          tw_conversation_id: string
        }
        Insert: {
          created_at?: string | null
          posted_at: string
          tw_author_id: string
          tw_conversation_id: string
        }
        Update: {
          created_at?: string | null
          posted_at?: string
          tw_author_id?: string
          tw_conversation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mangas_tw_author_id_fkey"
            columns: ["tw_author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["tw_author_id"]
          }
        ]
      }
      pages: {
        Row: {
          created_at: string | null
          page_number: number
          text: string
          tw_author_id: string
          tw_conversation_id: string
          tw_tweet_id: string
        }
        Insert: {
          created_at?: string | null
          page_number: number
          text: string
          tw_author_id: string
          tw_conversation_id: string
          tw_tweet_id: string
        }
        Update: {
          created_at?: string | null
          page_number?: number
          text?: string
          tw_author_id?: string
          tw_conversation_id?: string
          tw_tweet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pages_tw_conversation_id_fkey"
            columns: ["tw_conversation_id"]
            isOneToOne: false
            referencedRelation: "mangas"
            referencedColumns: ["tw_conversation_id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

