import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "makse-pro",
    title: "Makse Pro",
    subtitle: "Production Hybrid B2B / B2C Ecommerce Platform",
    tagline: "Hybrid ecommerce application built with Next.js App Router, Prisma ORM, PostgreSQL, NextAuth, and Tailwind CSS.",
    description: "Makse Pro is a production e-commerce platform serving both wholesale B2B buyers and B2C retail customers within a unified codebase. Built to handle dynamic product catalog navigation, role-based access control, and responsive cart state management.",
    type: "Production Platform",
    role: "Frontend Engineer",
    period: "Production",
    featured: true,
    techStack: [
      "Next.js App Router",
      "TypeScript",
      "Prisma ORM",
      "PostgreSQL",
      "NextAuth",
      "Tailwind CSS",
      "REST APIs",
    ],
    highlights: [
      "Architected a multi-role authentication pipeline (NextAuth) supporting distinct permission flows for B2B wholesale buyers and B2C retail guests.",
      "Engineered server-side data fetching and route handlers using Prisma ORM with optimized PostgreSQL database queries.",
      "Built responsive catalog browsing, dynamic product filters, and client-side shopping cart state management.",
    ],
    architecturalDecisions: [
      "Adopted Next.js App Router Server Components (RSC) to render heavy product listings on the server, streaming initial HTML without sending unneeded client JS.",
      "Structured strict layer separation between Prisma ORM database queries, route handlers, and presentational UI components.",
      "Enforced type-safe API contracts across server endpoints and client data fetching boundaries.",
      "Configured consistent styling tokens using Tailwind CSS for dark and light theme adaptability.",
    ],
  },
  {
    id: "catarse",
    title: "Catarse",
    subtitle: "Cinematic Production Company Website",
    tagline: "Digital showcase for a cinematic production studio built with responsive frontend technologies.",
    description: "Catarse is a portfolio website developed for a cinematic production company. Features custom media showcase layouts, video presentation grids, and editorial visual hierarchy.",
    type: "Client Project",
    role: "Frontend Developer",
    period: "Production",
    featured: true,
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "HTML",
      "CSS",
    ],
    highlights: [
      "Built custom video showcase layouts and responsive grid presentations for production reels.",
      "Structured responsive viewport scaling across desktop, tablet, and mobile browsers.",
      "Engineered clean visual hierarchy and media presentation controls.",
    ],
    architecturalDecisions: [
      "Used IntersectionObserver to lazy-load video viewports only when visible in the active viewport.",
      "Isolated media controls within clean component boundaries to prevent layout re-renders.",
    ],
  },
];
