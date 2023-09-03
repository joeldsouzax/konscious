import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types";
import { NextPage } from "next";
import { getCategory } from "./action";
import { redirect } from "next/navigation";

interface EventPageProps {
  params: { id: string };
}

const EventPage: NextPage<EventPageProps> = async ({ params }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const data = await getCategory(supabase, params.id);

  // return to home page when that event does not exist
  if (!data) redirect("/category");

  return (
    <section className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 px-4 lg:px-0">
      <article className="prose">
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </article>
    </section>
  );
};

export default EventPage;
