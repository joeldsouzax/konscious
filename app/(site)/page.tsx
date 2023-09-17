import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types";
import { NextPage } from "next";
import {
  Alert,
  Card,
  CardList,
  Collapsible,
  CreateEvent,
  ListEvents,
  Messages,
} from "@/components";
import { getEvents, getRootCategories, getUserRole } from "./action";
import { AdminTypes, adminUsers, crudUsers, normalUsers } from "@/util";

const Events: NextPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const role = await getUserRole(supabase);

  if (normalUsers.includes(role)) {
    const categories = await getRootCategories(supabase);
    return (
      <section className="container px-2 mt-10 max-w-6xl">
        <CardList
          data={categories}
          errorMessage="No Categories Found!"
        >
          {({ id, is_member, title, description }) => (
            <Card
              key={id}
              url={"/category/" + id}
              title={title!}
              description={description!}
              isMember={is_member!}
            />
          )}
        </CardList>
      </section>
    );
  }

  const events = await getEvents(supabase);

  return (
    <section className="container px-2 mt-10 max-w-6xl">
      <div className="flex flex-col gap-4 mx-auto">
        {crudUsers.includes(role) && (
          <>
            <Collapsible
              label="Create Event"
              isOpen={!(events.length > 0)}
            >
              <CreateEvent categories={[]} />
            </Collapsible>
            <Messages />
            <div className="divider"></div>
          </>
        )}
        {adminUsers.includes(role) && (
          <>
            <ListEvents
              events={events}
              role={role}
            />
            {events.length > 0 && <div className="divider"></div>}
          </>
        )}
      </div>
    </section>
  );
};

export default Events;
