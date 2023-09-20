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
import Image from "next/image";

const Events: NextPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const role = await getUserRole(supabase);

  if (normalUsers.includes(role)) {
    const categories = await getRootCategories(supabase);
    return (
      <section className="container md:mt-10 max-w-6xl flex flex-col gap-6 items-center">
        <div className="carousel w-full md:w-96 transition-all ease-linear duration-150">
          <div
            id="slide1"
            className="carousel-item relative w-full"
          >
            <img
              src="/carousel_1.jpeg"
              className="w-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href="#slide4"
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href="#slide2"
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
          <div
            id="slide2"
            className="carousel-item relative w-full"
          >
            <img
              src="/carousel_2.jpeg"
              className="w-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href="#slide1"
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href="#slide3"
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
          <div
            id="slide3"
            className="carousel-item relative w-full"
          >
            <img
              src="/carousel_3.jpeg"
              className="w-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href="#slide2"
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href="#slide4"
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
          <div
            id="slide4"
            className="carousel-item relative w-full"
          >
            <img
              src="/carousel_4.jpeg"
              className="w-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href="#slide3"
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href="#slide1"
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>

          <div
            id="slide5"
            className="carousel-item relative w-full"
          >
            <img
              src="/carousel_5.jpeg"
              className="w-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href="#slide4"
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href="#slide6"
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>

          <div
            id="slide6"
            className="carousel-item relative w-full"
          >
            <img
              src="/carousel_6.jpeg"
              className="w-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href="#slide5"
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href="#slide7"
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>

          <div
            id="slide7"
            className="carousel-item relative w-full"
          >
            <img
              src="/carousel_7.jpeg"
              className="w-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href="#slide6"
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href="#slide1"
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
        </div>

        <section className="px-2">
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
