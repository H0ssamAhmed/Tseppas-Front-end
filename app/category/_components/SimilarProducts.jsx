
import CarouselItems from "../../_components/Carousel";
import ProductApi from "../../_utils/ProductApi";
import React, { useEffect, useState } from "react";

const SimilarProducts = ({ SimilarProductsCategory, ignoreId }) => {
  const [SimilarData, setSimilarData] = useState([]);

  const getFilterItems_ = async () => {
    await ProductApi.getFilterItems(SimilarProductsCategory, ignoreId).then(
      (res) => {
        setSimilarData(res.data.data);
      }
    );
  };

  useEffect(() => {
    getFilterItems_();
  }, []);

  return (
    <>
      <CarouselItems categorisedPeoducts={SimilarData} />
    </>
  );
};

export default SimilarProducts;
