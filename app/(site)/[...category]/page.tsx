/** @format */

import { Database, DbResult } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextPage } from "next";
import * as React from "react";
import CategoryItem from "@/components/Category";

interface CategoryProps {
  params: { category: Array<string> };
  searchParams: {};
}

const Category: NextPage<CategoryProps> = async ({ params }) => {
  const [category, ...childCategory] = params.category;
  const supabase = createServerComponentClient<Database>({ cookies });
  const query = supabase
    .from(category as "category")
    .select()
    .eq("parent_id", childCategory[childCategory.length - 1]);

  const { data, error }: DbResult<typeof query> = await query;

  return (
    <>
      {data
        ? data.map((category) => (
            <CategoryItem
              key={category.id}
              {...category}
            />
          ))
        : null}
    </>
  );
};

export default Category;
