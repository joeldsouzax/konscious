/** @format */
import { Database } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { BiSolidUserAccount, BiCategory, BiHome, BiUser } from "react-icons/bi";
import Link from "next/link";
import { getUserRole } from "@/app/(site)/action";
import { crudUsers } from "@/util";

const Header: React.FC = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const role = await getUserRole(supabase);

  return (
    <div className="navbar bg-base-200">
      <header className="navbar container">
        <div className="navbar-start">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link
                href="/"
                role="button"
                className="btn btn-ghost normal-case text-xl"
              >
                <BiHome />
              </Link>
            </li>
            {crudUsers.includes(role) && (
              <>
                <li>
                  <Link
                    href="/category"
                    role="button"
                    className="btn btn-ghost normal-case text-xl"
                  >
                    <BiCategory />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/user"
                    role="button"
                    className="btn btn-ghost normal-case text-xl"
                  >
                    <BiUser />
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          {role === "anon" ? (
            <Link
              href="/login"
              className="link"
            >
              <p>Sign in</p>
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
