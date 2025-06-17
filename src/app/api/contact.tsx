import { FaInstagram } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { TfiEmail } from "react-icons/tfi";

export const contact = [
    {
        name: 'Email',
        icon: <TfiEmail />,
        description: 'magarashim69086@gmail.com',
        link: 'mailto:magarashim69086@gmail.com',
        linkDescription: 'Send Email',

    },
    {
        name: 'Instagram',
        icon: <FaInstagram />,  
        description: 'ashim__thapa_',
        link: 'https://www.instagram.com/ashim__thapa_/',
        linkDescription: 'Send Message',

    },
    {
        name: 'WhatsApp',
        icon: <IoLogoWhatsapp />,
        description: 'Contact me directly',
        link: 'https://wa.me/9779748723714',
        linkDescription: 'Call me',

    },
]