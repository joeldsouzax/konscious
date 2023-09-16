"use client";
import { deleteUser } from "@/app/(site)/user/action";
import { useTransition } from "react";
import * as React from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdAutoDelete } from "react-icons/md";

interface DeleteUserProps {
  id: string;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ id }) => {
  let [isPending, startTransition] = useTransition();

  return (
    <button onClick={() => startTransition(() => deleteUser(id))}>
      {isPending ? <MdAutoDelete /> : <AiFillDelete />}
    </button>
  );
};

export default DeleteUser;
