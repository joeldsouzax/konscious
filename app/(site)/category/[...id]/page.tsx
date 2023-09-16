import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database, Tables } from "@/types";
import { NextPage } from "next";
import {
  getCategory,
  getCategoryEvents,
  getChildCategories,
  getEventByCategory,
} from "./action";
import { redirect } from "next/navigation";
import { getEventIdsAndTitle, getEvents, getUserRole } from "../../action";
import { AddEvent, Card, CardList, EventList } from "@/components";
import { crudUsers, normalUsers } from "@/util";

interface EventPageProps {
  params: { id: Array<string> };
}

const EventPage: NextPage<EventPageProps> = async ({ params }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const currentCategory = params.id[params.id.length - 1];
  const categoryPath = params.id.join("/");
  const role = await getUserRole(supabase);
  const data = await getCategory(supabase, currentCategory);
  const events = await getEventIdsAndTitle(supabase);
  // return to home page when that event does not exist

  if (!data) redirect("/category");

  const childCategories = await getChildCategories(supabase, currentCategory);
  const categoryEvents = (await getEventByCategory(supabase, currentCategory))
    .filter((r) => r.event !== null)
    .map((r) => r.event);

  return (
    <section className="container max-w-6xl mt-10 flex flex-col gap-1 px-4 lg:px-0">
      <article className="prose">
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </article>
      <div className="divider" />
      {crudUsers.includes(role) && (
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

      {normalUsers.includes(role) && (
        <CardList
          data={childCategories ?? []}
          errorMessage="No Child Categories Found!"
        >
          {({ id, is_member, title, description }) => (
            <Card
              key={id}
              url={"/category/" + categoryPath + "/" + id}
              title={title!}
              description={description!}
              isMember={is_member!}
            />
          )}
        </CardList>
      )}

      <div className="divider" />
      <article className="prose mb-4">
        <h1>Events</h1>
      </article>
      <EventList events={categoryEvents as Array<Tables<"event">>} />
    </section>
  );
};

export default EventPage;
