"use server";
import { Database } from "@/types";
import {
  SupabaseClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

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

export const getCategoryEvents = async (
  supabase: SupabaseClient<Database>,
  id: string
) => {
  const { data, error } = await supabase
    .from("category")
    .select("id, events_categories ( event_id )")
    .eq("id", id);

  if (error) {
    return [];
  }

  return data ?? [];
};

export async function addCategoryEvent(id: number, eventId: number) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data } = await supabase
    .from("events_categories")
    .select("event_id")
    .eq("category_id", id);

  if (!data) {
    const { error } = await supabase
      .from("events_categories")
      .insert({ category_id: id, event_id: eventId })
      .select();
  } else {
    const existingEvents = data.map((event) => event.event_id);
    if (existingEvents.includes(eventId)) {
      const { error } = await supabase
        .from("events_categories")
        .delete()
        .eq("category_id", id)
        .eq("event_id", eventId);

      console.log(error);
    } else {
      const { error } = await supabase
        .from("events_categories")
        .insert({ category_id: id, event_id: eventId })
        .select();

      console.log(error);
    }
  }

  revalidatePath("/category/" + id);
}
