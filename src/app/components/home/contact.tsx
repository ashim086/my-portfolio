import React from 'react'
import Title from '../layout/title'
import { contact } from '@/app/api/contact'
import ContactCard from '../cards/contact.card'

function Contact() {
    return (
        <main>
            <Title title='let&apos;s Connect' subtitle='contact me' />

            <div className='grid grid-cols-3 space-x-6 space-y-4 justify-between mt-16 mb-26'>

                {
                    contact.map((item, index) => (
                        <ContactCard contact={item} key={index} />
                    ))
                }

            </div>

        </main>
    )
}

export default Contact