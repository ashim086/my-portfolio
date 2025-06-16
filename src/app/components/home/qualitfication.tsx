import React from 'react'
import { BiCalendar } from 'react-icons/bi'
import { BsSuitcaseLg } from 'react-icons/bs'
import { GiGraduateCap, GiHandBag } from 'react-icons/gi'
import { MdCastForEducation, MdOutlineCastForEducation } from 'react-icons/md'

function Qualification() {
    return (
        <main className='mt-26  font-sans flex flex-col h-[80vh] items-center'>

            <div className=' flex flex-col justify-center items-center-safe space-y-2'>

                <h1 className='line-clamp-1 font-semibold text-3xl'>Qualification</h1>

                <p className='text-gray-400'>My Academy Journey</p>
            </div>


            <div className='mt-16 flex space-x-6'>

                <div className='flex space-x-2'>

                    <GiGraduateCap size={26} />
                    <p className='font-semibold'>Education</p>
                </div>



                <div className='flex space-x-2'>

                    <BsSuitcaseLg size={26} />
                    <p className='font-semibold'>Experience</p>
                </div>
            </div>



            <div className="relative border-l-2 border-gray-300 ml-6 mt-6">
                <div className="mb-10 ml-6">
                    <div className="absolute -left-2.5 w-4 h-4 bg-gray-500 rounded-full border-2 border-white" />
                    <h3 className="text-lg font-semibold">School</h3>
                    <p className="text-gray-500">Sainik Awasiya Mahavidyalaya <br />Teghari,kailali</p>
                    <div className="flex items-center text-sm text-gray-400 mt-1">
                        <BiCalendar className="w-4 h-4 mr-1" />
                        2018
                    </div>
                </div>

                <div className="mb-10 ml-6">
                    <div className="absolute -left-2.5 top-[9.5rem] w-4 h-4 bg-gray-500 rounded-full border-2 border-white" />
                    <h3 className="text-lg font-semibold">+2 Science</h3>
                    <p className="text-gray-500">Sainik Awasiya Mahavidyalaya <br/>Chitwan</p>
                    <div className="flex items-center text-sm text-gray-400 mt-1">
                        <BiCalendar className="w-4 h-4 mr-1" />
                        2019–2021
                    </div>
                </div>

                <div className="ml-6">
                    <div className="absolute -left-2.5 top-[17.3rem] w-4 h-4 bg-gray-500 rounded-full border-2 border-white" />
                    <h3 className="text-lg font-semibold">BCA</h3>
                    <p className="text-gray-500">Patan Multiple College</p>
                    <div className="flex items-center text-sm text-gray-400 mt-1">
                        <BiCalendar className="w-4 h-4 mr-1" />
                        2021–Pursuing
                    </div>
                </div>

            </div>

        </main>
    )
}

export default Qualification