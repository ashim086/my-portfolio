import Link from 'next/link';
import React from 'react';

function Navbar() {
    const navbarItems = [
        { label: 'Home', route: '#home' },
        { label: 'About', route: '#about' },
        { label: 'Skills', route: '#skills' },
        { label: 'Qualification', route: '#qualification' },
        { label: 'Projects', route: '#projects' },
        { label: 'Contact', route: '#contact' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white font-sans px-4 md:px-8 py-4 rounded-4xl">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-lg pt-3">Portfolio</h1>

                <div className="hidden md:flex space-x-6">
                    {navbarItems.map((item, index) => (
                        <Link
                            href={item.route}
                            key={index}
                            scroll={true}
                            className="text-gray-700 hover:text-black transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
