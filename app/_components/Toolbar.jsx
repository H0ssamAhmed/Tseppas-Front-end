import { cn } from "../../lib/utils";
import React, { useEffect, useState } from "react";

const Toolbar = ({ uniquCategory, AllstoredCategories, setCategory }) => {
  const toolbarCategrizer = (e) => setCategory(e.target.innerHTML);

  return (
    <ul className="toolbar flex cursor-pointer select-none my-4 flex-wrap w-full mx-auto items-center justify-center">
      {AllstoredCategories.length != 1 &&
        uniquCategory?.map((type) => {
          return (
            <li
              className={cn(
                "m-2 py-1 px-2 rounded-md hover:bg-primary hover:text-white transition"
              )}
              onClick={toolbarCategrizer}
              key={type.id}
            >
              {type}
            </li>
          );
        })}
    </ul>
  );
};

export default Toolbar;
