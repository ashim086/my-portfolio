import React from 'react'
import Title from '../layout/title'
import { contact } from '@/app/api/contact'
import ContactCard from '../cards/contact.card'

function Contact() {
    return (
        <div>
            <Title title="Let's Connect" subtitle='Get in touch with Ashim Thapa Magar' />

            <address className='grid md:grid-cols-3 gap-8 mt-16 mb-26 justify-center not-italic'>
                {
                    contact.map((item, index) => (
                        <ContactCard contact={item} key={index} />
                    ))
                }
            </address>
        </div>
    )
}

export default Contact