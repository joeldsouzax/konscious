/** @format */

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextPage } from "next";
import { Database } from "@/types";

const Index: NextPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  // show all categories if the user is admin / manager

  // get the root categories only
  const { data, error } = await supabase
    .from("category")
    .select()
    .is("parent_id", null)
    .order("created_at", { ascending: true });

  // TODO: role = admin and managers gets all categories in a tabular format
  // TODO: no role auth users get root categories

  return (
    <div className="overflow-x-auto mx-auto max-w-2xl">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((category) => (
            <tr key={category.id}>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="font-bold">{category.title}</div>
                </div>
              </td>
              <td>{category.description}</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
