"use client";
import React, { useEffect, useState } from "react";
import ProductApi from "../_utils/ProductApi";
import ProductList from "./ProductList";
import LineAnimation from "../../components/lineAnimation";
import LoadingAnimation from "../../components/Loading";
import SectionHeader from "./SectionHeader";

const ProductsSection = () => {
  const [storedProducts, setStoredProducts] = useState([]);

  const getProducts_ = () => {
    ProductApi.getProducts().then((res) => {
      console.log(window.location.origin);
      console.log(res.config.baseURL);
      setStoredProducts(res?.data.data)
    });
  };

  useEffect(() => {
    getProducts_();
    // getSingleProduct_(id);
  }, []);

  return (
    <div className="w-[95vw] md:w-[80vw] max-w-screen-xl m-auto">
      <ProductList storedProducts={storedProducts} />
    </div>
  );
};

export default ProductsSection;
