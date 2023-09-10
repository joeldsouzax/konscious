import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types";
import { NextPage } from "next";
import { Collapsible, CreateEvent, ListEvents, Messages } from "@/components";
import { getEvents, getRootCategories, getUserRole } from "./action";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

const Events: NextPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const role = await getUserRole(supabase);
  if (["MEMBER", "ANON"].includes(role)) {
    const categories = await getRootCategories(supabase);

    return (
      <section className="container px-2 mt-10 max-w-6xl">
        <div className="flex flex-row flex-wrap gap-6 lg:gap-4">
          {categories.length > 0 ? (
            categories.map(({ id, title, description, is_member }) => (
              <Link
                href={"/category/" + id}
                className={twMerge(
                  "card w-full lg:w-96 hover:shadow-2xl cursor-pointer",
                  is_member ? "bg-primary" : "bg-secondary"
                )}
              >
                <div className="card-body">
                  <h2 className="card-title">{title}</h2>
                  <p>{description}</p>
                  <div className="card-actions justify-end"></div>
                </div>
              </Link>
            ))
          ) : (
            <div className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Error! No Events around!</span>
            </div>
          )}
        </div>
      </section>
    );
  }

  const events = await getEvents(supabase);

  return (
    <section className="container px-2 mt-10 max-w-6xl">
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
        {/* {["MEMBER", "ANON"].includes(role) && (
          <div className="flex flex-row justify-center items-center flex-wrap gap-6 lg:gap-4">
            {events.map(({ id, title, description, image }) => (
              <div className="card w-96 h-96 bg-primary shadow-xl">
                <figure>
                  <img
                    src={image!}
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{title}</h2>
                  <p>{description}</p>
                  <div className="card-actions justify-end"></div>
                </div>
              </div>
            ))}
          </div>
        )} */}
      </div>
    </section>
  );
};

export default Events;
