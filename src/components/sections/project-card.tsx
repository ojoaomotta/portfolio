"use client";

import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/common/icons";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="relative overflow-hidden group hover:border-zinc-700/80 transition-all duration-200">
      <div className="flex flex-col space-y-6">
        {/* Card Header & Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-200/60 pb-5 dark:border-zinc-800/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-semibold text-sky-500 dark:text-sky-400 uppercase tracking-wider">
                {project.type}
              </span>
              <span className="text-zinc-400 dark:text-zinc-600">•</span>
              <span className="text-xs text-zinc-500 font-mono">{project.period}</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 group-hover:text-sky-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              {project.subtitle}
            </p>
          </div>

          {project.metrics && project.metrics.length > 0 && (
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 dark:text-zinc-400 pt-1 sm:pt-0">
              {project.metrics.map((m, idx) => (
                <span key={m.label} className="inline-flex items-center gap-1">
                  {idx > 0 && <span className="text-zinc-600 mr-1">•</span>}
                  <span className="text-zinc-500">{m.label}:</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-200">{m.value}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Narrative */}
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
          {project.description}
        </p>

        {/* Stack Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="font-mono text-xs rounded-md">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Technical Highlights & Architectural Choices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60 text-xs">
          <div className="space-y-2">
            <span className="block font-mono font-semibold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider">
              // TECHNICAL_IMPLEMENTATION
            </span>
            <ul className="space-y-1.5 text-zinc-600 dark:text-zinc-400">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-sky-500 font-mono select-none">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <span className="block font-mono font-semibold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider">
              // ARCHITECTURAL_CHOICES
            </span>
            <ul className="space-y-1.5 text-zinc-600 dark:text-zinc-400">
              {project.architecturalDecisions.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-mono select-none">•</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recruiter 1-Click Code & Project Inspection Anchors */}
        {(project.githubUrl || project.liveUrl) && (
          <div className="flex items-center gap-3 pt-2 border-t border-zinc-200/40 dark:border-zinc-800/40">
            {project.githubUrl && (
              <Button variant="outline" size="sm" asChild className="rounded-md text-xs font-mono">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                  Inspect Repository
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button variant="ghost" size="sm" asChild className="rounded-md text-xs font-mono">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Live Platform
                  <ArrowUpRight className="ml-1 h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
