"use client";

import { siteConfig } from "@/config/site";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Copy, Mail, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/common/icons";

export function ContactSection() {
  const { isCopied, copy } = useCopyToClipboard();

  return (
    <SectionWrapper id="contact">
      <SectionHeading
        index="04 // CONTACT"
        title="Let's Build Something Exceptional"
        subtitle="Open for select frontend software engineering roles and remote project engagements."
      />

      <div className="mx-auto max-w-3xl">
        <Card className="p-8 sm:p-10 border-zinc-200/90 dark:border-zinc-800/90 bg-gradient-to-b from-white to-zinc-50/50 dark:from-zinc-900/80 dark:to-zinc-950/80 text-center space-y-6">
          <div className="mx-auto p-3 w-fit rounded-lg bg-sky-500/10 text-sky-500 dark:bg-sky-400/10 dark:text-sky-400">
            <Mail className="h-6 w-6" aria-hidden="true" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Get in Touch
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
              Whether you are hiring for an international startup or looking to build modern web software, my inbox is open.
            </p>
          </div>

          {/* Quick Copy Email Snippet Card with Screen Reader Live Region */}
          <div className="flex items-center justify-center gap-2 p-3 max-w-md mx-auto rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <span className="font-mono text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 truncate select-all">
              {siteConfig.email}
            </span>
            <div aria-live="polite" aria-atomic="true">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => copy(siteConfig.email)}
                className="h-8 px-3 text-xs font-mono shrink-0 rounded-md"
                aria-label={isCopied ? "Email copied to clipboard" : "Copy email address"}
              >
                {isCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" aria-hidden="true" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60">
            <Button asChild size="lg" className="rounded-md">
              <a href={`mailto:${siteConfig.email}`}>
                <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                Send Email
              </a>
            </Button>

            <Button variant="outline" size="lg" asChild className="rounded-md">
              <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedinIcon className="mr-2 h-4 w-4 text-sky-600" aria-hidden="true" />
                LinkedIn
              </a>
            </Button>

            <Button variant="outline" size="lg" asChild className="rounded-md">
              <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer">
                <GithubIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                GitHub
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </SectionWrapper>
  );
}
