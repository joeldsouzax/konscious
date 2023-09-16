import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types";
import { NextPage } from "next";
import { Collapsible, CreateUser, ListUser, Messages } from "@/components";
import { getUserRole } from "../action";
import { getUserProfiles } from "./action";
import { crudUsers } from "@/util";

const User: NextPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const users = await getUserProfiles(supabase);

  const role = await getUserRole(supabase);
  return (
    <section className="container px-2 mt-10 max-w-6xl">
      <div className="flex flex-col gap-4 mx-auto">
        {crudUsers.includes(role) && (
          <>
            <Collapsible
              label="Create User"
              isOpen={!(users.length > 0)}
            >
              <CreateUser />
            </Collapsible>
            <Messages />
            <div className="divider"></div>
          </>
        )}
        {crudUsers.includes(role) && (
          <>
            <ListUser
              users={users}
              role={role}
            />
            {users.length > 0 && <div className="divider"></div>}
          </>
        )}
      </div>
    </section>
  );
};

export default User;
