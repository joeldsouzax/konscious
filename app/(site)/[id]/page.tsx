import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types";
import { NextPage } from "next";
import { getEvent } from "./action";
import { redirect } from "next/navigation";
import Image from "next/image";
import { DateTime } from "luxon";
import { AddressMap, CheckInQrCode, Messages } from "@/components";
import { getUserRole } from "../action";

export const dynamic = "force-dynamic";
interface EventPageProps {
  params: { id: string };
}

const EventPage: NextPage<EventPageProps> = async ({ params }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const data = await getEvent(supabase, params.id);
  const role = await getUserRole(supabase);

  // return to home page when that event does not exist
  if (!data) redirect("/");

  return (
    <>
      <Messages />
      <AddressMap
        lat={data.lat!}
        long={data.long!}
      />
      <section className="container max-w-6xl mt-10 flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 px-6 lg:px-2">
        <article className="prose prose-slate prose-xs">
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <h3>
            {DateTime.fromISO(data.event_start!)
              .setLocale("tr")
              .toLocaleString(DateTime.DATETIME_FULL)}
          </h3>
          <h3>
            {DateTime.fromISO(data.event_end!)
              .setLocale("tr")
              .toLocaleString(DateTime.DATETIME_FULL)}
          </h3>
        </article>
        <div className="w-full flex flex-col items-center">
          <Image
            src={data.image!}
            alt="event-image"
            width={600}
            height={400}
          />
        </div>
      </section>
      <section className="container px-2 mt-10 max-w-6xl">
        {["admin", "manager", "controller"].includes(role) && (
          <CheckInQrCode id={data.id} />
        )}
      </section>
    </>
  );
};

export default EventPage;
