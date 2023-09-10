"use client";

import { addCategoryEvent } from "@/app/(site)/category/[...id]/action";
import { useTransition } from "react";
import * as React from "react";
import { AiOutlineLoading } from "react-icons/ai";

interface DeleteCategoryProps {
  id: number;
  eventId: number;
  title: string;
  isChecked?: boolean;
}

const DeleteCategory: React.FC<DeleteCategoryProps> = ({
  id,
  title,
  eventId,
  isChecked = false,
}) => {
  let [isPending, startTransition] = useTransition();

  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text pr-2">{title}</span>
        <input
          type="checkbox"
          value={id}
          name="event"
          id="event"
          defaultChecked={isChecked}
          onChange={(e) => startTransition(() => addCategoryEvent(id, eventId))}
          className="checkbox checkbox-primary"
        />
        {isPending && <AiOutlineLoading />}
      </label>
    </div>
  );
};

export default DeleteCategory;
