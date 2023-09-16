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
import { adminUsers, crudUsers, normalUsers } from "@/util";
import { redirect } from "next/navigation";

const Index: NextPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  // get categories based on which user is logged in
  const categories = await getCategories(supabase);

  // get role of the user
  const role = await getUserRole(supabase);

  if (!crudUsers.includes(role)) redirect("/");

  return (
    <div className="container max-w-6xl mt-10 flex flex-col gap-4 mx-auto">
      {crudUsers.includes(role) && (
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
      {adminUsers.includes(role) && (
        <>
          <ListCategories
            categories={categories}
            role={role}
          />
          <div className="divider"></div>
        </>
      )}
    </div>
  );
};

export default Index;
