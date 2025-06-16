import React from 'react'
import HeroSection from './herosection'
import AboutMe from './aboutme'
import Skill from './skill'
import Qualification from './qualitfication'
import Project from './projects'
import Contact from './contact'

function Home() {
    return (

        <main className=''>

            <HeroSection />
            <AboutMe />
            <Skill />

            <Qualification />

            <Project />
            <Contact />
        </main>
    )
}

export default Home 