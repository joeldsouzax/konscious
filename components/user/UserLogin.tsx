"use client";
import * as React from "react";
import LoginScan from "./LoginScan";

const UserLogin: React.FC = () => {
  const [showAdminLogin, setShowAdminLogin] = React.useState(false);
  return (
    <div className="card-body flex flex-col items-center w-full">
      <input
        type="checkbox"
        className="toggle toggle-accent toggle-lg"
        checked={showAdminLogin}
        onChange={(e) => setShowAdminLogin((s) => !s)}
      />
      {showAdminLogin ? (
        <form
          action="/auth/sign-in"
          method="post"
          className="w-full"
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
          </div>
        </form>
      ) : (
        <LoginScan />
      )}
    </div>
  );
};

export default UserLogin;
