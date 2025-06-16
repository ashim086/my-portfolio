import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiDownArrow, BiDownArrowAlt, BiMouse, BiMouseAlt } from 'react-icons/bi'
import { FaInstagram, FaLinkedin, FaSquareFacebook, FaXTwitter } from 'react-icons/fa6'
import { PiHandWaving } from 'react-icons/pi'
import { TbBrandTelegram } from 'react-icons/tb'

function HeroSection() {

    const socialLinks = [
        {
            icon: <FaXTwitter />,
            link: ''
        },
        {
            icon: <FaInstagram />,
            link: ''
        },
        {
            icon: <FaSquareFacebook />,
            link: ''
        },
        {
            icon: <FaLinkedin />,
            link: ''
        },
    ]

    return (
        <main className=' h-[75vh] flex flex-col mt-24 justify-between'>
            <div className=' font-sans flex justify-around  p-6   ' >


                <div>

                    <div className=' flex flex-col gap-y-6'>

                        <p className='text-5xl font-bold text-gray-700 '>

                            Ashim Thapa <br />
                            Magar <PiHandWaving className='p-0' />
                        </p>
                        <p className='text-xl'>

                            Web Developer
                        </p>



                    </div>

                    <label>
                        Full-stack MERN developer dedicated to delivering <br />seamless, design-driven solutions
                    </label>

                    <button className=' p-3 bg-black text-white  rounded-lg flex items-center gap-x-4 mt-6 cursor-pointer'>
                        Say Hello <TbBrandTelegram />
                    </button>
                </div>


                <div className='space-y-7'>

                    <div className='relative h-74 w-74 '>
                        <Image
                            src='/ash.jpg'
                            alt='ash.jpg'
                            fill
                            className='object-cover rounded-full' />
                    </div>

                    <div className='flex gap-x-4 justify-center'>

                        {

                            socialLinks.map((items, index) => (

                                <Link href={items.link} key={index} className='bg-yellow-50'>
                                    {items.icon}
                                </Link>
                            ))
                        }
                    </div>
                </div>


            </div>
            <div className='align-baseline flex justify-center    content-end'>
                <p className='flex items-center '>

                    <BiMouse size={36} className='text-sm font-light' />
                    scroll down <BiDownArrowAlt size={26} />
                </p>
            </div>
        </main>

    )
}

export default HeroSection