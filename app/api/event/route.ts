import { Database } from "@/types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const requestUrl = new URL(request.url);

  const formData = await request.formData();
  const title = String(formData.get("title"));
  const description = String(formData.get("description"));
  const isMember = Boolean(formData.get("is_member"));
  const parentID = Number(formData.get("parent_id"));

  const { error } = await supabase
    .from("category")
    .insert([
      {
        title,
        description,
        is_member: isMember,
        parent_id: parentID === 0 ? null : parentID,
      },
    ])
    .select();

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}?error=Could not create a category`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }

  return NextResponse.redirect(requestUrl.origin, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
