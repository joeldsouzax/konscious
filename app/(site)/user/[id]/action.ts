"use server";
import { Database } from "@/types";
import {
  SupabaseClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const getUser = async (
  supabase: SupabaseClient<Database>,
  id: string
) => {
  const { data, error } = await supabase.from("profiles").select().eq("id", id);
  if (error) {
    return null;
  }
  return data[0] ?? null;
};

export const getUserEvents = async (
  supabase: SupabaseClient<Database>,
  id: string
) => {
  return [];
};
