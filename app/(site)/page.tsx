/** @format */

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextPage } from "next";
import { Database } from "@/types";
import { getCategories } from "./action";
import Collapsible from "@/components/common/Collapsible";
import { CreateCategory, ListCategories } from "@/components";

const Index: NextPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const categories = await getCategories(supabase);

  return (
    <div className="flex flex-col gap-4 mx-auto max-w-2xl">
      <Collapsible
        label="Create Category"
        isOpen={!(categories.length > 0)}
      >
        <CreateCategory />
      </Collapsible>
      <ListCategories categories={categories} />
    </div>
  );
};

export default Index;
