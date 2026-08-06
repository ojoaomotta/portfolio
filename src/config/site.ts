import { SiteConfig, NavItem } from "@/types";

export const siteConfig: SiteConfig = {
  name: "João Lucas Motta",
  role: "Frontend Engineer",
  location: "Brazil",
  status: "Available for select engineering opportunities",
  availability: "Open to remote software roles",
  email: "contact@joaolucasmotta.dev",
  socials: {
    github: "https://github.com/joaolucasmotta",
    linkedin: "https://linkedin.com/in/joaolucasmotta",
  },
  siteUrl: "https://joaolucasmotta.dev",
};

export const navItems: NavItem[] = [
  { name: "Work", href: "#work", label: "Selected Work" },
  { name: "Experience", href: "#experience", label: "Experience" },
  { name: "About", href: "#about", label: "About" },
  { name: "Contact", href: "#contact", label: "Contact" },
];
