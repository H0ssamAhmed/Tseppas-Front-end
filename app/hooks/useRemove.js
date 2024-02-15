import React from 'react'

const useRemove = () => {
    const test = (testId) => {
        console.log("this is from useRemove", testId);

    }
    return (
        { test }
    )
}

export default useRemove