import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import type { ReactElement } from "react";

export type SocialLink = {
  label: string;
  href: string;
  icon: ReactElement;
};

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/ashim086",
    icon: <FaGithub className="h-5 w-5" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ashim-thapamagar-875090360/",
    icon: <FaLinkedin className="h-5 w-5" />,
  },
  {
    label: "X / Twitter",
    href: "https://x.com/ashimmagar94524",
    icon: <FaXTwitter className="h-5 w-5" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ashim__thapa_/",
    icon: <FaInstagram className="h-5 w-5" />,
  },
];
