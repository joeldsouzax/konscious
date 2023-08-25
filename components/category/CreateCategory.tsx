import * as React from "react";

// TODO: add list of categories to add this as parent category
// TODO: add toggle to show only to members

const CategoryForm: React.FC = () => {
  return (
    <form className="flex flex-col max-w-sm mx-auto gap-4 justify-center">
      <input
        type="text"
        placeholder="Name"
        className="input input-bordered input-primary w-full"
      />
      <textarea
        className="textarea textarea-primary textarea-lg"
        placeholder="Description"
      ></textarea>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Member Only?</span>
          <input
            type="checkbox"
            className="toggle"
            checked
          />
        </label>
      </div>
      <select className="select select-primary w-full">
        <option
          disabled
          selected
        >
          Parent Category
        </option>
        <option>Game of Thrones</option>
        <option>Lost</option>
        <option>Breaking Bad</option>
        <option>Walking Dead</option>
      </select>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default CategoryForm;
