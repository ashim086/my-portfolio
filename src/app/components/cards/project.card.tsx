import React from 'react'
import { IProject } from '../home/projects'
import Link from 'next/link'
import Image from 'next/image'

interface IProps {
    project: IProject
}

const ProjectCard: React.FC<IProps> = ({ project }) => {
    return (
        <main className="border border-white shadow-lg shadow-gray-300 rounded-lg transition hover:scale-105 hover:shadow-xl duration-300 pb-4
        items-center text-center font-sans">
            <Link href={project.link}>
                <div className="cursor-pointer space-y-3">
                    <div className="relative w-full h-[360px] ">
                        <Image
                            src={project.photo || ''}
                            alt={project.name || ''}
                            fill
                            className="object-contain rounded "
                        />
                    </div>
                    <h1 className="text-lg font-semibold">{project.name}</h1>
                    <p className="text-sm text-gray-600">{project.description}</p>
                </div>
            </Link>
        </main>
    )
}

export default ProjectCard
