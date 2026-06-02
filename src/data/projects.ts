export type Project = {
  name: string;
  slug: string;
  photo: string;
  description: string;
  link: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    name: "Relocation Booking Platform",
    slug: "relocation-booking",
    photo: "/relocation.png",
    description:
      "Role-based platform for booking and managing home or office relocation services. Customers, drivers, and admins each get their own dashboard.",
    link: "https://texch.vercel.app/",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "JWT", "OAuth"],
  },
  {
    name: "E-Commerce Payment Integration",
    slug: "wallets",
    photo: "/payment.png",
    description:
      "Full-stack MVP integrating eSewa and Khalti — the dominant payment gateways in Nepal — with server-side verification and a complete order lifecycle.",
    link: "https://wallets-sooty.vercel.app/login",
    stack: ["Express", "Node.js", "TypeScript", "eSewa", "Khalti", "JWT"],
  },
  {
    name: "MediCare E-Commerce",
    slug: "medicare",
    photo: "/medi.png",
    description:
      "Product-based e-commerce platform for protein and vitamin supplements, with React Query powering the data layer end to end.",
    link: "https://medicarelifeharmony.vercel.app/",
    stack: ["MongoDB", "Express", "React", "Node.js", "React Query"],
  },
  {
    name: "News Portal — classic-paper-paperio",
    slug: "news-portal",
    photo: "/Enews.png",
    description:
      "Role-based news management system with admin, journalist, and viewer roles. Built around a secure authentication flow and a clean REST API.",
    link: "https://news-portal-swart-zeta.vercel.app/",
    stack: ["MERN", "REST APIs", "Role-based Auth"],
  },
];
