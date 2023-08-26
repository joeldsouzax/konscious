import { Tables } from "@/types";
import * as React from "react";
import DeleteCategory from "./DeleteCategory";

interface ListCategoriesProps {
  categories: Array<Tables<"category">>;
}

const ListCategories: React.FC<ListCategoriesProps> = ({ categories }) => {
  if (categories.length === 0) return null;
  return (
    <table className="table table-sm border-collapse">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Member?</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id}>
            <td className="max-w-[160px] truncate text-ellipsis overflow-hidden">
              <div className="font-bold truncate text-ellipsis overflow-hidden">
                {category.title}
              </div>
            </td>
            <td className="max-w-[160px] truncate text-ellipsis overflow-hidden">
              {category.description}
            </td>
            <td className="max-w-[160px] truncate text-ellipsis overflow-hidden">
              <div className="badge badge-accent">
                {category.is_member ? "YES" : "NO"}
              </div>
            </td>
            <td>
              <ul className="menu menu-horizontal bg-base-200 rounded-box">
                <li>
                  <DeleteCategory id={category.id} />
                </li>
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListCategories;
