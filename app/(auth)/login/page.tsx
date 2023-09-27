/** @format */

import { Messages, UserLogin } from "@/components";
import { Database } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { error } from "console";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/");
  }

  return (
    <>
      <section className="flex flex-col-reverse justify-center items-center">
        <div className="w-full flex flex-col items-center">
          <Link href={"/"}>
            <Image
              src={"/cover.jpeg"}
              alt="bodrum-festival"
              width={600}
              height={200}
            />
          </Link>
        </div>
        <div className="card w-full md:w-96">
          <UserLogin />
        </div>
        <Messages />
      </section>
    </>
  );
}
