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
  const event_start = String(formData.get("event-start"));
  const event_end = String(formData.get("event-end"));
  const imageFile: Blob = formData.get("event_image") as Blob;
  const lat = Number(formData.get("latitude"));
  const long = Number(formData.get("longitude"));
  const address1 = String(formData.get("address1"));
  const address2 = String(formData.get("address2"));

  const now = new Date();
  const eventDate = new Date(date);

  // if (eventDate < now) {
  //   return NextResponse.redirect(
  //     `${requestUrl.origin}?error=event date is in the past`,
  //     {
  //       // a 301 status is required to redirect from a POST to a GET route
  //       status: 301,
  //     }
  //   );
  // }

  const { data, error: uploadError } = await supabase.storage
    .from("event")
    .upload(imageFile.name, imageFile, { upsert: true });

  console.log(uploadError);

  const { data: uploadedData } = await supabase.storage
    .from("event")
    .getPublicUrl(imageFile.name);

  if (uploadError || data === null) {
    return NextResponse.redirect(
      `${requestUrl.origin}?error=problem with event image upload`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }

  const { error } = await supabase
    .from("event")
    .insert([
      {
        title,
        description,
        is_member: isMember,
        event_start,
        event_end,
        image: uploadedData.publicUrl,
        lat,
        address: {
          address1,
          address2,
        },
        long,
      },
    ])
    .select();

  console.log(error);

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
