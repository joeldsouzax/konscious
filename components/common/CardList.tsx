import * as React from "react";
import Alert from "./Alert";

interface CardListProps<T extends object> {
  data: Array<T>;
  errorMessage: string;
  children: (item: T) => React.ReactNode;
}

const CardList = <T extends object>({
  children,
  data,
  errorMessage,
}: CardListProps<T>) => {
  if (!(data.length > 0)) return null;
  return (
    <div className="flex flex-row flex-wrap gap-6 lg:gap-4">
      {data.map((item) => children(item))}
    </div>
  );
};

export default CardList;
