import ProductCard from "../../_components/ProductCard"
import React from "react";

const Filtering = ({ category, type }) => {
  return (
    <>
      <div className=" flex flex-wrap justify-center items-center gap-4 mt-4">
        {category
          .filter((tortes) => {
            return tortes?.attributes?.category == type;
          })
          .map((product) => {
            return (
              <div
                key={product.id}
                className="w-[260px] rounded-md h-[400px] bg-[#eee] dark:bg-[#3D3B40] "
              >
                <ProductCard data={product} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Filtering;
