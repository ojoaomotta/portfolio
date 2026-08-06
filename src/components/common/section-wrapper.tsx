"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function SectionWrapper({ id, children, className }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "py-16 md:py-20 scroll-mt-20 w-full mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 border-b border-zinc-200/50 dark:border-zinc-800/40 last:border-b-0",
        className
      )}
    >
      {children}
    </motion.section>
  );
}
