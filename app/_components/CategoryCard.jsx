import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryCard = ({ url, categoryName }) => {
  return (
    <div className=" group first:md:row-span-2 first:md:col-span-2 w-full h-full last:md:col-span-1 last:md:row-span-1 last:col-span-2 last:row-span-1">
      <div className=" relative">
        <Link href="/category">
          <Image
            className="w-full object-cover"
            width={4000}
            height={4000}
            alt={categoryName}
            src={url}
          />
          <span className="absolute bottom-0 w-full m-auto text-center transition bg-gray-800 py-4 opacity-0 group-hover:opacity-100">
            {categoryName}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
