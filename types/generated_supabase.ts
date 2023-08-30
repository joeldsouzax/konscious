export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      category: {
        Row: {
          created_at: string
          description: string | null
          id: number
          is_member: boolean | null
          parent_id: number | null
          title: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          is_member?: boolean | null
          parent_id?: number | null
          title?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          is_member?: boolean | null
          parent_id?: number | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "category_parent_id_fkey"
            columns: ["parent_id"]
            referencedRelation: "category"
            referencedColumns: ["id"]
          }
        ]
      }
      event: {
        Row: {
          created_at: string
          date: string | null
          description: string | null
          ends_at: string | null
          id: number
          image: string | null
          is_member: boolean | null
          link: string | null
          starts_at: string | null
          title: string | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          description?: string | null
          ends_at?: string | null
          id?: number
          image?: string | null
          is_member?: boolean | null
          link?: string | null
          starts_at?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string
          date?: string | null
          description?: string | null
          ends_at?: string | null
          id?: number
          image?: string | null
          is_member?: boolean | null
          link?: string | null
          starts_at?: string | null
          title?: string | null
        }
        Relationships: []
      }
      events_categories: {
        Row: {
          category_id: number
          created_at: string
          event_id: number
        }
        Insert: {
          category_id: number
          created_at?: string
          event_id: number
        }
        Update: {
          category_id?: number
          created_at?: string
          event_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "events_categories_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_categories_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "event"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_claim: {
        Args: {
          uid: string
          claim: string
        }
        Returns: string
      }
      get_claim: {
        Args: {
          uid: string
          claim: string
        }
        Returns: Json
      }
      get_claims: {
        Args: {
          uid: string
        }
        Returns: Json
      }
      get_my_claim: {
        Args: {
          claim: string
        }
        Returns: Json
      }
      get_my_claims: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      is_claims_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      set_claim: {
        Args: {
          uid: string
          claim: string
          value: Json
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
