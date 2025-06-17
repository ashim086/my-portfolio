import React from 'react'
import HeroSection from './herosection'
import AboutMe from './aboutme'
import Skill from './skill'
import Qualification from './qualitfication'
import Project from './projects'
import Contact from './contact'

function Home() {


    return (

        <main >
            <section id="home" className="scroll-mt-24  "><HeroSection /></section>
            <section id="about" className="scroll-mt-24"><AboutMe /></section>
            <section id="skills"><Skill /></section>
            <section id="qualification" className="scroll-mt-24"><Qualification /></section>
            <section id="projects" className="scroll-mt-24"><Project /></section>
            <section id="contact" className="scroll-mt-24"><Contact /></section>
        </main>
    );
}

export default Home 