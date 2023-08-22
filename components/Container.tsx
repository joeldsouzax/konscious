/** @format */

import * as React from "react";
import { twMerge } from "tailwind-merge";

interface ContainerProps extends React.PropsWithChildren {
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={twMerge("mx-auto px-4 max-w-screen-xl", className)}>
      {children}
    </div>
  );
};

export default Container;
