/** @format */
import { Database } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BsCalendarRange, BsChevronDown } from "react-icons/bs";
import { IoQrCodeOutline } from "react-icons/io5";
import { BiSolidUserAccount, BiLogInCircle } from "react-icons/bi";

import Link from "next/link";
import BrandLogo from "./BrandLogo";

const Header: React.FC = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // profile can only be viewd by the user and no one else.
  const { data, error: profileError } = await supabase
    .from("profiles")
    .select()
    .limit(1);

  return (
    <header className="navbar bg-base-100 container">
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
      <div className="navbar-end">
        {user ? (
          <Link
            href="/profile"
            className="link link-success"
          >
            {user.email}
          </Link>
        ) : (
          <Link
            href="/login"
            className="btn btn-primary"
          >
            <BiSolidUserAccount />
            <p>Member Login</p>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
