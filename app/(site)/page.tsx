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
          <div className="divider"></div>
        </>
      )}
    </div>
  );
};

export default Events;
