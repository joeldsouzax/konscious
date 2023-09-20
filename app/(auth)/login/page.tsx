/** @format */

import { Messages, UserLogin } from "@/components";
import Image from "next/image";

export default function Login() {
  return (
    <>
      <section className="flex flex-col-reverse justify-center items-center">
        <div className="w-full flex flex-col items-center">
          <Image
            src={"/cover.jpeg"}
            alt="bodrum-festival"
            width={600}
            height={200}
          />
        </div>
        <div className="card w-full md:w-96">
          <UserLogin />
        </div>
        <Messages />
      </section>
    </>
  );
}
