import React from 'react'

interface IProps {
    title: string,
    subtitle: string
}

const Title: React.FC<IProps> = ({ title, subtitle }) => {
    return (
        <div className='mt-26 lg:mt-26 lg:font-sans lg:flex lg:flex-col'>
            <div className='flex flex-col justify-center items-center-safe space-y-2 mb-16'>
                <h2 className='line-clamp-1 font-semibold text-3xl'>{title}</h2>
                <p className='text-gray-400'>{subtitle}</p>
            </div>
        </div>
    )
}

export default Title