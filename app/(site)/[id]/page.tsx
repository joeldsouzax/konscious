import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types";
import { NextPage } from "next";
import { getEvent } from "./action";
import { redirect } from "next/navigation";
import Image from "next/image";
import { DateTime } from "luxon";

interface EventPageProps {
  params: { id: string };
}

const EventPage: NextPage<EventPageProps> = async ({ params }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const data = await getEvent(supabase, params.id);

  // return to home page when that event does not exist
  if (!data) redirect("/");

  return (
    <section className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 px-4 lg:px-0">
      <article className="prose">
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
      <div className="relative aspect-video min-w-[400px]">
        <Image
          src={data.image!}
          alt="event-image"
          layout="fill"
        />
      </div>
    </section>
  );
};

export default EventPage;
