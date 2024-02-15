import React from 'react'
import { cn } from '../../../lib/utils';

const Increamentbtn = ({ setQuantity, quantity }) => {
    return (
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
                onClick={() => { setQuantity(quantity + 1);/* setDisableBtn(false) use to remove and re add if quantity changed*/ }}
            >
                +
            </button>
        </div>
    )
}

export default Increamentbtn