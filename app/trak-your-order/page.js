"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import orderApi from '../_utils/orderApi'
import SectionHeader from '../_components/SectionHeader'
import Image from 'next/image'
import Link from 'next/link'

const TrakYourOrder = () => {
    const [order, setOrder] = useState([])
    const { user } = useUser()
    const [price, setPrice] = useState(0)
    const [pieces, setPieces] = useState(0)


    const handleUserOrder_ = async () => {
        await orderApi.getUserOrder(user?.primaryEmailAddress?.emailAddress).then((res) => {
            setPieces(res?.data?.data[0]?.attributes?.pieces);
            console.log(res.data.data)
            setPrice(res?.data?.data[0]?.attributes?.price);
            setOrder(res?.data?.data[0]?.attributes?.products.data);
        })
    }
    useEffect(() => {
        handleUserOrder_()
    }, [user])
    return (
        <div className="w-[95vw] md:w-[80vw] max-w-screen-xl m-auto pt-6">
            {order == [] ? <p>loading....</p>
                :
                <>
                    <SectionHeader text={`${user?.firstName}'s Order`} />
                    <div className='ml-4 pt-2'>

                        <h1>Items ( {pieces} )</h1>
                        <h1>Total price: {price} EGP</h1>
                        <h1 className='py-4'>Order details:</h1>
                    </div>
                    <div className=' flex items-center justify-center w-full h-full bg-gray-50 dark:bg-[#111827]'>

                        {order?.map((item, index) => {

                            return <div key={index} className='bg-[#eee] dark:bg-gray-800 rounded-md m-4 overflow-hidden'>
                                <div className='flex flex-col items-center gap-2'>
                                    <Link href={`/category/${item.attributes?.category}/${item?.id}`}>
                                        <Image src={item.attributes?.banner.data.attributes.url} alt={item.attributes.title} width={200} height={200} />
                                    </Link>
                                    <p>
                                        {item.attributes.title}
                                    </p>
                                    <hr className='w-full h-[2px]' />
                                    <p className='p-2'>Price: {item.attributes.price} EGP</p>
                                </div>
                            </div>
                        })}


                    </div>
                </>
            }
        </div>
    )
}

export default TrakYourOrder
{/* <table className='text-center w-full'>
<thead>
    <tr>
        <th className='p-2 border-gray-400 border'>Num</th>
        <th className='p-2 border-gray-400 border'>Product</th>
        <th className='p-2 border-gray-400 border'>Price</th>
    </tr>
</thead>
<tbody>
    {order?.map((item, index) => {

        return <tr key={index}>
            <td className='p-2 border-gray-400 border'>{index + 1}</td>
            <td className='p-2 border-gray-400 border'>
                <div className='flex flex-col items-center'>

                    <Link href={`/category/${item.attributes?.category}/${item?.id}`}>
                        <Image src={item.attributes?.banner.data.attributes.url} alt={item.attributes.title} width={100} height={100} />
                    </Link>
                    <p>
                        {item.attributes.title}
                    </p>
                </div>
            </td>
            <td className='p-2 border-gray-400 border'>{item.attributes.price}</td>
        </tr>
    })}
</tbody>
</table> */}
