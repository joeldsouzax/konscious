"use client";
import { deleteEvent } from "@/app/(site)/action";
import { useTransition } from "react";
import * as React from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdAutoDelete } from "react-icons/md";

interface DeleteUserProps {
  id: number;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ id }) => {
  let [isPending, startTransition] = useTransition();

  return (
    <button onClick={() => startTransition(() => deleteEvent(id))}>
      {isPending ? <MdAutoDelete /> : <AiFillDelete />}
    </button>
  );
};

export default DeleteUser;
