"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center pt-24 pb-12 w-full border-b border-zinc-200/50 dark:border-zinc-800/40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-8">
          {/* Availability Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>{siteConfig.status}</span>
            </div>
          </motion.div>

          {/* Authentic High-Contrast Headline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-4 max-w-4xl"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.08]">
              Building modern web software <br className="hidden sm:block" />
              with clarity and precision.
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl font-normal leading-relaxed">
              I&apos;m <strong className="font-semibold text-zinc-900 dark:text-zinc-100">João Lucas Motta</strong>, a Frontend Engineer based in Brazil specializing in <span className="text-zinc-900 dark:text-zinc-100 font-medium">React, Next.js, TypeScript</span>, and UI development for web applications.
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <Button size="lg" asChild className="rounded-md">
              <a href="#work">View Selected Work</a>
            </Button>

            <Button size="lg" variant="outline" asChild className="rounded-md">
              <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer">
                GitHub
                <ArrowUpRight className="ml-1 h-3.5 w-3.5 opacity-60" />
              </a>
            </Button>
          </motion.div>

          {/* Authentic Stack Overview Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-10 border-t border-zinc-200/60 dark:border-zinc-800/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm"
          >
            <div>
              <span className="block text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Role</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-200">Frontend Engineer</span>
            </div>
            <div>
              <span className="block text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Frontend Stack</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-200">React, Next.js, TS</span>
            </div>
            <div>
              <span className="block text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Database & Backend</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-200">Prisma, PostgreSQL</span>
            </div>
            <div>
              <span className="block text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Location</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-200">Brazil (Remote)</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
