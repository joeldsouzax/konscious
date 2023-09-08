import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types";
import { NextPage } from "next";
import { getUser } from "./action";
import { redirect } from "next/navigation";
import { getEventIdsAndTitle, getEvents, getUserRole } from "../../action";
import { AddEvent } from "@/components";
import { DateTime } from "luxon";

interface EventPageProps {
  params: { id: string };
}

// TODO: show user info
// TODO: show user qr code
// TODO: make qr code downloadable
const EventPage: NextPage<EventPageProps> = async ({ params }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const role = await getUserRole(supabase);
  const data = await getUser(supabase, params.id);

  if (!data) redirect("/user");

  return (
    <section className="container px-6 mt-10 max-w-6xl flex flex-col mx-auto items-center justify-center content-center text-center lg:px-2">
      <article className="prose flex flex-row flex-wrap md:gap-10 gap-4 w-full animate-pulse ease-in-out">
        <h1>
          {data.first_name} {data.last_name}
        </h1>
        <h1>
          {DateTime.fromISO(data.birth_date!)
            .setLocale("tr")
            .toLocaleString(DateTime.DATE_FULL)}
        </h1>
      </article>
      
    </section>
  );
};

export default EventPage;
