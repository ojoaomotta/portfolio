import { siteConfig } from "@/config/site";
import { Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "./icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-200/80 bg-zinc-50/50 py-12 text-xs text-zinc-500 dark:border-zinc-800/80 dark:bg-zinc-950/50 dark:text-zinc-400">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & System Status */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2 font-mono text-zinc-700 dark:text-zinc-300">
              <Terminal className="h-3.5 w-3.5 text-sky-500" aria-hidden="true" />
              <span className="font-semibold">{siteConfig.name}</span>
            </div>
            <div className="hidden sm:block h-3 w-[1px] bg-zinc-300 dark:bg-zinc-800" />
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>{siteConfig.location}</span>
            </div>
          </div>

          {/* Social Endpoints */}
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="h-4 w-4" aria-hidden="true" />
              <span>GitHub</span>
            </a>
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="h-4 w-4" aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
            <a
              href={siteConfig.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              aria-label="WhatsApp Contact"
            >
              <WhatsappIcon className="h-4 w-4 text-emerald-500" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Copyright */}
          <div>
            <span>© {currentYear} {siteConfig.name}. Built with Next.js & React.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
