"use client";
import { deleteCategory } from "@/app/(site)/action";
import { useTransition } from "react";
import * as React from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdAutoDelete } from "react-icons/md";

interface DeleteCategoryProps {
  id: number;
}

const DeleteCategory: React.FC<DeleteCategoryProps> = ({ id }) => {
  let [isPending, startTransition] = useTransition();

  return (
    <button onClick={() => startTransition(() => deleteCategory(id))}>
      {isPending ? <MdAutoDelete /> : <AiFillDelete />}
    </button>
  );
};

export default DeleteCategory;
