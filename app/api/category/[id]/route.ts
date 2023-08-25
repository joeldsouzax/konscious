import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(request: Request, context: any) {
  console.log(context);
  const supabase = createRouteHandlerClient({ cookies });
  const user = await supabase.auth.getUser();
  console.log(user);
  return NextResponse.json({});
}

// TODO: get one category
