import { Suspense } from 'react'
import Home from '../components/home/home'
import Loading from '../loading';

async function Page() {
    // Loading delay to make loading.webm visible
    await new Promise(resolve => setTimeout(resolve, 2000));

    return (
        <Suspense fallback={<Loading />}>
            <Home />
        </Suspense>
    )
}

export default Page