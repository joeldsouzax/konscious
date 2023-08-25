/** @format */

import { Tables } from "@/types";
import Link from "next/link";
import * as React from "react";
import { MdOutlineLocalMovies } from "react-icons/md";

interface CategoryProps extends Tables<"category"> {
  url: string;
}

const Category: React.FC<CategoryProps> = ({ title, description, url }) => {
  return (
    <article className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6">
      <span className="inline-block rounded bg-blue-600 p-2 text-white">
        <MdOutlineLocalMovies size={46} />
      </span>

      <Link href={url}>
        <h3 className="mt-0.5 text-3xl font-medium text-gray-900">{title}</h3>
      </Link>

      <p className="mt-2 line-clamp-3 text-xl/relaxed text-gray-500">
        {description}
      </p>

      <Link
        href={url}
        className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
      >
        Find out more
        <span
          aria-hidden="true"
          className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
        >
          &rarr;
        </span>
      </Link>
    </article>
  );
};

export default Category;
