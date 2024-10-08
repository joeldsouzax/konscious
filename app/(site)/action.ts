/** @format */
"use server";

import { Database } from "@/types";
import { AdminTypes } from "@/util";
import {
  SupabaseClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteEvent(id: number) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase.from("event").delete().eq("id", id);
  revalidatePath("/");
}

export const getEvents = async (supabase: SupabaseClient<Database>) => {
  const { data, error } = await supabase
    .from("event")
    .select()
    .order("event_start", { ascending: true });

  if (error) {
    return [];
  }
  return data ?? [];
};

export const getEventIdsAndTitle = async (
  supabase: SupabaseClient<Database>
) => {
  const { data, error } = await supabase
    .from("event")
    .select("id, title, events_categories (category_id)")
    .order("event_end");

  if (error) {
    return [];
  }

  return data ?? [];
};

export const getUserRole = async (
  supabase: SupabaseClient<Database>
): Promise<AdminTypes> => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (user && user.app_metadata.role === "admin") return "admin";
  if (user && user.app_metadata.role === "manager") return "manager";
  if (user && user.app_metadata.role === "controller") return "controller";
  if (user) return "member";

  return "anon";
};

export const getRootCategories = async (supabase: SupabaseClient<Database>) => {
  const { data: categories, error } = await supabase
    .from("category")
    .select()
    .is("parent_id", null);

  if (error) {
    return [];
  }

  console.log(error);

  return categories ?? [];
};
