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
          address: Json | null
          created_at: string
          description: string | null
          event_end: string | null
          event_start: string | null
          id: number
          image: string | null
          is_member: boolean | null
          lat: number | null
          link: string | null
          long: number | null
          title: string | null
        }
        Insert: {
          address?: Json | null
          created_at?: string
          description?: string | null
          event_end?: string | null
          event_start?: string | null
          id?: number
          image?: string | null
          is_member?: boolean | null
          lat?: number | null
          link?: string | null
          long?: number | null
          title?: string | null
        }
        Update: {
          address?: Json | null
          created_at?: string
          description?: string | null
          event_end?: string | null
          event_start?: string | null
          id?: number
          image?: string | null
          is_member?: boolean | null
          lat?: number | null
          link?: string | null
          long?: number | null
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
      user_events: {
        Row: {
          created_at: string
          event_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_events_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "event"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_events_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
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
