import React from 'react'
import Home from '../components/home/home'

async function Page() {
    // Loading delay for initial page visit - keeps loading.webm visible
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    return (

        <Home />

    )
}

export default Page