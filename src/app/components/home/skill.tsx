import React from 'react'
import Title from '../layout/title'
import SkillsCard from '../cards/skillCard'
import { backendSkills, FrontSkills } from '@/app/api/skill'

function Skill() {
    return (
        <main className="font-sans flex flex-col items-center h-auto gap-6 mb-16">
            <Title title="Skills" subtitle="Junior/mid level" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 justify-center max-w-5xl w-full">
                <SkillsCard title="Frontend " skills={FrontSkills} />
                <SkillsCard title="Backend " skills={backendSkills} />
            </div>
        </main>

    )
}

export default Skill
