"use client";
import { deleteEvent } from "@/app/(site)/action";
import { useTransition } from "react";
import * as React from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdAutoDelete } from "react-icons/md";

interface DeleteEventProps {
  id: number;
}

const DeleteEvent: React.FC<DeleteEventProps> = ({ id }) => {
  let [isPending, startTransition] = useTransition();

  return (
    <button onClick={() => startTransition(() => deleteEvent(id))}>
      {isPending ? <MdAutoDelete /> : <AiFillDelete />}
    </button>
  );
};

export default DeleteEvent;
