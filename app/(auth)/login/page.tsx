/** @format */

import Link from "next/link";
import Messages from "./messages";
import { BsChevronLeft } from "react-icons/bs";

export default function Login() {
  return (
    <>
      <header className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center sm:justify-between sm:gap-4">
            <Link
              className="inline-flex items-center gap-2 rounded border border-indigo-600 px-8 py-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
              href="/"
            >
              <BsChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-lg font-medium"> Back </span>
            </Link>
          </div>
        </div>
      </header>
      <main
        id="content"
        role="main"
        className="bg-white"
      >
        <form
          className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          action="/auth/sign-in"
          method="post"
        >
          <label
            className="text-md"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label
            className="text-md"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <button className="bg-green-700 rounded px-4 py-2 text-white mb-2">
            Sign In
          </button>
          <button
            formAction="/auth/sign-up"
            className="border border-gray-700 rounded px-4 py-2 text-white mb-2"
          >
            Sign Up
          </button>
          <Messages />
        </form>
      </main>
    </>
  );
}
