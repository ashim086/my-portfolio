import Link from 'next/link'
import React from 'react'

function Navbar() {

    const navbaritems = [
        {
            label: 'Home',
            route: "#home",
        },
        {
            label: 'About',
            route: "#about",
        },
        {
            label: 'Skills',
            route: "#skills",
        },
        {
            label: 'Qualification',
            route: "#qualification",
        },
        {
            label: 'Projects',
            route: "#projects",
        },
        {
            label: 'Contact',
            route: "#contact",
        },
    ]
    return (
        <main className="sticky top-0 z-50 bg-white flex justify-between mt-6 font-sans py-4">

            <h1 className="font-medium">Portfolio</h1>
            <div>
                {navbaritems.map((item, index) => (
                    <Link href={item.route} key={index} scroll={true} className="px-4">
                        {item.label}
                    </Link>
                ))}
            </div>
        </main>
    
    )
}

export default Navbar