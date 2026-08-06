export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  type: 'Production Platform' | 'Client Project' | 'Open Source';
  role: string;
  period: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  techStack: string[];
  highlights: string[];
  architecturalDecisions: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string;
  impactBullets: string[];
  techStack: string[];
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    highlight?: boolean;
  }[];
}

export interface NavItem {
  name: string;
  href: string;
  label: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  location: string;
  status: string;
  availability: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
  };
  siteUrl: string;
}
