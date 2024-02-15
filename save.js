import LoadingAnimation from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import SimilarProducts from "./SimilarProducts";
import SectionHeader from "@/app/_components/SectionHeader";
import Breadcrumb from "@/app/category/_components/Breadcrumb";
import { useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ProductApi from "@/app/_utils/ProductApi";
import cartApi from "@/app/_utils/cartApi";
import { Check, ShoppingCart } from "lucide-react";
import { CartContext } from "@/app/_context/CartContext";

const ProductDetails = (details) => {
    const [quantity, setQuantity] = useState(1);
    const ImgaUrl = details.details?.attributes?.banner?.data?.attributes?.url;
    const title = details.details?.attributes?.title;
    const ingredients =
        details.details?.attributes?.ingredients[0]?.children[0]?.text;
    const price = details.details?.attributes?.price;
    const category = details.details?.attributes?.category;
    const router = useRouter()
    const params = useParams();
    const user = useUser();
    const [needLogin, setNeedLogin] = useState(true);
    const [cartData, setCartData] = useState([])
    const [DisableBtn, setDisableBtn] = useState(false)
    const { cart, setCart } = useContext(CartContext)
    const userEmail = user?.user?.primaryEmailAddress?.emailAddress

    // .attributes?.productDetails[0].productId == details?.details?.id
    useEffect(() => {
        getCart_()
        // console.log(userEmail);
    }, [user.user])

    useEffect(() => {
        // console.log(cartData);
        checkIsAdded(cartData, params.productId)
    }, [])

    const getCart_ = () => {
        // ProductApi.getCart().then((res) => {
        cartApi.getUserCartItems(userEmail).then((res) => {
            setCartData(res.data.data)
            // console.log(res.data.data)
            // checkIsAdded(res.data.data, params.productId)
        })
    }


    const checkIsAdded = (data, currentId) => {
        // console.log(data[0]?.attributes.Email);
        return data.map((item) => {
            console.log(item?.attributes?.Email);
            console.log(userEmail);
            item?.attributes?.productDetails.map((ele) => {
                // console.log(ele.productId, " ", Number(currentId), " ", ele.quantity)
                // console.log(currentId)
                // console.log(ele.quantity)
                if (ele.productId == currentId && item.Email === userEmail) {
                    console.log('dsds')
                    setDisableBtn(true)
                    // console.log(DisableBtn)
                } else console.log(false);
            })
        })
    }

    const addItems = () => {
        if (cartData.length == 0) {
            const data = {
                data: {
                    // id: details?.details?.id,
                    username: user?.user?.fullName,
                    Email: userEmail,
                    products: details?.details?.id,
                    productDetails: [
                        {
                            productId: details?.details?.id,
                            quantity: quantity
                        }
                    ]
                },
            }
            cartApi.addTocart(data)
                .then((res) => {
            /*window.alert("done added");*/ console.log(res?.data);
                    setCart(old => [...old, res?.data?.data])
                })
                .catch((err) => console.log(err))
            setDisableBtn(true)
            console.log("added");
        }
    }
    const isUserSignedIn = () => {
        if (user.isSignedIn) {
            cartData.map((item) => {
                // if (item?.attributes?.Email !== userEmail) {

                //   addItems()
                //   // console.log("NOTequal", userEmail);

                // } else {
                //   console.log("equal", userEmail);
                //   setDisableBtn(false)
                // }
            })
        } else {
            setNeedLogin(false);
            setTimeout(() => {

                setNeedLogin(true);
            }, 6000)
        }
    };


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
                            <div className="my-4 flex justify-start  items-center gap-4">
                                <button
                                    disabled={quantity == 1}
                                    className={cn(
                                        "cursor-pointer text-[24px] border rounded-md transition border-gray-400 w-16 h-8 flex items-center justify-center",
                                        quantity == 1 && "cursor-not-allowed opacity-50"
                                    )}
                                    onClick={() => setQuantity(quantity - 1)}
                                >
                                    -
                                </button>
                                <span className="bg-primary text-white text-[24px] border rounded-md border-gray-400 w-16 h-8 flex items-center justify-center">
                                    {quantity}
                                </span>
                                <button
                                    className="cursor-pointer text-[24px] border rounded-md border-gray-400 w-16 h-8 flex items-center justify-center"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
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
