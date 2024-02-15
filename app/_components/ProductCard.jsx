import { Button } from "../../components/ui/button";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const ProductCard = (data) => {
  const productId = data?.data.id;
  const ImgaUrl = data?.data.attributes?.banner?.data?.attributes?.url;
  const category = data?.data.attributes?.category;
  const title = data?.data.attributes?.title;
  const ingredients = data?.data.attributes?.ingredients[0]?.children[0]?.text;
  const price = data?.data.attributes?.price;
  const router = useRouter();

  const showDetails = (id) => {
    router.push(`/category/${category}/${id}`);
  };

  return (
    <div
      className="h-full pb-2 group hover:border-primary cursor-pointer  transition-all "
      onClick={() => showDetails(productId)}
    >
      <Image
        className="block h-1/2 rounded-tl-sm rounded-tr-sm w-full"
        src={ImgaUrl}
        height={300}
        width={300}
        alt={title + " imag"}
      />
      <div className="h-1/2 flex flex-col justify-between">
        <div className=" ml-4">
          <h1 className="text-sm my-4 font-semibold">{title}</h1>
          <h4>{category}</h4>
          <p className="text-sm text-[#808080] ">{ingredients}</p>
        </div>
        <div className="flex flex-col ">
          <span className="ml-4 h-6 font-semibold text-lg text-primary group-hover:hidden">
            {price} EGP
          </span>
          <Button
            className="h-6 group-hover:opacity-100 opacity-0 transition-all px-8 py-1 mx-auto text-white bg-primary/80 hover:bg-primary"
            size="md"
            variant="default"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
