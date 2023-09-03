import { Database } from "@/types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface Context {
  params: { id: string };
}

export async function POST(request: Request, { params }: Context) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const requestUrl = new URL(request.url);
  console.log(params.id);
  const formData = await request.formData();

  return NextResponse.redirect(`${requestUrl.origin}/category/${params.id}`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
