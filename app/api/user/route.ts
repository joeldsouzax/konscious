import { Database } from "@/types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const first_name = String(formData.get("first_name"));
  const last_name = String(formData.get("last_name"));
  const email = String(formData.get("email"));
  const birth_date = String(formData.get("birth_date"));

  const password = birth_date.replaceAll("-", "") + first_name.toLowerCase();

  const { data: user, error: userError } =
    await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        first_name,
        last_name,
        birth_date,
      },
    });

  console.log(userError);

  if (user === null || userError) {
    return NextResponse.redirect(
      `${requestUrl.origin}/user?error=Could not create the user`,
      {
        status: 301,
      }
    );
  }

  // TODO: generate a qrcode and store it in the bucket as png

  return NextResponse.redirect(`${requestUrl.origin}/user`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
