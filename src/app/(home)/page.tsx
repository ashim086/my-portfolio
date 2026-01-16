import { Suspense } from 'react'
import Home from '../components/home/home'

async function Page() {
    // Loading delay to make loading.webm visible
    await new Promise(resolve => setTimeout(resolve, 2000));

    return (
        <Suspense fallback={null}>
            <Home />
        </Suspense>
    )
}

export default Page