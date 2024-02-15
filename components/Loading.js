import { cn } from '../lib/utils'
import React from 'react'

const LoadingAnimation = ({ className }) => {
    return (

        <section className={cn("triple-circle text-[40px] text-center", className)}>
            <span></span>

        </section>
    )
}

export default LoadingAnimation