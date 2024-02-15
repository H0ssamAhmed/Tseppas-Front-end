"use client"
import { CartContext } from "../../_context/CartContext"
import cartApi from "../../_utils/cartApi";
import { Button } from "../../../components/ui/button"
import { cn } from "../../../lib/utils";
import { ShoppingCart, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { use, useContext, useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import orderApi from "../../_utils/orderApi";
const PopupCart = ({ showCart, setShowCart }) => {
    const { cart, setCart } = useContext(CartContext)
    // const [isHasOrder, setIsHaseOeder] = useState(false)
    const router = useRouter()
    const { user } = useUser()
    const handleRouter = () => {
        setShowCart(false)
        router.push("/cart")
    }
    const handelRmoeveItem = (id) => {
        setCart(cart.filter((item) => item.id !== id))
        cartApi.deletItem(id)
    }
    const handleGoItemPage = (category, id) => {
        router.push(`/category/${category}/${id}`)
        setShowCart(false)
    }
    // useEffect(() => {
    //     orderApi.getUserOrder(user.primaryEmailAddress.emailAddress).then((res) => {
    //         if (res.data.data[0]?.attributes.email) {
    //             setIsHaseOeder(true)
    //         } else setIsHaseOeder(false)
    //     })
    // }, [showCart])
    return (
        <div className={cn('bg-white dark:bg-gray-800 h-0 overflow-hidden shadow-md top-[64px] right-0 rounded-md p-1 opacity-0 transition absolute z-10 min-w-80 max-w-96',
            showCart && "opacity-100 h-fit")}>
            <div className="w-full py-2 max-h-[500px] overflow-y-scroll overflow-x-hidden">
                {cart?.map((item) => {

                    return <div key={item.id} className="bg-[#eee] dark:bg-gray-900 p-1 rounded-sm m-1 grid grid-cols-12 gap-4 relative">
                        <div className="grid grid-cols-10 items-center col-span-11 cursor-pointer"
                            onClick={() => handleGoItemPage(item?.attributes?.products?.data[0]?.attributes?.category, item.attributes?.productDetails?.productId)}>
                            <div className="w-full col-span-4">
                                <Image
                                    src={item?.attributes?.products?.data[0]?.attributes?.banner?.data?.attributes?.url}
                                    width={40000000}
                                    height={40000000}
                                    alt={item.name}
                                    className="object-contain w-full rounded-sm"
                                />
                            </div>
                            <div className="col-span-5 self-center ml-3">
                                <p className="text-[14px] m-2  line-clamp-1">{item?.attributes?.products?.data[0]?.attributes?.title}</p>
                                <div className=" flex justify-between flex-col m-2 items-start gap-2">
                                    <p className="text-[12px] text-gray-500">Category: {item?.attributes?.products?.data[0]?.attributes?.category}</p>
                                    <p className="text-[12px] text-gray-500">Price: {item?.attributes?.products?.data[0]?.attributes?.price} EGP</p>
                                    <p className="text-[12px] text-gray-500">Quantity: {item.attributes?.productDetails?.quantity}</p>
                                    <p className="text-[12px] text-gray-500">Total: {item.attributes?.productDetails?.quantity * item?.attributes?.products?.data[0]?.attributes?.price}</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-span-2 group  w-fit h-4 cursor-pointer self-center justify-self-center flex items-center justify-center absolute top-4 right-2"
                            onClick={() => handelRmoeveItem(item.id)}
                        >
                            <span className="text-[14px] rounded-sm bg-teal-400 translate-x-8 p-1 group-hover:opacity-100 group-hover:translate-x-0 opacity-0 transition-all">Remove</span>
                            <XCircle className="w-6 h-6 dark:text-white/70 text-black/60 transition-all group-hover:text-red-500 dark:hover:text-red-500" />
                        </div>
                    </div>
                })}
                {cart.length != 0
                    ?
                    <Button
                        className={cn("transition-all justify-center items-center flex px-4 py-2 mx-auto my-4 text-white   bg-primary/80 hover:bg-primary",
                        )}
                        size="sm"

                        variant="default"
                        onClick={handleRouter}
                    >
                        <ShoppingCart className="h-4 " />
                        View my Cart ({cart.length})
                    </Button>
                    :
                    <Image
                        src='https://res.cloudinary.com/dc5eb9lmi/image/upload/v1706769805/shopping%20cart/emptyCard_qdv4al.gif'
                        width={400}
                        height={400}
                        alt='empty cart'
                        className="object-contain mx-auto rounded-sm"
                    />

                }

                <p
                    onClick={() => setShowCart(false)}
                    className="text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white transition cursor-pointer underline mx-auto w-fit"
                > Continue shopping</p>
                {/* 
                Comming Soon 
                {isHasOrder &&
                    <p
                        onClick={() => router.push("/trak-your-order")}
                        className="text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white transition cursor-pointer underline mx-auto w-fit"
                    >Trak Your Order</p>
                } 
                 */}
            </div>
        </div>
    )
}

export default PopupCart