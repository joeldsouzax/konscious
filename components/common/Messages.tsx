/** @format */

"use client";

import { useSearchParams } from "next/navigation";
import { BiError, BiCheckCircle } from "react-icons/bi";

export default function Messages() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");
  return (
    <>
      {error && (
        <div className="alert alert-error">
          <BiError />
          <span>{error}</span>
        </div>
      )}
      {message && (
        <div className="alert alert-success">
          <BiCheckCircle />
          <span>{message}</span>
        </div>
      )}
    </>
  );
}
