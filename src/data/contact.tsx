import type { ReactElement } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";

export type ContactChannel = {
  slug: string;
  name: string;
  value: string;
  href: string;
  cta: string;
  icon: ReactElement;
  accent: "default" | "yellow" | "red" | "green";
};

export const contact: ContactChannel[] = [
  {
    slug: "email",
    name: "Email",
    value: "magarashim69086@gmail.com",
    href: "mailto:magarashim69086@gmail.com",
    cta: "Send email",
    icon: <HiMail className="h-5 w-5" />,
    accent: "green",
  },
  {
    slug: "phone",
    name: "Phone",
    value: "+977-9748723714",
    href: "tel:+9779748723714",
    cta: "Call me",
    icon: <HiPhone className="h-5 w-5" />,
    accent: "yellow",
  },
  {
    slug: "location",
    name: "Location",
    value: "Nepal, Baneshwor",
    href: "https://maps.google.com/?q=Baneshwor,Kathmandu,Nepal",
    cta: "View on map",
    icon: <HiLocationMarker className="h-5 w-5" />,
    accent: "red",
  },
  {
    slug: "whatsapp",
    name: "WhatsApp",
    value: "Chat on WhatsApp",
    href: "https://wa.me/9779748723714",
    cta: "Open chat",
    icon: <FaWhatsapp className="h-5 w-5" />,
    accent: "green",
  },
];

// Kept for the navbar/footer — Instagram only.
export { FaInstagram };
