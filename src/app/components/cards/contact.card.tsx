import Link from 'next/link'
import React, { ReactElement } from 'react'
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
        <div className='flex flex-col font-sans items-center text-center col-span-1'>
            <h3 className='text-xl font-semibold'>
                {contact.name}
            </h3>

            <div className='text-center items-center border-white shadow-md p-6 rounded-lg'>
                <div className='flex space-x-3 items-center'>
                    <span aria-hidden='true'>{contact.icon}</span>
                    <p className='text-gray-500'>
                        {contact.description}
                    </p>
                </div>

                <div className='flex space-x-1 items-center-safe justify-center pt-2'>
                    <Link href={contact.link} target='_blank' rel='noopener noreferrer' className='text-gray-500' aria-label={`${contact.linkDescription} via ${contact.name}`}>{contact.linkDescription}</Link>
                    <FaArrowRightLong aria-hidden='true' />
                </div>
            </div>
        </div>
    )
}

export default ContactCard