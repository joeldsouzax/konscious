import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types";
import { NextPage } from "next";
import { Collapsible, CreateEvent, ListEvents, Messages } from "@/components";
import { getEvents, getUserRole } from "./action";

const Events: NextPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const role = await getUserRole(supabase);
  const events = await getEvents(supabase);

  return (
    <div className="flex flex-col gap-4 mx-auto">
      {role === "ADMIN" && (
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
      {["ADMIN", "MANAGER"].includes(role) && (
        <>
          <ListEvents events={events} />
          {events.length > 0 && <div className="divider"></div>}
        </>
      )}
      {["MEMBER", "ANON"].includes(role) && (
        <div className="flex flex-row justify-center items-center flex-wrap gap-6 lg:gap-4">
          {events.map(({ id, title, description }) => (
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

export default Events;
