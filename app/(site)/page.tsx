/** @format */

import Container from "@/components/Container";
import HeroBanner from "@/components/HeroBanner";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextPage } from "next";
import { Database } from "@/types";
import Alert from "@/components/Alert";
import Category from "@/components/Category";

const Index: NextPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  // show all categories if the user is admin / manager
  // show the root categort for every user
  const { data, error } = await supabase.from("category").select();

  return (
    <>
      <HeroBanner
        title="HyperUI"
        subtitle="Free Open Source Tailwind CSS Components"
      >
        HyperUI is a collection of free Tailwind CSS components that can be used
        in your next project. With a range of components, you can build your
        next marketing website, admin dashboard, eCommerce store and much more.
      </HeroBanner>

      <Container className="pb-8 lg:pb-12">
        {data ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
            {data.map((category) => {
              return (
                <Category
                  key={category.id}
                  {...category}
                />
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
            <div></div>
            <div className="lg:col-span-2">
              <Alert
                title="No Categories"
                message="Sorry we could not find any categories for this festival"
              />
            </div>
            <div></div>
          </div>
        )}
      </Container>
    </>
  );
};

export default Index;
