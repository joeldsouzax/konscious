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
  const date = String(formData.get("date"));
  const time = String(formData.get("time"));

  const { error } = await supabase
    .from("event")
    .insert([
      {
        title,
        description,
        is_member: isMember,
        date,
        time,
      },
    ])
    .select();

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/events?error=Could not create the event`,
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
