import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import LoadingAnimation from "../../components/Loading";
import ProductCard from "./ProductCard";
import Toolbar from "./Toolbar";
import SectionHeader from "./SectionHeader";
import CarouselItems from "./Carousel";

const ProductList = ({ storedProducts }) => {
  const [category, setCategory] = useState("All");
  let AllstoredCategories = ["All"];

  storedProducts.forEach((item) => {
    AllstoredCategories.push(item.attributes.category);
  });

  const removeRepeatedCategories = (arr) => {
    return arr.filter((value, index) => arr.indexOf(value) === index);
  };

  const uniquCategory = removeRepeatedCategories(AllstoredCategories);

  const categorisedPeoducts = storedProducts?.filter((items) => {
    if (category == "All") {
      return items;
    } else return items.attributes.category == category;
  });

  return (
    <div id="best" >
      <SectionHeader text="Best Seller" />
      <Toolbar
        uniquCategory={uniquCategory}
        AllstoredCategories={AllstoredCategories}
        setCategory={setCategory}
      />
      <div className="container flex items-center justify-center m-auto  min-h-[250px] ">
        {storedProducts.length == 0 ? (
          <LoadingAnimation className="text-primary " />
        ) : (
          storedProducts != undefined && (
            <>
              <CarouselItems categorisedPeoducts={categorisedPeoducts} />
            </>
          )
        )}
      </div>
    </div>
  );
};

export default ProductList;
