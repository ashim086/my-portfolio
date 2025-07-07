import Image from 'next/image'
import React from 'react'
import { BsDownload } from 'react-icons/bs'
import { FaComputer } from 'react-icons/fa6'
import { GoProjectSymlink } from 'react-icons/go'

function AboutMe() {
    return (
        <main className='mt-26  font-sans flex flex-col min-h-[80vh]'>

            <div className=' flex flex-col justify-center items-center-safe space-y-2'>

                <h1 className='line-clamp-1 font-semibold text-3xl'>About me</h1>

                <p className='text-gray-400'>short introduction</p>
            </div>

            <div className='flex flex-col md:justify-around mt-26 md:flex-row justify-center items-center'>

                <div className='relative h-64 w-64 '>
                    <Image
                        src='/ash.jpg'
                        alt='ash.jpg'
                        fill
                        className='object-cover rounded-full' />
                </div>

                <div className='space-y-7'>

                    <div className="space-y-7 max-w-xl text-center md:text-left m-6">
                        <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
                            <div className="flex flex-col p-6 border rounded-lg space-y-1 items-center">
                                <FaComputer size={26} />
                                <h1>Experience</h1>
                                <p className="text-gray-400">Beginner</p>
                            </div>
                            <div className="flex flex-col p-6 border rounded-lg space-y-1 items-center">
                                <GoProjectSymlink size={26} />
                                <h1>Completed</h1>
                                <p className="text-gray-400">3 Projects</p>
                            </div>
                        </div>
                    </div>

                    <p className='text-gray-400 text-center md:text-start'>

                        Full-stack MERN developer crafting applications with a focus<br /> on minimal design and user-friendly interfaces.

                    </p>

                    <div className='flex justify-center lg:justify-start'>

                        <a href="/Ashim_thapa.pdf" download>
                            <button className='bg-gray-900 rounded-lg text-white flex p-4 gap-x-3 items-center cursor-pointer'>
                                Download CV
                                <BsDownload />
                            </button>
                        </a>
                    </div>
                </div>


            </div>
        </main >
    )
}

export default AboutMe