import React from 'react'
import { IProject } from '../home/projects'
import Link from 'next/link'
import Image from 'next/image'

interface IProps {
    project: IProject
}

const ProjectCard: React.FC<IProps> = ({ project }) => {
    return (
        <article className="border border-white shadow-lg shadow-gray-300 rounded-lg transition hover:scale-105 hover:shadow-xl duration-300 pb-4
        mr-6
        items-center text-center font-sans">
            <Link href={project.link} target='_blank' rel='noopener noreferrer' aria-label={`View ${project.name} project`}>
                <div className="cursor-pointer space-y-3">
                    <div className="relative w-full h-[360px]">
                        <Image
                            src={project.photo || ''}
                            alt={`${project.name} - ${project.description}`}
                            fill
                            className="object-contain rounded"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                            loading='lazy'
                        />
                    </div>
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.description}</p>
                </div>
            </Link>
        </article>
    )
}

export default ProjectCard
