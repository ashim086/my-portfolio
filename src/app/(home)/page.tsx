import React from 'react'
import Home from '../components/home/home'

async function Page() {
    // Simulate loading delay - remove this in production
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return (

        <Home />

    )
}

export default Page