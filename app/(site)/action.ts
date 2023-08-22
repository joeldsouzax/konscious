/** @format */
"use server";

import { Database } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteCategory(id: number | string) {
  const supabase = createServerComponentClient<Database>({ cookies });
  supabase.from("category").delete().eq("id", id);
  revalidatePath("/admin");
}

export const addCategory = async (formData: FormData) => {
  const title = formData.get("title");
  const description = formData.get("description");
  const parent_id = formData.get("parent_id");

  if (parent_id && title && description) {
    const supabase = createServerComponentClient({ cookies });
    await supabase
      .from("category")
      .insert({ title, description, parent_id })
      .select();
    revalidatePath("/admin");
  }
};
