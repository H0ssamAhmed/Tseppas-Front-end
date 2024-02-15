"use client"
import React, { useEffect, useState } from 'react'
import ProductApi from '../_utils/ProductApi'
import LoadingAnimation from "../../components/Loading"
import Breadcrumb from './_components/Breadcrumb'
import SectionHeader from '../_components/SectionHeader'
import Filtering from './_components/Filtering'
const CategoryPage = () => {
    const [data, setData] = useState([])
    const getByCategory_ = async () => {
        await ProductApi.getProducts().then((respnse) => setData(respnse?.data?.data))
    }

    useEffect(() => {
        getByCategory_()
    }, [])


    document.title = "Tseppas | Categories"

    return (
        <div className="w-[95vw] md:w-[80vw] max-w-screen-xl m-auto pt-6">
            <div className="container flex items-center justify-center m-auto min-h-[250px] ">
                {data.length == 0 ? (
                    <LoadingAnimation className="text-primary " />
                ) : (
                    data != undefined && (

                        <div className='flex flex-col gap-y-4'>
                            <Breadcrumb />
                            <SectionHeader text="Oriental" />
                            <Filtering category={data} type='Oriental' />

                            <SectionHeader text="Tortes" />
                            <Filtering category={data} type='Tortes' />

                            <SectionHeader text="Gateaux" />
                            <Filtering category={data} type='Gateaux' />

                        </div>
                    )
                )}
            </div>
        </div >
    )
}

export default CategoryPage