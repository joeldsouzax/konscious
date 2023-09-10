import { Tables } from "@/types";
import Link from "next/link";
import * as React from "react";
import CardList from "./CardList";

interface EventListProps {
  events: Array<Tables<"event">>;
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <CardList
      data={events}
      errorMessage="No Events Found"
    >
      {({ id, image, is_member, description, title }) => (
        <Link
          href={"/" + id}
          className="card w-96 h-96 bg-primary shadow-xl"
        >
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
        </Link>
      )}
    </CardList>
  );
};

export default EventList;
