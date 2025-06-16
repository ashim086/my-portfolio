import Image from 'next/image'
import React from 'react'
import { BiDownload } from 'react-icons/bi'
import { BsDownload, BsStars } from 'react-icons/bs'
import { FaComputer, FaNotesMedical } from 'react-icons/fa6'

function AboutMe() {
    return (
        <main className='mt-26  font-sans flex flex-col h-[80vh]'>

            <div className=' flex flex-col justify-center items-center-safe space-y-2'>

                <h1 className='line-clamp-1 font-semibold text-3xl'>About me</h1>

                <p className='text-gray-400'>short introduction</p>
            </div>

            <div className='flex justify-around mt-26'>

                <div className='relative h-64 w-64 '>
                    <Image
                        src='/ash.jpg'
                        alt='ash.jpg'
                        fill
                        className='object-cover rounded-full' />
                </div>

                <div className='space-y-7'>

                    <div className='flex  gap-x-6 '>


                        <div className='flex flex-col p-6 border rounded-lg space-y-1 items-center'>

                            <FaComputer size={26} />
                            <h1>
                                Experience
                            </h1>

                            <p className='text-gray-400'>Beginner</p>
                        </div>
                        <div className='flex flex-col p-6 border rounded-lg space-y-1 items-center'>

                            <FaComputer size={26} />
                            <h1>
                                Experience
                            </h1>

                            <p>Beginner</p>
                        </div>
                        <div className='flex flex-col p-6 border rounded-lg space-y-1 items-center'>

                            <BsStars size={26}/>
                            <h1>
                                Experience
                            </h1>

                            <p>Beginner</p>
                        </div>
                    </div>

                    <p className='text-gray-400'>

                        Full-stack MERN developer crafting applications with a focus<br /> on minimal design and user-friendly interfaces.

                    </p>

                    <button className='bg-gray-900 rounded-lg text-white flex p-4 gap-x-3 items-center cursor-pointer '>
                        Download CV
                        <BsDownload />
                    </button>
                </div>


            </div>
        </main >
    )
}

export default AboutMe