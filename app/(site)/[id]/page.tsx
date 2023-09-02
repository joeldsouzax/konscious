import { AddressMap } from "@/components";
import { NextPage } from "next";

interface EventPageProps {
  params: { id: string };
}

const EventPage: NextPage<EventPageProps> = async ({ params }) => {
  console.log(params);
  return (
    <AddressMap
      lat={0}
      long={0}
    />
  );
};

export default EventPage;
