import type { Metadata } from 'next'
import Home from '../components/home/home'

export const metadata: Metadata = {
    title: "Ashim Thapa Magar | Ashim Magar — Full-Stack Web Developer Portfolio",
    description:
        "Portfolio of Ashim Thapa Magar (Ashim Magar / Ashim Thapa) — a full-stack MERN web developer from Nepal skilled in React, Next.js, Node.js, MongoDB & TypeScript. View projects and contact Ashim Magar.",
    alternates: {
        canonical: "https://www.ashimmagar.com.np",
    },
    keywords: [
        "Ashim Thapa Magar",
        "Ashim Magar",
        "Ashim Thapa",
        "ashim magar portfolio",
        "ashim thapa magar portfolio",
    ],
}

export default function Page() {
    return <Home />
}