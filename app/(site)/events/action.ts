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
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (user && user.app_metadata.role === "admin") {
    const { data, error } = await supabase
      .from("category")
      .select()
      .order("created_at", { ascending: true });

    if (error) {
      return [];
    }
    return data ?? [];
  }
  const { data, error } = await supabase
    .from("category")
    .select()
    .is("parent_id", null)
    .order("created_at", { ascending: true });

  if (error) {
    return [];
  }

  return data ?? [];
};
