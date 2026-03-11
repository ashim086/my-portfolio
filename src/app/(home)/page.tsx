import type { Metadata } from 'next'
import Home from '../components/home/home'

export const metadata: Metadata = {
    title: "Ashim Thapa Magar — Full-Stack Web Developer Portfolio",
    description:
        "Explore the portfolio of Ashim Thapa Magar, a full-stack MERN developer from Nepal. View projects, skills in React, Next.js, Node.js, MongoDB, and get in touch.",
    alternates: {
        canonical: "https://www.ashimmagar.com.np",
    },
}

export default function Page() {
    return <Home />
}