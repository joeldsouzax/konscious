import { Tables } from "@/types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import * as React from "react";

interface CategoryFormProps {
  categories: Array<Tables<"category">>;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ categories }) => {
  return (
    <form
      className="flex flex-col max-w-sm mx-auto gap-4 justify-center"
      action="/api/category"
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
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Member Only?</span>
          <input
            name="is_member"
            type="checkbox"
            className="toggle"
          />
        </label>
      </div>
      <select
        disabled={!(categories.length > 0)}
        className="select select-primary w-full"
        name="parent_id"
        defaultValue={0}
      >
        <option value={0}>Root Level</option>
        {categories.map(({ title, id }) => (
          <option value={id}>{title}</option>
        ))}
      </select>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default CategoryForm;
