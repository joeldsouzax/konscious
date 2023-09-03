import { Database } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";

export const getCategory = async (
  supabase: SupabaseClient<Database>,
  id: string
) => {
  const { data, error } = await supabase.from("category").select().eq("id", id);
  if (error) {
    return null;
  }
  return data[0] ?? null;
};
