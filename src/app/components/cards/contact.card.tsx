import Link from 'next/link'
import React, { ReactElement } from 'react'
import { BiRightArrow } from 'react-icons/bi'
import { FaArrowRightLong } from 'react-icons/fa6'


export interface IContact {
    name: string,
    icon: ReactElement,
    description: string,
    link: string,
    linkDescription: string

}

interface Iprops {

    contact: IContact
}

const ContactCard: React.FC<Iprops> = ({ contact }) => {
    return (
        <main className='flex flex-col font-sans items-center text-center'>
            <h1 className='text-xl font-semibold'>
                {contact.name}
            </h1>

            <div className='text-center items-center border-white shadow-md p-6 rounded-lg'>
                <div className='flex space-x-3 items-center'>

                    {contact.icon}
                    <p className=' text-gray-500'>

                        {contact.description}
                    </p>
                </div>

                <div className='flex space-x-1 items-center-safe justify-center pt-2'>

                    <Link href={contact.link} className=' text-gray-500'>{contact.linkDescription}</Link>
                    <FaArrowRightLong />
                </div>
            </div>
        </main>
    )
}

export default ContactCard