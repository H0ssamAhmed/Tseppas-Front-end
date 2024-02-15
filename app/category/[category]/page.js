"use client"
import ProductCard from "../../_components/ProductCard"//'@/app/_components/ProductCard'
import ProductApi from "../../_utils/ProductApi"//'@/app/_utils/ProductApi'
import Breadcrumb from '../_components/Breadcrumb'
import LoadingAnimation from "../../../components/Loading"//'@/components/Loading'
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Category = () => {
    const [categorised, setCategorised] = useState([])
    const params = useParams()


    const getByCategory_ = (category) => {
        ProductApi.getByCategory(category).then((res) => setCategorised(res.data.data))
    }
    useEffect(() => {
        getByCategory_(params.category)
    }, [])
    document.title = `Tseppas | ${params.category}`


    return (
        <div className="w-[95vw] md:w-[80vw] max-w-screen-xl m-auto pt-6">
            <Breadcrumb category={params?.category} />
            <div>

                {categorised.length == 0 ? (
                    <LoadingAnimation className="text-primary " />
                ) : (
                    categorised != undefined && (
                        <div className=' flex flex-wrap justify-around items-center gap-y-4 mt-4'>
                            {categorised.map((product) => {

                                return <div key={product.id}
                                    className='w-[240px] rounded-md h-[400px] bg-[#eee] dark:bg-[#3D3B40] '>
                                    <ProductCard data={product} />
                                </div>
                            })}
                        </div>
                    )
                )}
            </div>

        </div>
    )
}

export default Category