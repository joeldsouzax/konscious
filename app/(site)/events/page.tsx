import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types";
import { NextPage } from "next";
import { getUserRole } from "../action";
import { Collapsible, CreateEvent } from "@/components";
import { getEvents } from "./action";

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
          <div className="divider"></div>
        </>
      )}
    </div>
  );
};

export default Events;
