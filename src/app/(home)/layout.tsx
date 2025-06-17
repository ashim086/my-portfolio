import React, { ReactNode } from 'react'
import Navbar from '../components/layout/navbar'

function Layout({ children }: { children: ReactNode }) {
    return (

        <main className='  min-h-screen'>

            <div className='lg:mx-44  h-full'>

                <Navbar />
                {children}
            </div>
        </main>
    )
}

export default Layout