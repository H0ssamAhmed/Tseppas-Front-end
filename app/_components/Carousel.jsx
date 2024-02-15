import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import ProductCard from "./ProductCard";

const CarouselItems = ({ categorisedPeoducts }) => {
  return (
    <Carousel className="max-w-full">
      <CarouselContent className="justify-center mx-auto">
        {categorisedPeoducts?.map((product) => {
          return (
            <>
              <CarouselItem className="basis-full transition-all md:basis-1/2 lg:basis-1/4 2xl:basis-1/5 border-[#06b6d436] border rounded-sm bg-[#eee] dark:bg-[#3D3B40] m-2 p-0">
                <ProductCard data={product} />
              </CarouselItem>
            </>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
};

export default CarouselItems;
