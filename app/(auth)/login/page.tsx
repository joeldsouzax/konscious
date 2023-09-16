/** @format */

import { LoginScan, Messages } from "@/components";

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
            <div className="card-body">
              {/* <form
                action="/auth/sign-in"
                method="post"
              >
                <div className="form-control">
                  <label
                    className="label"
                    htmlFor="email"
                  >
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    className="input input-bordered"
                    name="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="form-control">
                  <label
                    className="label"
                    htmlFor="password"
                  >
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    className="input input-bordered"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div className="form-control mt-6 gap-2">
                  <button className="btn btn-primary">Sign In</button>
                  <button
                    formAction="/auth/sign-up"
                    className="btn btn-secondary"
                  >
                    Sign Up
                  </button>
                </div>
                <Messages />
              </form> */}
              <LoginScan />
              <Messages />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
