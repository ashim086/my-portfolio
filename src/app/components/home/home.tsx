'use client'

import React, { useEffect, useRef } from 'react'
import HeroSection from './herosection'
import AboutMe from './aboutme'
import Skill from './skill'
import Qualification from './qualitfication'
import Project from './projects'
import Contact from './contact'
import toast from 'react-hot-toast'

function Home() {

    useEffect(() => {
        toast.dismiss('dev-mode-toast');
        toast('Portfolio is still in development. Please switch to Desktop Mode.', {
            id: 'dev-mode-toast',
            icon: '⚠️',
            position: 'bottom-center',
            style: {
                background: 'white',
                color: '#000',
                fontFamily: 'sans-serif',
            },
        });
    }, []);

    return (

        <main>
            <section id="home" className="scroll-mt-24"><HeroSection /></section>
            <section id="about" className="scroll-mt-24"><AboutMe /></section>
            <section id="skills"><Skill /></section>
            <section id="qualification" className="scroll-mt-24"><Qualification /></section>
            <section id="projects" className="scroll-mt-24"><Project /></section>
            <section id="contact" className="scroll-mt-24"><Contact /></section>
        </main>
    );
}

export default Home 