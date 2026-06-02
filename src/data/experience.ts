export type ExperienceType = "education" | "experience" | "training";

export type ExperienceEntry = {
  type: ExperienceType;
  title: string;
  org: string;
  location?: string;
  startDate: string;
  endDate: string | null;
  highlights: string[];
};

export const experience: ExperienceEntry[] = [
  {
    type: "experience",
    title: "Full Stack Developer (Remote)",
    org: "ICodify Technology",
    location: "Remote",
    startDate: "04/2026",
    endDate: null,
    highlights: [
      "Deployed and managed full-stack applications using Docker and AWS EC2.",
      "Built scalable backend systems with a focus on production stability and deployment workflows.",
      "Integrated PostHog and Google Analytics for user-behavior tracking.",
      "Implemented Calendly integration for scheduling and automation workflows.",
      "Worked on AI-driven search optimization concepts (AEO & GEO).",
    ],
  },
  {
    type: "experience",
    title: "Junior Full Stack Developer (Part-time)",
    org: "Techmandu Solution",
    location: "Nepal",
    startDate: "04/2026",
    endDate: null,
    highlights: [
      "Developed backend systems using modular architecture and scalable API design.",
      "Worked in a monorepo and learned about microservices-based environments.",
      "Built and integrated secure REST APIs with clean architecture practices.",
      "Improved backend performance and collaborated across multiple services.",
    ],
  },
  {
    type: "experience",
    title: "Junior Frontend Web Developer",
    org: "IOXET Pvt. Ltd.",
    location: "Hattiban, Lalitpur",
    startDate: "08/2025",
    endDate: "04/2026",
    highlights: [
      "Built SaaS-based frontend applications using React.js and Next.js.",
      "Integrated eSewa and Khalti payment gateways for Nepal-based platforms.",
      "Developed real-time features using WebSockets and dynamic form builders.",
      "Worked on SEO optimization and AI-integrated workflows in a startup environment.",
    ],
  },
  {
    type: "experience",
    title: "Frontend Web Developer Intern",
    org: "Panacea Solution Pvt. Ltd.",
    location: "Baneshwor, Kathmandu",
    startDate: "07/2025",
    endDate: "08/2025",
    highlights: [
      "Worked on scalable frontend architecture and reusable component structures.",
      "Followed industry-level coding practices and clean folder architecture.",
      "Gained experience in modern frontend development workflows.",
    ],
  },
  {
    type: "training",
    title: "Full Stack MERN Training",
    org: "Broadway Infosys Pvt. Ltd.",
    location: "Shri Ganesh Marg, Kathmandu",
    startDate: "04/2025",
    endDate: "06/2025",
    highlights: [
      "Intensive 3-month MERN stack program covering React, Node, Express, MongoDB.",
      "Built and shipped four full-stack projects as coursework.",
    ],
  },
  {
    type: "education",
    title: "Bachelor's Degree (BCA)",
    org: "Patan Multiple Campus",
    location: "Patan, Lalitpur",
    startDate: "2022",
    endDate: null,
    highlights: ["Currently pursuing."],
  },
  {
    type: "education",
    title: "+2 Science",
    org: "Sainik Awasiya Mahavidyalaya",
    location: "Kharini, Chitwan",
    startDate: "2019",
    endDate: "2021",
    highlights: ["Grade: B"],
  },
  {
    type: "education",
    title: "SEE",
    org: "Sainik Awasiya Mahavidyalaya",
    location: "Teghari, Kailali",
    startDate: "2018",
    endDate: "2018",
    highlights: ["Grade: A"],
  },
];
