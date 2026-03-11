import React from 'react'
import HeroSection from './herosection'
import AboutMe from './aboutme'
import Skill from './skill'
import Qualification from './qualitfication'
import Project from './projects'
import Contact from './contact'

function Home() {
    return (
        <div>
            <section id="home" className="scroll-mt-24" aria-label="Introduction"><HeroSection /></section>
            <section id="about" className="scroll-mt-24" aria-label="About Ashim Thapa Magar"><AboutMe /></section>
            <section id="skills" className="scroll-mt-24" aria-label="Technical skills"><Skill /></section>
            <section id="qualification" className="scroll-mt-24" aria-label="Education and experience"><Qualification /></section>
            <section id="projects" className="scroll-mt-24" aria-label="Portfolio projects"><Project /></section>
            <section id="contact" className="scroll-mt-24" aria-label="Contact information"><Contact /></section>

            <footer className='text-center py-8 text-sm text-gray-400 border-t border-gray-100 mt-16 font-sans'>
                <p>&copy; {new Date().getFullYear()} <strong className='text-gray-600'>Ashim Thapa Magar</strong> (Ashim Magar). All rights reserved.</p>
                <p className='mt-1'>Full-Stack Web Developer &middot; Nepal &middot; <a href='https://www.ashimmagar.com.np' className='underline hover:text-gray-600'>ashimmagar.com.np</a></p>
            </footer>
        </div>
    );
}

export default Home