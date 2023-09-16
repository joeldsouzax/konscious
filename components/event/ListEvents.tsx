import { Tables } from "@/types";
import * as React from "react";
import DeleteEvent from "./DeleteEvent";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { AiFillEye } from "react-icons/ai";
import { DateTime } from "luxon";
import { AdminTypes } from "@/util";

interface ListEventsProps {
  events: Array<Tables<"event">>;
  role: AdminTypes;
}

const ListEvents: React.FC<ListEventsProps> = ({ events, role }) => {
  if (events.length === 0) return null;
  return (
    <table className="table table-sm border-collapse">
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Description</th>
          <th>Starts At</th>
          <th>Ends At</th>
          <th>Member?</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.map(
          ({
            is_member,
            event_start,
            event_end,
            title,
            description,
            id,
            image,
            lat,
            long,
          }) => (
            <tr key={id}>
              <td className="max-w-[160px] truncate text-ellipsis overflow-hidden">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img
                      src={image!}
                      alt={title ?? "Event Image"}
                    />
                  </div>
                </div>
              </td>
              <td className="max-w-[160px] truncate text-ellipsis overflow-hidden">
                <Link
                  href={"/" + id}
                  className="font-bold truncate text-ellipsis overflow-hidden"
                >
                  {title}
                </Link>
              </td>
              <td className="max-w-[160px] truncate text-ellipsis overflow-hidden">
                {description}
              </td>

              <td className="max-w-[160px] truncate text-ellipsis overflow-hidden">
                {DateTime.fromISO(event_start!)
                  .setLocale("tr")
                  .toLocaleString(DateTime.DATETIME_FULL)}
              </td>
              <td className="max-w-[160px] truncate text-ellipsis overflow-hidden">
                {DateTime.fromISO(event_end!)
                  .setLocale("tr")
                  .toLocaleString(DateTime.DATETIME_FULL)}
              </td>
              <td className="max-w-[160px] truncate text-ellipsis overflow-hidden">
                <div
                  className={twMerge(
                    "badge",
                    is_member ? "badge-success" : "badge-error"
                  )}
                >
                  {is_member ? "YES" : "NO"}
                </div>
              </td>
              <td>
                <ul className="menu menu-horizontal bg-base-200 rounded-box">
                  {role === "admin" && (
                    <li>
                      <DeleteEvent id={id} />
                    </li>
                  )}
                  <li>
                    <Link href={"/" + id}>
                      <AiFillEye />
                    </Link>
                  </li>
                </ul>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default ListEvents;
