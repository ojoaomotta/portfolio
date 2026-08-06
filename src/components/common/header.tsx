"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navItems } from "@/config/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";

export function Header() {
  const activeSection = useActiveSection(navItems.map((item) => item.href.replace("#", "")));
  const scrollPosition = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isScrolled = scrollPosition > 20;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 transition-all duration-300">
      <div
        className={`w-full max-w-5xl rounded-xl border transition-all duration-300 ${
          isScrolled
            ? "border-zinc-200/80 bg-white/80 shadow-md shadow-zinc-950/5 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80 dark:shadow-black/20"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          {/* Brand Anchor */}
          <Link
            href="#"
            className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 hover:opacity-80 transition-opacity"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="font-sans">João Lucas Motta</span>
          </Link>

          {/* Desktop Navigation Dock */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 bg-zinc-100/70 dark:bg-zinc-900/70 p-1 rounded-md border border-zinc-200/60 dark:border-zinc-800/60 backdrop-blur-sm"
          >
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 text-xs font-medium transition-colors rounded-md ${
                    isActive
                      ? "text-zinc-950 dark:text-zinc-50"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-md shadow-xs"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Action Group */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 transition-colors shadow-xs"
            >
              Contact
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>

            {/* Mobile Drawer Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9 text-zinc-700 dark:text-zinc-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-50 rounded-xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 md:hidden"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors py-1"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-3">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 px-4 rounded-md bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 font-medium text-sm"
                >
                  Get in Touch
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
