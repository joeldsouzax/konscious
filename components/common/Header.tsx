/** @format */
import { Database } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BsCalendarRange, BsChevronDown } from "react-icons/bs";
import { IoQrCodeOutline } from "react-icons/io5";
import { BiSolidUserAccount, BiLogInCircle } from "react-icons/bi";

import Link from "next/link";
import { getUserRole } from "@/app/(site)/action";

const Header: React.FC = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const role = await getUserRole(supabase);

  return (
    <div className="navbar bg-base-200">
      <header className="navbar container">
        <div className="navbar-start">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/scan">
                  <IoQrCodeOutline />
                  Open QR Code
                </Link>
              </li>
              <li>
                <Link href="/calendar">
                  <BsCalendarRange />
                  Events Calendar
                </Link>
              </li>
            </ul>
          </div>
          <Link
            href="/"
            role="button"
            className="btn btn-ghost normal-case text-xl"
          >
            Konscious.no
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {role === "MEMBER" && (
              <li>
                <Link href="/scan">
                  <IoQrCodeOutline />
                  Open QR Code
                </Link>
              </li>
            )}
            {role === "ADMIN" && (
              <li>
                <Link href="/events">
                  <BsCalendarRange />
                  Events Management
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          {role === "ANON" ? (
            <Link
              href="/login"
              className="btn btn-primary"
            >
              <BiSolidUserAccount />
              <p>Member Login</p>
            </Link>
          ) : (
            <form
              action="/auth/sign-out"
              method="post"
            >
              <button className="btn">Logout</button>
            </form>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
