/** @format */

import { Messages, UserLogin } from "@/components";

export default function Login() {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Scan Qr Code to login</p>
          </div>
          <div className="card flex-shrink-0 min-h-[400px] w-full max-w-xl shadow-2xl bg-base-100">
            <UserLogin />
          </div>
          <Messages />
        </div>
      </div>
    </>
  );
}
