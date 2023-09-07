/** @format */
"use server";

import { Database } from "@/types";
import {
  SupabaseClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteProfile(uuid: string) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", uuid);
  revalidatePath("/user");
}

export async function deleteUser(uuid: string) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase.auth.admin.deleteUser(uuid);
  revalidatePath("/user");
}

export const getUserProfiles = async (supabase: SupabaseClient<Database>) => {
  const { data, error } = await supabase.from("profiles").select("*");

  if (error) {
    return [];
  }
  return data ?? [];
};
