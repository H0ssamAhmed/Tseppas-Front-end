import React, { useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";
import ProductApi from "../_utils/ProductApi";
import CategoryCard from "./CategoryCard";
import LoadingAnimation from "../../components/Loading";

const ShopByCategory = () => {
  const [allCategories, setAllCategories] = useState([]);

  const getCategories_ = () => {
    ProductApi.getCategories()
      .then((res) => {
        setAllCategories(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getCategories_();
  }, []);
  // const removeRepeatedCategories = (arr) => {
  //   arr.map((category) => {
  //     console.log(category?.attributes?.title);
  //   });
  // };
  // const filteredCategories = removeRepeatedCategories(allCategories);
  // console.log(filteredCategories);
  // const ImgaUrl = allCategories?.attributes?.banner?.data?.attributes?.url;
  // const title = allCategories?.attributes?.title;
  // const ingredients = allCategories?.attributes?.ingredients[0]?.children[0]?.text;
  // const price = allCategories?.attributes?.price;
  // const category = allCategories?.attributes?.category;
  // const isAddedToCart = allCategories?.attributes?.isAddedToCart;

  return (
    <div className="w-screen md:w-[80vw] m-auto max-w-full" id="By-Category">
      <div className="w-full md:w-9/12 pt-16">
        <SectionHeader text="Shop By Category" />
        <p className="text-gray-600 mb-4 leading-4">
          Find a source of happiness in every piece you eat, <br />
          so what are you waiting for, check our category now
        </p>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-2 items-center gap-4">
        {allCategories.length == 0 ? (
          <LoadingAnimation className="text-primary grid-cols-1 col-span-12" />
        ) : (
          allCategories.map((category) => {
            return (
              <CategoryCard
                key={category.id}
                url={category?.attributes?.banner?.data[0]?.attributes?.url}
                categoryName={category?.attributes.Category}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default ShopByCategory;
