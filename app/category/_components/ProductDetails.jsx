import LoadingAnimation from "../../../components/Loading";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import SimilarProducts from "./SimilarProducts";
import SectionHeader from "../../_components/SectionHeader"
import Breadcrumb from "../../category/_components/Breadcrumb"
import { useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import cartApi from "../../_utils/cartApi";
import { Check, ShoppingCart } from "lucide-react";
import { CartContext } from "../../_context/CartContext";
import Increamentbtn from "./Increamentbtn";
const ProductDetails = (details) => {
  const [quantity, setQuantity] = useState(1);
  const ImgaUrl = details.details?.attributes?.banner?.data?.attributes?.url;
  const title = details.details?.attributes?.title;
  const ingredients =
    details.details?.attributes?.ingredients[0]?.children[0]?.text;
  const price = details.details?.attributes?.price;
  const category = details.details?.attributes?.category;
  const params = useParams();
  const { user } = useUser();
  const [needLogin, setNeedLogin] = useState(true);
  const [DisableBtn, setDisableBtn] = useState(false)
  const { cart, setCart } = useContext(CartContext)
  const userEmail = user?.primaryEmailAddress?.emailAddress


  document.title = title
  useEffect(() => {
    getCart_()
  }, [user])


  const getCart_ = async () => {
    await cartApi.getUserCartItems(user?.primaryEmailAddress?.emailAddress).then((res) => {
      checkIsAdded(res.data.data, params.productId)
    }).catch((eror) => console.log(eror))
  }


  const checkIsAdded = (data, currentId) => {
    data.map((item) => {
      if (item?.attributes?.productDetails?.productId == currentId && item?.attributes?.email == userEmail) {
        setDisableBtn(true)
      }
    })
  }

  const addItems = () => {
    const data = {
      data: {
        username: user?.fullName,
        email: userEmail,
        products: [details?.details?.id],  // id beacuse it will be used to get banner item in cart 
        productDetails: {
          productId: details?.details?.id,
          quantity: quantity
        }

      },
    }


    cartApi.addTocart(data).catch((err) => console.log(err))
    cartApi.getUserCartItems(user.primaryEmailAddress.emailAddress).then((res) => setCart(res.data.data))
    setDisableBtn(true)
  }
  const isUserSignedIn = () => {
    if (user) {
      addItems()

    } else {
      setNeedLogin(false);
      setTimeout(() => {

        setNeedLogin(true);
      }, 6000)
    }
  };
  document.title = `Tseppas | ${details.details?.attributes?.title}`

  return (
    <>
      {details.details.length == 0 ? (
        <LoadingAnimation className="text-primary flex items-center justify-center w-full h-[50vh] " />
      ) : (
        <>
          <div className="w-[95vw] md:w-[80vw] max-w-screen-xl m-auto pt-6">
            <Breadcrumb category={category} title={title} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-8">
            <div className="mx-auto overflow-hidden ">
              <Image
                className="rounded-sm object-cover"
                src={ImgaUrl}
                height={400}
                width={400}
                alt={title + " image"}
              />
            </div>
            <div className="grid-cols-1">
              <h1 className="text-lg my-4 font-medium">{title}</h1>
              <p className="text-sm text-[#808080] my-4">{ingredients}</p>
              <h1>Quantity</h1>
              <Increamentbtn setQuantity={setQuantity} quantity={quantity} />
              <div className="flex flex-col my-4 ">
                <span className="my-4 font-semibold text-lg text-primary group-hover:hidden">
                  {price} EGP
                </span>
                <div className="flex justify-center flex-col items-center gap-2">
                  <Button
                    className={cn("transition-all px-8 py-3 mx-auto text-white   bg-primary/80 hover:bg-primary",
                    )}
                    size="md"
                    disabled={DisableBtn}
                    variant="default"
                    onClick={isUserSignedIn}
                  >
                    {DisableBtn ? <>
                      <Check className="w-6 mr-4 h-6" /> Added To Successefully
                    </> :
                      <>
                        <ShoppingCart className="w-6 mr-4 h-6" />Added to cart
                      </>
                    }
                  </Button>
                  <span className={cn("text-red-600", needLogin && "hidden")}>
                    You need to <Link className=" font-semibold underline" href="/sing-in">log in</Link> first
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[95vw] md:w-[80vw] max-w-screen-xl m-auto py-4">
            <SectionHeader text="You May Also Like" />
            <SimilarProducts
              SimilarProductsCategory={category}
              ignoreId={details.details?.id}
            />
          </div>
        </>
      )}
    </>
  );
};


export default ProductDetails;
