import { cn } from "../../../lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Breadcrumb = ({ category, title }) => {
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isCategoryeEmpty, setIsCategoryeEmpty] = useState(false);
  useEffect(() => {
    if (title == undefined) {
      setIsTitleEmpty(true);
    }
    if (category == undefined) {
      setIsCategoryeEmpty(true);
    }
  }, []);
  return (
    <nav aria-label="Breadcrumb" className="flex">
      <ol className="flex overflow-hidden rounded-lg border border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-200">
        <li className="flex items-center">
          <span className="flex h-10 items-center gap-1.5 bg-gray-100 px-4 transition hover:text-gray-900 dark:bg-gray-800 dark:hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <Link href="/">
              <span className="text-xs font-medium"> Home </span>
            </Link>
          </span>
        </li>

        <li
          className={cn(
            "relative flex items-center",
            isCategoryeEmpty && "hidden"
          )}
        >
          <span className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180 dark:bg-gray-800"></span>

          <Link
            className="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium transition hover:text-gray-900 dark:bg-gray-900 dark:hover:text-white"
            href={`/category/${category}`}
          >
            {category}
          </Link>
        </li>

        <li
          className={cn(
            "flex relative h-10 items-center gap-1.5 bg-gray-100 px-6 transition hover:text-gray-900 dark:bg-gray-800 dark:hover:text-white",
            isTitleEmpty && "hidden"
          )}
        >
          <span className="absolute inset-y-0 -start-px h-10 w-4 bg-white [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180 dark:bg-gray-900"></span>

          <span className="text-xs font-medium"> {title} </span>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
