export type Skill = {
  name: string;
  level?: string;
};

export type SkillCategory = {
  title: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Java" },
      { name: "C#" },
      { name: "OOP" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React.js" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Shadcn UI" },
    ],
  },
  {
    title: "State / API",
    skills: [
      { name: "TanStack Query" },
      { name: "Zustand" },
      { name: "React Context" },
      { name: "Axios" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "MongoDB" },
      { name: "PostgreSQL" },
      { name: "Prisma" },
    ],
  },
  {
    title: "Auth & Security",
    skills: [
      { name: "JWT" },
      { name: "OAuth" },
      { name: "Session Management" },
    ],
  },
  {
    title: "DevOps",
    skills: [
      { name: "Docker" },
      { name: "AWS EC2" },
      { name: "Vercel" },
      { name: "Render" },
    ],
  },
  {
    title: "Integrations",
    skills: [
      { name: "eSewa" },
      { name: "Khalti" },
      { name: "PostHog" },
      { name: "Google Analytics" },
      { name: "Calendly" },
    ],
  },
  {
    title: "AI",
    skills: [
      { name: "AI API Integration" },
      { name: "Agentic Workflows" },
      { name: "AI Agents" },
    ],
  },
  {
    title: "Others",
    skills: [
      { name: "WebSockets" },
      { name: "REST APIs" },
    ],
  },
];
