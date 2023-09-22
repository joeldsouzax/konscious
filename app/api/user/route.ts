import { Database } from "@/types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { Console } from "console";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { use } from "react";

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
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { data: user } = await supabase.auth.getUser();

  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const first_name = String(formData.get("first_name"));
  const last_name = String(formData.get("last_name"));
  const email = String(formData.get("email"));
  const birth_date = String(formData.get("birth_date"));
  const phone_number = String(formData.get("phone_number"));
  const adminType = String(formData.get("admin_type"));

  if (adminType !== "null") {
    const password = String(formData.get("password"));
    const repeatPassword = String(formData.get("repeat_password"));

    // create admin user
    if (password === repeatPassword) {
      const { data: adminUser, error: adminError } =
        await adminClient.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: {
            first_name,
            last_name,
            birth_date,
            phone_number: phone_number.replace("+", "00"),
            user_type: "ADMIN",
          },
        });

      if (adminUser === null || adminError) {
        return NextResponse.redirect(
          `${requestUrl.origin}/user?error=${adminError?.message}`,
          {
            status: 301,
          }
        );
      }

      const { data: adminClaim, error: adminClaimError } = await supabase.rpc(
        "set_claim",
        {
          uid: adminUser.user?.id,
          claim: "role",
          value: adminType,
        }
      );

      if (adminClaim === null || adminClaimError) {
        return NextResponse.redirect(
          `${requestUrl.origin}/user?error=${adminClaimError?.message}`,
          {
            status: 301,
          }
        );
      }
    } else {
      return NextResponse.redirect(
        `${requestUrl.origin}/user?error=password does not match`,
        {
          status: 301,
        }
      );
    }
  } else {
    const memberType = String(formData.get("member_type"));
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
          phone_number: phone_number.replace("+", "00"),
          user_type: memberType,
        },
      });

    if (user === null || userError) {
      return NextResponse.redirect(
        `${requestUrl.origin}/user?error=${userError?.message}`,
        {
          status: 301,
        }
      );
    }
  }

  return NextResponse.redirect(`${requestUrl.origin}/user`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}

const setClaims = async (uid: string, claim: string, value: string) => {
  const { data, error } = await adminClient.rpc("set_claim", {
    uid,
    claim,
    value,
  });
  return { data, error };
};
