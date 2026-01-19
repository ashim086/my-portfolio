"use client";

import React, { ReactNode, Suspense, useEffect, useState } from 'react'
import Navbar from '../components/layout/navbar'
import Loading from '../loading'

const DISPLAY_MS = 2000;

function Layout({ children }: { children: ReactNode }) {
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoading(false);
        }, DISPLAY_MS);

        return () => clearTimeout(timer);
    }, []);

    if (showLoading) {
        return <Loading />;
    }

    return (
        <Suspense fallback={<Loading />}>
            <main className='  min-h-screen'>
                <div className='lg:mx-44  h-full'>
                    <Navbar />
                    {children}
                </div>
            </main>
        </Suspense>
    )
}

export default Layout