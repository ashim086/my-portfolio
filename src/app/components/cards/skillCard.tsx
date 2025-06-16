import React from 'react'
import { MdVerified } from 'react-icons/md'

interface ISkill {
    name: string
    level: string
}

interface IProps {
    title: string
    skills: ISkill[]
}

const SkillsCard: React.FC<IProps> = ({ skills, title }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md border max-w-md mx-auto">
            <h2 className="text-center text-xl font-semibold mb-6">{title}</h2>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {skills.map((skill) => (
                    <div key={skill.name} className="flex items-start space-x-2">
                        <MdVerified className="mt-1" />
                        <div>
                            <h3 className="font-semibold">{skill.name}</h3>
                            <p className="text-sm text-gray-500">{skill.level}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SkillsCard
