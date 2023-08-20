/** @format */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      category: {
        Row: {
          category_id: number | null;
          created_at: string;
          description: string | null;
          id: number;
          title: string | null;
        };
        Insert: {
          category_id?: number | null;
          created_at?: string;
          description?: string | null;
          id?: number;
          title?: string | null;
        };
        Update: {
          category_id?: number | null;
          created_at?: string;
          description?: string | null;
          id?: number;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "category_category_id_fkey";
            columns: ["category_id"];
            referencedRelation: "category";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
