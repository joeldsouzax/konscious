/** @format */
"use server";

import { Database } from "@/types";
import {
  SupabaseClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteCategory(id: number) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase.from("category").delete().eq("id", id);
  revalidatePath("/");
}

export const getCategories = async (supabase: SupabaseClient<Database>) => {
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

export const getUserRole = async (supabase: SupabaseClient<Database>) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (user && user.app_metadata.role === "admin") return "ADMIN";
  if (user && user.app_metadata.role === "manager") return "MANAGER";
  if (user) return "MEMBER";
  return "ANON";
};
