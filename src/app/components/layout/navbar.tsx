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
        <nav className="sticky top-0 z-50 bg-white font-sans px-4 py-4 rounded-4xl" aria-label="Main navigation">
            <div className="flex justify-between items-center">
                <Link href="/" className="font-bold text-lg pt-3" aria-label="Ashim Thapa Magar - Home">
                    Ashim Magar
                </Link>

                <div className="hidden md:flex space-x-6" role="menubar">
                    {navbarItems.map((item, index) => (
                        <Link
                            href={item.route}
                            key={index}
                            scroll={true}
                            role="menuitem"
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
