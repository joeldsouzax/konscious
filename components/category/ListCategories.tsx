import { Tables } from "@/types";
import * as React from "react";
import DeleteCategory from "./DeleteCategory";

interface ListCategoriesProps {
  categories: Array<Tables<"category">>;
}

const ListCategories: React.FC<ListCategoriesProps> = ({ categories }) => {
  if (categories.length === 0) return null;
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category.id}>
            <td>
              <div className="flex items-center space-x-3">
                <div className="font-bold">{category.title}</div>
              </div>
            </td>
            <td>{category.description}</td>
            <th>
              <ul className="menu menu-horizontal bg-base-200 rounded-box mt-6">
                <li>
                  <DeleteCategory id={category.id} />
                </li>
              </ul>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListCategories;
