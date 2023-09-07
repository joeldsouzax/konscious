import { Tables } from "@/types";
import * as React from "react";
import Link from "next/link";
import { AiFillEye } from "react-icons/ai";
import { DateTime } from "luxon";

interface ListEventsProps {
  users: Array<Tables<"profiles">>;
}

const ListUser: React.FC<ListEventsProps> = ({ users }) => {
  if (users.length === 0) return null;
  return (
    <table className="table table-sm border-collapse">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Birth Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, last_name, first_name, birth_date }) => (
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
            <td>
              <ul className="menu menu-horizontal bg-base-200 rounded-box">
                <li></li>
                <li>
                  <Link href={"/" + id}>
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
