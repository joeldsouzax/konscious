/** @format */

import Link from "next/link";
import * as React from "react";
import { twMerge } from "tailwind-merge";

interface BrandLogoProps {
  className: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ className = "text-sm" }) => {
  return (
    <Link href="/">
      <div className={twMerge(`inline-flex gap-1.5`, className)}>
        <span className="font-medium text-gray-900">Konscious.no</span>
        <span
          aria-hidden="true"
          role="img"
          className="text-3xl"
        >
          🚀
        </span>
      </div>
    </Link>
  );
};

export default BrandLogo;
