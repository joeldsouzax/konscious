import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types";
import { NextPage } from "next";
import { Collapsible, CreateUser, ListUser, Messages } from "@/components";
import { getUserRole } from "../action";

const User: NextPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const role = await getUserRole(supabase);
  return (
    <section className="container px-2 mt-10 max-w-6xl">
      <div className="flex flex-col gap-4 mx-auto">
        {role === "ADMIN" && (
          <>
            <Collapsible
              label="Create User"
              isOpen={true}
            >
              <CreateUser />
            </Collapsible>
            <Messages />
            <div className="divider"></div>
          </>
        )}
        {["ADMIN", "MANAGER"].includes(role) && (
          <>
            {/* <ListEvents events={events} />
            {events.length > 0 && <div className="divider"></div>} */}
          </>
        )}
      </div>
    </section>
  );
};

export default User;
