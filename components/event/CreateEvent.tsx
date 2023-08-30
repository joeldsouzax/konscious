import { Tables } from "@/types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import * as React from "react";

interface CategoryFormProps {
  categories: Array<Tables<"category">>;
}

// TODO: add event image updload
// TODO: add address capability
// TODO: add geolocatio capability
const CategoryForm: React.FC<CategoryFormProps> = ({ categories }) => {
  return (
    <form
      className="flex flex-col gap-4"
      action="/api/event"
      method="post"
    >
      <input
        type="text"
        placeholder="Title"
        name="title"
        required
        maxLength={160}
        className="input input-bordered input-primary w-full"
      />
      <textarea
        className="textarea textarea-primary textarea-lg"
        name="description"
        required
        placeholder="Description"
      ></textarea>
      <div className="flex flex-row gap-2 items-center">
        <div className="form-control w-full">
          <label className="label cursor-pointer">
            <span className="label-text">Member Only?</span>
            <input
              name="is_member"
              type="checkbox"
              className="toggle"
            />
          </label>
        </div>
        <div className="form-control w-full">
          <label
            htmlFor="date"
            className="label-text"
          >
            Event Date
          </label>
          <input
            required
            type="date"
            id="date"
            name="date"
            pattern="\d{4}-\d{2}-\d{2}"
            className="input input-bordered input-primary w-full"
          />
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <div className="form-control w-full">
          <label
            htmlFor="starts_at"
            className="label-text"
          >
            Event Start Time
          </label>
          <input
            type="time"
            id="starts_at"
            name="starts_at"
            className="input input-bordered input-primary w-full"
            required
          />
        </div>
        <div className="form-control w-full">
          <label
            htmlFor="ends_at"
            className="label-text"
          >
            Event End Time
          </label>
          <input
            type="time"
            id="ends_at"
            name="ends_at"
            className="input input-bordered input-primary w-full"
            required
          />
        </div>
      </div>
      <input
        type="file"
        required
        name="event_image"
        className="file-input file-input-bordered file-input-lg file-input-secondary w-full"
      />
      <div className="self-center max-w-md w-full">
        <button className="btn btn-primary w-full">Submit</button>
      </div>
    </form>
  );
};

export default CategoryForm;
