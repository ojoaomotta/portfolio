import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages & Core",
    skills: [
      { name: "TypeScript", highlight: true },
      { name: "JavaScript (ES6+)", highlight: true },
    ],
  },
  {
    category: "Frontend & UI Architecture",
    skills: [
      { name: "React", highlight: true },
      { name: "Next.js", highlight: true },
      { name: "Tailwind CSS", highlight: true },
      { name: "Material UI", highlight: false },
      { name: "Styled Components", highlight: false },
    ],
  },
  {
    category: "Backend & Database Integration",
    skills: [
      { name: "Prisma ORM", highlight: true },
      { name: "PostgreSQL", highlight: true },
      { name: "REST APIs", highlight: true },
    ],
  },
  {
    category: "Tooling & Design Translation",
    skills: [
      { name: "Git", highlight: true },
      { name: "GitHub", highlight: true },
      { name: "GitLab", highlight: true },
      { name: "Vercel", highlight: true },
      { name: "AWS", highlight: false },
      { name: "Figma (Design-to-Code)", highlight: true },
    ],
  },
];
