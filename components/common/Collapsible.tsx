"use client";

import * as React from "react";

interface AccordionProps extends React.PropsWithChildren {
  label: string;
  isOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  children,
  label,
  isOpen = false,
}) => {
  const [collapse, setCollapse] = React.useState(isOpen);
  return (
    <div className="collapse collapse-arrow  bg-base-200">
      <input
        type="checkbox"
        className="peer"
        checked={collapse}
        onChange={() => setCollapse((prev) => !prev)}
      />
      <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
        {label}
      </div>
      <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
        {children}
      </div>
    </div>
  );
};

export default Accordion;
