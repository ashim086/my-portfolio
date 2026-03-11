import React from 'react'
import { BiCalendar } from 'react-icons/bi'
import { BsSuitcaseLg } from 'react-icons/bs'
import { GiGraduateCap } from 'react-icons/gi'
import { MdModelTraining } from 'react-icons/md'

function Qualification() {
    return (
        <article className='mt-26 font-sans flex flex-col items-center' aria-labelledby='qualification-heading'>

            <div className='flex flex-col justify-center items-center-safe space-y-2'>
                <h2 id='qualification-heading' className='line-clamp-1 font-semibold text-3xl'>Qualification</h2>
                <p className='text-gray-400'>Education, experience, and training journey</p>
            </div>

            <div className='mt-16 flex space-x-6'>
                <div className='flex space-x-2'>
                    <GiGraduateCap size={26} aria-hidden='true' />
                    <p className='font-semibold'>Education</p>
                </div>

                <div className='flex space-x-2'>
                    <BsSuitcaseLg size={26} aria-hidden='true' />
                    <p className='font-semibold'>Experience</p>
                </div>

                <div className='flex space-x-2'>
                    <MdModelTraining size={26} aria-hidden='true' />
                    <p className='font-semibold'>Training</p>
                </div>
            </div>

            <ol className="relative border-l-2 border-gray-300 ml-6 mt-6 list-none">
                <li className="mb-10 ml-6">
                    <div className="absolute -left-2.5 w-4 h-4 bg-gray-500 rounded-full border-2 border-white" />
                    <h3 className="text-lg font-semibold">School</h3>
                    <p className="text-gray-500">Sainik Awasiya Mahavidyalaya <br />Teghari, Kailali</p>
                    <time className="flex items-center text-sm text-gray-400 mt-1" dateTime="2018">
                        <BiCalendar className="w-4 h-4 mr-1" aria-hidden='true' />
                        2018
                    </time>
                </li>

                <li className="mb-10 ml-6">
                    <div className="absolute -left-2.5 top-[9.5rem] w-4 h-4 bg-gray-500 rounded-full border-2 border-white" />
                    <h3 className="text-lg font-semibold">+2 Science</h3>
                    <p className="text-gray-500">Sainik Awasiya Mahavidyalaya <br />Chainpur, Chitwan</p>
                    <time className="flex items-center text-sm text-gray-400 mt-1" dateTime="2019/2021">
                        <BiCalendar className="w-4 h-4 mr-1" aria-hidden='true' />
                        2019–2021
                    </time>
                </li>

                <li className="mb-10 ml-6">
                    <div className="absolute -left-2.5 top-[18.3rem] w-4 h-4 bg-gray-500 rounded-full border-2 border-white" />
                    <h3 className="text-lg font-semibold">BCA (Bachelor of Computer Application)</h3>
                    <p className="text-gray-500">Patan Multiple College<br />Patan, Lalitpur</p>
                    <time className="flex items-center text-sm text-gray-400 mt-1" dateTime="2021">
                        <BiCalendar className="w-4 h-4 mr-1" aria-hidden='true' />
                        2021–Pursuing
                    </time>
                </li>

                <li className="mb-10 ml-6">
                    <div className="absolute -left-2.5 top-[28rem] w-4 h-4 bg-gray-500 rounded-full border-2 border-white" />
                    <h3 className="text-lg font-semibold">MERN Stack Web Development Training</h3>
                    <p className="text-gray-500">Broadway Infosys Private Limited<br />Shri Ganesh Marg, Kathmandu</p>
                    <time className="flex items-center text-sm text-gray-400 mt-1" dateTime="2021-04/2025-06">
                        <BiCalendar className="w-4 h-4 mr-1" aria-hidden='true' />
                        April 2021 – June 2025
                    </time>
                </li>

                <li className="mb-10 ml-6">
                    <div className="absolute -left-2.5 top-[36rem] w-4 h-4 bg-gray-500 rounded-full border-2 border-white" />
                    <h3 className="text-lg font-semibold">Frontend Developer Internship</h3>
                    <p className="text-gray-500">Panacea Solution Pvt. Ltd.<br />Baneshwor, Kathmandu</p>
                    <time className="flex items-center text-sm text-gray-400 mt-1" dateTime="2025-07/2025-08">
                        <BiCalendar className="w-4 h-4 mr-1" aria-hidden='true' />
                        July 2025 – Aug 2025
                    </time>
                </li>

                <li className="mb-10 ml-6">
                    <div className="absolute -left-2.5 top-[46rem] w-4 h-4 bg-gray-500 rounded-full border-2 border-white" />
                    <h3 className="text-lg font-semibold">Junior Frontend Developer</h3>
                    <p className="text-gray-500">IOXET Labs Pvt. Ltd.<br />Hattiban, Lalitpur</p>
                    <time className="flex items-center text-sm text-gray-400 mt-1" dateTime="2025-08">
                        <BiCalendar className="w-4 h-4 mr-1" aria-hidden='true' />
                        Aug 2025 – Present
                    </time>
                </li>
            </ol>
        </article>
    )
}

export default Qualification