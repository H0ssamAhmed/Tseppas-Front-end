"use client"

import Hero from './_components/Hero'
import ProductsSection from './_components/ProductsSection'
import ShopByCategory from './_components/ShopByCategory'

export default function Home() {
  return (
    <div className='w-[95vw] md:w-[80vw] max-w-screen-xl m-auto min-h-screen'>

      <Hero />
      <ProductsSection />
      <ShopByCategory />
    </div>
  )
}
