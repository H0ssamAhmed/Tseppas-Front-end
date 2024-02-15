"use client"
import React, { useContext, useEffect } from 'react'
import { CartContext } from '../_context/CartContext'
import { Trash } from 'lucide-react'
import Image from 'next/image'

import Increamentbtn from '../category/_components/Increamentbtn'
import { Button } from '../../components/ui/button'
import cartApi from '../_utils/cartApi'
import { useRouter } from 'next/navigation'
import SectionHeader from '../_components/SectionHeader'
import { cn } from '../../lib/utils'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'


const Cart = () => {
    const { cart, setCart } = useContext(CartContext)
    const router = useRouter()
    const { user } = useUser()
    const handelRmoeveItem = (id) => {
        setCart(cart.filter((item) => item.id !== id))
        cartApi.deletItem(id)
    }

    const value = cart.reduce((accumulator, currentItem) => {
        return (accumulator + (currentItem?.attributes?.productDetails.quantity * currentItem?.attributes?.products?.data[0]?.attributes.price));
    }, 0)

    const handleQuantity = (id, operationType) => {
        const newCart = cart.map((item) => {
            return item.id == id ? {
                ...item,
                attributes: {
                    ...item.attributes,
                    productDetails: {
                        ...item.attributes.productDetails,
                        quantity: operationType == "minus" ? item.attributes.productDetails.quantity - 1 : item.attributes.productDetails.quantity + 1 // Decrease quantity by 1
                    }
                }
            } : item
        });

        newCart.filter((item) => {
            if (item.id == id) {
                const dataTest = {
                    data: {
                        productDetails: {
                            productId: item.attributes.productDetails.productId,
                            quantity: item.attributes.productDetails.quantity
                        }
                    },
                }
                cartApi.updateItem(id, dataTest).catch((erro) => console.log(erro))
            }
        })
        setCart(newCart)
    }
    return (
        <div className='w-[95vw] md:w-[80vw] max-w-screen-xl m-auto'>
            <SectionHeader text='Shopping Cart' />
            <p className='ml-4'>Items ({cart.length})</p>
            <div>
                {cart.length == 0 ?
                    <>
                        <Image
                            src='https://res.cloudinary.com/dc5eb9lmi/image/upload/v1706769805/shopping%20cart/emptyCard_qdv4al.gif'
                            width={500}
                            height={500}
                            alt='empty cart'
                            className="object-contain mx-auto rounded-sm"
                        />
                        <p
                            onClick={() => router.push("/")}
                            className="text-black/50 hover:text-black py-5 text-[40px] dark:text-white/50 dark:hover:text-white transition cursor-pointer underline mx-auto w-fit"
                        > Home</p>
                    </>
                    :
                    <>
                        {cart?.map((items => {
                            return <div key={items.id} className=' grid grid-cols-12 items-center justify-between my-4'>
                                <div className='flex items-center justify-start gap-4 col-span-11'>
                                    <div>
                                        <Link href={`/category/${items?.attributes?.products?.data[0]?.attributes.category}/${items?.attributes?.productDetails.productId}`}>
                                            <Image src={items?.attributes?.products?.data[0]?.attributes.banner?.data?.attributes?.url} width={200} height={200} alt='product' />
                                        </Link>
                                    </div>
                                    <div>
                                        <h1 className=' text-[18px]'>{items?.attributes?.products?.data[0]?.attributes?.title}</h1>
                                        <p className=' text-[14px] text-gray-500'> Piece price: {items?.attributes?.products?.data[0]?.attributes.price} EGP</p>
                                        <p className=' text-[14px] text-gray-500'> Total price: {items?.attributes?.productDetails.quantity * items?.attributes?.products?.data[0]?.attributes.price}</p>
                                        <p className='text-[14px] text-gray-500'> Number of Pieces: {items?.attributes?.productDetails.quantity}</p>
                                        <div className="my-4 flex justify-start  items-center gap-4">
                                            <button
                                                disabled={items?.attributes?.productDetails.quantity == 1}
                                                className={cn(
                                                    "cursor-pointer text-[24px] border rounded-md transition border-gray-400 w-16 h-8 flex items-center justify-center",
                                                    items?.attributes?.productDetails.quantity == 1 && "cursor-not-allowed opacity-50"
                                                )}
                                                onClick={() => handleQuantity(items.id, "minus")}
                                            >
                                                -
                                            </button>
                                            <span className="bg-primary text-white text-[24px] border rounded-md border-gray-400 w-16 h-8 flex items-center justify-center">
                                                {items?.attributes?.productDetails.quantity}
                                            </span>
                                            <button
                                                className="cursor-pointer text-[24px] border rounded-md border-gray-400 w-16 h-8 flex items-center justify-center"
                                                onClick={() => handleQuantity(items.id, "plus")}
                                            >
                                                +
                                            </button>
                                        </div>                                    </div>
                                </div>
                                <div className='flex justify-center items-center hover:text-red-600 transition w-fit cursor-pointer' onClick={() => handelRmoeveItem(items.id)}><Trash className='w-6 h-6' /></div>
                            </div>
                        }))}
                        <div className='mt-8 flex justify-between items-start'>
                            <h1>Total</h1>
                            <div className=' flex flex-col items-center gap-4'>
                                <h1>{value} EGP</h1>
                                <Button onClick={() => router.push(`/checkout?amount=${Number.parseFloat(value)}`)}>Checkout</Button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Cart