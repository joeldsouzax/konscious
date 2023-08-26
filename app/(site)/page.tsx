/** @format */

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextPage } from "next";
import { Database } from "@/types";
import { getCategories, getUserRole } from "./action";
import {
  CreateCategory,
  ListCategories,
  Messages,
  Collapsible,
} from "@/components";

const Index: NextPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  // get categories based on which user is logged in
  const categories = await getCategories(supabase);

  // get role of the user
  const role = await getUserRole(supabase);

  return (
    <div className="flex flex-col gap-4 mx-auto">
      {role === "ADMIN" && (
        <>
          <Collapsible
            label="Create Category"
            isOpen={!(categories.length > 0)}
          >
            <CreateCategory categories={categories} />
          </Collapsible>
          <div className="divider"></div>
        </>
      )}
      <Messages />
      {["ADMIN", "MANAGER"].includes(role) && (
        <>
          <ListCategories categories={categories} />
          <div className="divider"></div>
        </>
      )}
      {role === "MEMBER" && (
        <div className="flex flex-row justify-center items-center flex-wrap gap-6 lg:gap-4">
          {categories.map(({ id, title, description }) => (
            <div
              key={id}
              className="card lg:w-96 w-full bg-secondary text-primary-content"
            >
              <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                  <button className="btn">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
