import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types";
import { NextPage } from "next";
import { getCategory, getCategoryEvents } from "./action";
import { redirect } from "next/navigation";
import { getEventIdsAndTitle, getEvents, getUserRole } from "../../action";
import { AddEvent } from "@/components";

interface EventPageProps {
  params: { id: string };
}

const EventPage: NextPage<EventPageProps> = async ({ params }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const role = await getUserRole(supabase);
  const data = await getCategory(supabase, params.id);
  const events = await getEventIdsAndTitle(supabase);
  // return to home page when that event does not exist
  if (!data) redirect("/category");

  return (
    <section className="flex flex-col gap-1 px-4 lg:px-0">
      <article className="prose">
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </article>
      <div className="divider" />
      {role === "ADMIN" && (
        <>
          <h1>Events</h1>
          <div className="flex flex-row">
            {events.map((event) => (
              <AddEvent
                isChecked={event.events_categories
                  .map((category) => category.category_id)
                  .includes(Number(params.id))}
                title={event.title!}
                id={Number(params.id)}
                eventId={event.id}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default EventPage;
