import React, { ReactNode } from 'react'
import Navbar from '../components/layout/navbar'

function Layout({ children }: { children: ReactNode }) {
    return (

        <main className='  h-screen'>

            <div className='  flex  mx-44 flex-col h-full'>

                <Navbar />
                {children}
            </div>
        </main>
    )
}

export default Layout