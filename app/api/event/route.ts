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
  const ends_at = String(formData.get("ends_at"));
  const starts_at = String(formData.get("starts_at"));
  const imageFile = formData.get("event_image");

  const now = new Date();
  const eventDate = new Date(date);

  if (eventDate < now) {
    return NextResponse.redirect(
      `${requestUrl.origin}?error=event date is in the past`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }

  // TODO: validate end time is not lesser than start time
  // TODO: upload events image

  const { error } = await supabase
    .from("event")
    .insert([
      {
        title,
        description,
        is_member: isMember,
        date,
        ends_at,
        starts_at,
      },
    ])
    .select();

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}?error=Could not create the event`,
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
