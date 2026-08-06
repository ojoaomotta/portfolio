import { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "makse-pro-exp",
    company: "Makse Pro",
    role: "Frontend Engineer",
    period: "Production",
    location: "Brazil",
    type: "Production Application",
    description: "Engineered hybrid B2B/B2C ecommerce application frontend using Next.js App Router, TypeScript, Prisma ORM, PostgreSQL, NextAuth, and Tailwind CSS.",
    impactBullets: [
      "Architected responsive catalog browsing, product listings, and role-based authentication.",
      "Integrated Prisma ORM with PostgreSQL for data models and API route handlers.",
      "Built design system tokens and reusable UI components with Tailwind CSS.",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "NextAuth", "REST APIs"],
  },
  {
    id: "catarse-exp",
    company: "Catarse",
    role: "Frontend Developer",
    period: "Production",
    location: "Brazil",
    type: "Website Project",
    description: "Developed portfolio website for a cinematic production company using modern responsive frontend technologies.",
    impactBullets: [
      "Designed and implemented video showcase layouts and media presentation grids.",
      "Ensured responsive layouts across mobile, tablet, and desktop viewports.",
      "Applied media loading optimization and clean component boundaries.",
    ],
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML", "CSS", "Figma"],
  },
];
