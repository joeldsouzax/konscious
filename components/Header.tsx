/** @format */
import { Database } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { BsCalendarRange, BsChevronDown } from "react-icons/bs";
import { IoQrCodeOutline } from "react-icons/io5";
import { AiOutlineLogin } from "react-icons/ai";

import Link from "next/link";
import BrandLogo from "./BrandLogo";

const Header: React.FC = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <header className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center sm:justify-between sm:gap-4">
          <div className="relative hidden sm:block">
            {/* <BrandLogo className="text-xl" /> */}
          </div>

          <div className="flex flex-1 items-center justify-between gap-8 sm:justify-end">
            {user ? (
              <button
                type="button"
                className="group flex shrink-0 items-center rounded-lg transition"
              >
                <span className="sr-only">Menu</span>
                <img
                  alt="Man"
                  src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  className="h-10 w-10 rounded-full object-cover"
                />

                <p className="ms-2 hidden text-left text-xs sm:block">
                  <strong className="block font-medium">""</strong>
                  <span className="text-gray-500">{user && user.email}</span>
                </p>

                <BsChevronDown />
              </button>
            ) : (
              <Link
                className="inline-flex items-center gap-2 rounded border border-indigo-600 px-8 py-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                href="/login"
              >
                <AiOutlineLogin />
                <span className="text-sm font-medium"> Login </span>
              </Link>
            )}
          </div>
        </div>

        {user && (
          <div className="mt-8">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Welcome {user.email}
            </h1>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
