"use client";

import React, { ReactNode, useEffect, useState } from 'react'
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

    return (
        <>
            {/* Loading overlay — covers content visually but content stays in DOM for SEO crawlers */}
            {showLoading && (
                <div className="fixed inset-0 z-[9999]">
                    <Loading />
                </div>
            )}
            <main className='min-h-screen' style={showLoading ? { overflow: 'hidden', height: '100vh' } : undefined}>
                <div className='lg:mx-44 h-full'>
                    <Navbar />
                    {children}
                </div>
            </main>
        </>
    )
}

export default Layout