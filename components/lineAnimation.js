import React from 'react'

const LineAnimation = () => {
    return (
        <div class="wrapper">
            <div class="loader-outer">
                <div class="loader-inner">
                    <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                </div>
            </div>
            <h1 className='animationH1'><span>LOADING</span></h1>
        </div>
    )
}

export default LineAnimation