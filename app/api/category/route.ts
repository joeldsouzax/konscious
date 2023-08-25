import { Database } from "@/types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

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
      return NextResponse.error();
    }
    return NextResponse.json({ categories: data ?? [] });
  }

  // get data for auth user
  const { data, error } = await supabase
    .from("category")
    .select()
    .is("parent_id", null)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.error();
  }

  return NextResponse.json({ data });
}
