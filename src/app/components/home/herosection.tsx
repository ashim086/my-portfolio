import { socialLinks } from '@/app/api/scoaillinks'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiDownArrowAlt, BiMouse } from 'react-icons/bi'
import { PiHandWaving } from 'react-icons/pi'
import { TbBrandTelegram } from 'react-icons/tb'

function HeroSection() {

    return (
        <main className=' lg:flex lg:flex-col mt-24 justify-between '>
            <div className='font-sans flex flex-col-reverse lg:flex-row items-center justify-between p-4 gap-y-10'>
                <div className='text-center lg:text-left'>
                    <p className='text-5xl font-bold text-gray-700'>
                        Ashim Thapa <br />
                        Magar <PiHandWaving className='inline' />
                    </p>
                    <p className='text-xl my-6'>Web Developer</p>
                    <label>
                        Full-stack MERN developer dedicated to delivering <br />
                        seamless, design-driven solutions
                    </label>

                    <div className='flex justify-center lg:justify-start '>

                        <Link href={'#contact'}>
                            <button className='p-3 bg-black text-white rounded-lg flex items-center gap-x-4 mt-6 cursor-pointer'>
                                Say Hello <TbBrandTelegram />
                            </button>
                        </Link>
                    </div>
                </div>

                <div className='flex flex-col items-center gap-y-6'>
                    <div className='relative w-40 h-40 lg:w-74 lg:h-74  '>
                        <Image
                            src='/ash.jpg'
                            alt='ash'
                            fill
                            className='object-cover rounded-full'
                        />
                    </div>

                    <div className='flex gap-x-4'>
                        {socialLinks.map((item, index) => (
                            <Link key={index} href={item.link} target='_blank'>
                                {item.icon}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className='align-baseline mt-19 flex justify-center    content-end mb-6'>
                <Link href={'#about'} scroll={true} className=''>
                    <p className='flex items-center '>

                        <BiMouse size={36} className='text-sm font-light' />
                        scroll down <BiDownArrowAlt size={26} />
                    </p>
                </Link>
            </div>
        </main>

    )
}

export default HeroSection