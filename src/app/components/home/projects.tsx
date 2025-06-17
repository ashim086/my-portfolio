import React from 'react'
import ProjectCard from '../cards/project.card'
import Title from '../layout/title'
import { projectItems } from '@/app/api/projects'


export interface IProject {
    photo: string,
    name: string,
    description: string,
    link: string
}


function Project() {


    return (

        <main >

            <Title title='Projects' subtitle='Recent Projects' />
            <div className='grid md:grid-cols-1 lg:grid-cols-2 space-x-9 space-y-9 mx-3 w-full'>


                {
                    projectItems.map((item, index) => (
                        <ProjectCard project={item} key={index} />
                    ))
                }
            </div>

        </main>
    )
}

export default Project