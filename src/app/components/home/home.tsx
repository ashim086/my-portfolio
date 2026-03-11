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
        </div>
    );
}

export default Home