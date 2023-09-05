/** @format */

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types";
import { NextPage } from "next";
import { getCategories } from "./action";
import {
  CreateCategory,
  ListCategories,
  Messages,
  Collapsible,
} from "@/components";
import { getUserRole } from "../action";

const Index: NextPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  // get categories based on which user is logged in
  const categories = await getCategories(supabase);

  // get role of the user
  const role = await getUserRole(supabase);

  return (
    <div className="container max-w-6xl mt-10 flex flex-col gap-4 mx-auto">
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
      {["MEMBER", "ANON"].includes(role) && (
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
