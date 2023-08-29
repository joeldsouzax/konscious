import { Tables } from "@/types";
import * as React from "react";
import DeleteEvent from "./DeleteEvent";
import { twMerge } from "tailwind-merge";

interface ListEventsProps {
  events: Array<Tables<"event">>;
}

const ListEvents: React.FC<ListEventsProps> = ({ events }) => {
  if (events.length === 0) return null;
  return (
    <table className="table table-sm border-collapse">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Member?</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.map(({ is_member, time, date, title, description, id }) => (
          <tr key={id}>
            <td className="max-w-[160px] truncate text-ellipsis overflow-hidden">
              <div className="font-bold truncate text-ellipsis overflow-hidden">
                {title}
              </div>
            </td>
            <td className="max-w-[160px] truncate text-ellipsis overflow-hidden">
              {description}
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
                <li>
                  <DeleteEvent id={id} />
                </li>
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListEvents;
