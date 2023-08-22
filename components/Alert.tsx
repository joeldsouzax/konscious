/** @format */

import * as React from "react";

interface AlertProps {
  title?: string;
  message?: string;
}

const Alert: React.FC<AlertProps> = ({
  message,
  title = "Something went wrong",
}) => {
  return (
    <div
      role="alert"
      className="rounded border-s-4 border-red-500 bg-red-50 p-4"
    >
      <strong className="block font-medium text-red-800"> {title} </strong>

      <p className="mt-2 text-sm text-red-700">{message}</p>
    </div>
  );
};

export default Alert;
