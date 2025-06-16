import Link from 'next/link'
import React from 'react'

function Navbar() {

    const navbaritems = [
        {
            label: 'Home',
            route: "/",
        },
        {
            label: 'About',
            route: "/about",
        },
        {
            label: 'Skills',
            route: "/skills",
        },
        {
            label: 'Services',
            route: "/services",
        },
        {
            label: 'Projects',
            route: "/projects",
        },
        {
            label: 'Contact',
            route: "/contact",
        },
    ]
    return (
        <main className='flex justify-between  mt-6 font-sans sticky'>

            <h1 className='font-medium'>Portfolio</h1>
            <div>
                {


                    navbaritems.map((item, index) => (
                        <Link href={item.route} key={index} className='  px-4'>
                            {item.label}
                        </Link>
                    ))
                }
            </div>



        </main>
    )
}

export default Navbar