import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types";
import { NextPage } from "next";
import { getUser } from "./action";
import { redirect } from "next/navigation";
import { getEventIdsAndTitle, getEvents, getUserRole } from "../../action";
import { AddEvent, QrCode } from "@/components";
import { DateTime } from "luxon";

interface EventPageProps {
  params: { id: string };
}

// TODO: show user info
// TODO: show user qr code
// TODO: make qr code downloadable
export const dynamic = "force-dynamic";
const EventPage: NextPage<EventPageProps> = async ({ params }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const role = await getUserRole(supabase);
  if (!["admin", "manager"].includes(role)) redirect("/");

  const user = await getUser(params.id);

  if (user === null) return redirect("/user");

  return (
    <section className="container px-6 mt-10 max-w-6xl flex flex-col mx-auto items-center justify-center content-center text-center lg:px-2 gap-1">
      <article className="prose w-full animate-pulse ease-in-out mb-0">
        <div className="flex items-center w-full flex-col">
          <h1 className="mb-0">
            {user.user_metadata.first_name} {user.user_metadata.last_name}
          </h1>
        </div>
      </article>
      <QrCode
        email={user.email!}
        id={user.id}
        hash={
          user.email?.includes("@inactivemachine.com")
            ? user.user_metadata.phone_number!
            : `${user.user_metadata.birth_date}`.replaceAll("-", "") +
              `${user.user_metadata.first_name}`.toLowerCase()
        }
      />
    </section>
  );
};

export default EventPage;
