/** @format */
"use server";

import { Database } from "@/types";
import {
  SupabaseClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteEvent(id: number) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase.from("category").delete().eq("id", id);
  revalidatePath("/");
}

export const getEvents = async (supabase: SupabaseClient<Database>) => {
  const { data, error } = await supabase
    .from("event")
    .select()
    .order("created_at", { ascending: true });

  if (error) {
    return [];
  }
  return data ?? [];
};
