import { SiteConfig, NavItem } from "@/types";

export const siteConfig: SiteConfig = {
  name: "João Lucas Motta",
  role: "Frontend Engineer",
  location: "Brazil",
  status: "Available for select engineering opportunities",
  availability: "Open to remote software roles",
  email: "joaolucass0607@gmail.com",
  socials: {
    github: "https://github.com/ojoaomotta",
    linkedin: "https://www.linkedin.com/in/joão-lucas-motta-272aa023b/",
    whatsapp: "https://wa.me/5522999734867",
    whatsappFormatted: "+55 (22) 99973-4867",
  },
  siteUrl: "https://github.com/ojoaomotta",
};

export const navItems: NavItem[] = [
  { name: "Work", href: "#work", label: "Selected Work" },
  { name: "Experience", href: "#experience", label: "Experience" },
  { name: "About", href: "#about", label: "About" },
  { name: "Contact", href: "#contact", label: "Contact" },
];
