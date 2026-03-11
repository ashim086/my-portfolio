import type { Metadata } from 'next'
import Home from '../components/home/home'

export const metadata: Metadata = {
    title: "Ashim Magar — Full-Stack Web Developer Portfolio",
    description:
        "Ashim Thapa Magar (Ashim Magar) — full-stack MERN developer from Nepal. React, Next.js, Node.js & MongoDB. View projects and get in touch.",
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