/** @format */
"use server";

import { Database } from "@/types";

import {
  SupabaseClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const adminClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPBASE_SERVICE_ROLE_KEY as string,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function deleteProfile(uuid: string) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", uuid);
  revalidatePath("/user");
}

export async function deleteUser(uuid: string) {
  const { data, error } = await adminClient.auth.admin.deleteUser(uuid);
  revalidatePath("/user");
}

export const getUserProfiles = async (supabase: SupabaseClient<Database>) => {
  const { data, error } = await supabase.from("profiles").select("*");
  if (error) {
    return [];
  }
  return data ?? [];
};
