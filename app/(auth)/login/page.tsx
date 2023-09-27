/** @format */

import { Messages, UserLogin } from "@/components";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Login() {
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
