import Link from "next/link";
import * as React from "react";
import { twMerge } from "tailwind-merge";

interface CardProps {
  url: string;
  isMember?: boolean | null;
  title: string | null;
  description: string | null;
}

const Card: React.FC<CardProps> = ({
  url,
  title,
  description,
  isMember = false,
}) => {
  return (
    <Link
      href={url}
      className={twMerge(
        "card w-full lg:w-96 hover:shadow-2xl cursor-pointer",
        isMember ? "bg-primary" : "bg-secondary"
      )}
    >
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default Card;
