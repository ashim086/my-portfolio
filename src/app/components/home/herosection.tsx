import { socialLinks } from '@/app/api/scoaillinks'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiDownArrowAlt, BiMouse } from 'react-icons/bi'
import { PiHandWaving } from 'react-icons/pi'
import { TbBrandTelegram } from 'react-icons/tb'

function HeroSection() {

    return (
        <header className='lg:flex lg:flex-col mt-24 justify-between' role='banner'>
            <div className='font-sans flex flex-col-reverse lg:flex-row items-center justify-between p-4 gap-y-10'>
                <div className='text-center lg:text-left'>
                    <h1 className='text-5xl font-bold text-gray-700'>
                        Ashim Thapa <br />
                        Magar <PiHandWaving className='inline' aria-hidden='true' />
                    </h1>
                    <p className='text-xl my-6' role='doc-subtitle'>Full-Stack Web Developer</p>
                    <p>
                        Full-stack MERN developer dedicated to delivering <br />
                        seamless, design-driven solutions
                    </p>

                    <div className='flex justify-center lg:justify-start '>

                        <Link href={'#contact'} aria-label='Navigate to contact section'>
                            <button className='p-3 bg-black text-white rounded-lg flex items-center gap-x-4 mt-6 cursor-pointer'>
                                Say Hello <TbBrandTelegram aria-hidden='true' />
                            </button>
                        </Link>
                    </div>
                </div>

                <div className='flex flex-col items-center gap-y-6'>
                    <div className='relative w-40 h-40 lg:w-74 lg:h-74'>
                        <Image
                            src='/ash.jpg'
                            alt='Ashim Thapa Magar - Full-Stack Web Developer from Nepal'
                            fill
                            priority
                            className='object-cover rounded-full'
                            sizes='(max-width: 1024px) 160px, 296px'
                        />
                    </div>

                    <nav aria-label='Social media links' className='flex gap-x-4'>
                        {socialLinks.map((item, index) => (
                            <Link key={index} href={item.link} target='_blank' rel='noopener noreferrer' aria-label={`Visit social profile`}>
                                {item.icon}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            <div className='align-baseline mt-19 flex justify-center content-end mb-6'>
                <Link href={'#about'} scroll={true} aria-label='Scroll down to about section'>
                    <p className='flex items-center'>
                        <BiMouse size={36} className='text-sm font-light' aria-hidden='true' />
                        scroll down <BiDownArrowAlt size={26} aria-hidden='true' />
                    </p>
                </Link>
            </div>
        </header>
    )
}

export default HeroSection