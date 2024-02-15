"use client"
import ProductApi from '../../../_utils/ProductApi'
import ProductDetails from "../../_components/ProductDetails.jsx"//'/app/category/_components/ProductDetails'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Details = () => {
    const [allDetails, setAllDetails] = useState([])
    const params = useParams()
    const getSingleProduct_ = async (id) => {
        await ProductApi.getSingleProduct(id).then((res) => { setAllDetails(res?.data?.data) })
    };

    useEffect(() => {
        getSingleProduct_(params.productId);
    }, [])

    return (
        <div className=''>

            <ProductDetails details={allDetails} />


        </div>
    )
}

export default Details