"use client"
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import { Button } from '../../components/ui/button'
import Link from 'next/link'
import { CartContext } from '../_context/CartContext'
import orderApi from '../_utils/orderApi'

const PaymentConfirmed = () => {


    return (
        <div className=' flex justify-center items-center flex-col py-6 w-full'>
            <div>
                <Image alt='payement-confirmed'
                    className='object-cover hidden dark:block'
                    width={250}
                    src="https://res.cloudinary.com/dc5eb9lmi/image/upload/v1707208743/shopping%20cart/verified-dark_cszqmg.png"
                    height={250} />
                <Image alt='payement-confirmed'
                    className='object-cover dark:hidden'
                    width={250}
                    src="https://res.cloudinary.com/dc5eb9lmi/image/upload/v1707208742/shopping%20cart/verified_atrvea.png"

                    height={250} />
            </div>
            <p className='text-center my-4'>Your order has been confirmed</p>
            <Link href='/'>
                <Button> Go to home</Button>
            </Link>

        </div>
    )
}

export default PaymentConfirmed