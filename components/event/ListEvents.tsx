import { Tables } from "@/types";
import * as React from "react";
import DeleteEvent from "./DeleteEvent";
import { twMerge } from "tailwind-merge";

interface ListEventsProps {
  events: Array<Tables<"event">>;
}

function parseTime(time: string) {
  let timeInt = parseInt(time);
  let minutes = time.substring(3, 5);

  // you could then add or subtract time here as needed

  if (time > "12:00") {
    return `${timeInt - 12}:${minutes} PM`;
  } else {
    return `${timeInt}:${minutes} AM`;
  }
}

const ListEvents: React.FC<ListEventsProps> = ({ events }) => {
  if (events.length === 0) return null;
  return (
    <table className="table table-sm border-collapse">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Date</th>
          <th>Starts At</th>
          <th>Ends At</th>
          <th>Member?</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.map(
          ({ is_member, starts_at, ends_at, date, title, description, id }) => (
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
                {new Date(date!).toDateString()}
              </td>
              <td className="max-w-[160px] truncate text-ellipsis overflow-hidden">
                <time dateTime={parseTime(starts_at!)}>
                  {parseTime(starts_at!)}
                </time>
              </td>
              <td className="max-w-[160px] truncate text-ellipsis overflow-hidden">
                {parseTime(ends_at!)}
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
          )
        )}
      </tbody>
    </table>
  );
};

export default ListEvents;
