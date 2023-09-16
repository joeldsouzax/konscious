import { Tables } from "@/types";
import * as React from "react";
import Link from "next/link";
import { AiFillEye } from "react-icons/ai";
import { DateTime } from "luxon";
import DeleteUser from "./DeleteUser";
import { AdminTypes } from "@/util";

interface ListEventsProps {
  users: Array<Tables<"profiles">>;
  role: AdminTypes;
}

const ListUser: React.FC<ListEventsProps> = ({ users, role }) => {
  if (users.length === 0) return null;
  return (
    <table className="table table-sm border-collapse">
      <thead>
        <tr>
          <th className="text-lg">First Name</th>
          <th className="text-lg">Last Name</th>
          <th className="text-lg">Birth Date</th>
          <th className="text-lg">Admin</th>
          <th className="text-lg">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, last_name, first_name, birth_date, user_type }) => (
          <tr key={id}>
            <td className="max-w-[160px] truncate text-ellipsis overflow-hidden">
              <Link
                href={"/" + id}
                className="font-bold truncate text-ellipsis overflow-hidden"
              >
                {first_name}
              </Link>
            </td>
            <td className="max-w-[160px] truncate text-ellipsis overflow-hidden">
              {last_name}
            </td>

            <td className="max-w-[160px] truncate text-ellipsis overflow-hidden">
              {DateTime.fromISO(birth_date!)
                .setLocale("tr")
                .toLocaleString(DateTime.DATE_FULL)}
            </td>
            <td className="max-w-[160px] truncate text-ellipsis overflow-hidden">
              {user_type === "ADMIN" ? (
                <div className="badge badge-accent">YES</div>
              ) : (
                <div className="badge badge-secondary">NO</div>
              )}
            </td>
            <td>
              <ul className="menu menu-horizontal bg-base-200 rounded-box">
                {role === "admin" && (
                  <li>
                    <DeleteUser id={id} />
                  </li>
                )}
                <li>
                  <Link href={"/user/" + id}>
                    <AiFillEye />
                  </Link>
                </li>
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListUser;
