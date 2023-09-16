import { Database } from "@/types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const requestUrl = new URL(request.url);

  const formData = await request.formData();
  const event_id = Number(formData.get("event_id"));
  const user_id = String(formData.get("user_id"));

  const { data, error: userEventsError } = await supabase
    .from("user_events")
    .select()
    .eq("event_id", event_id)
    .eq("user_id", user_id);

  if (data !== null && data.length > 0) {
    return NextResponse.redirect(
      `${requestUrl.origin}/${event_id}?message=Member already scanned`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  } else {
    const { error } = await supabase
      .from("user_events")
      .insert([{ user_id, event_id }])
      .select();

    if (error) {
      return NextResponse.redirect(
        `${requestUrl.origin}/${event_id}?error=error scanning the code`,
        {
          // a 301 status is required to redirect from a POST to a GET route
          status: 301,
        }
      );
    }
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/${event_id}?message=User Scanned Successfully`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  );
}
