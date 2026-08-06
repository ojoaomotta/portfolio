import { experiences } from "@/config/experience";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import { Badge } from "@/components/ui/badge";

export function ExperienceSection() {
  return (
    <SectionWrapper id="experience">
      <SectionHeading
        index="02 // EXPERIENCE"
        title="Professional Track"
        subtitle="Track record in frontend architecture, technical leadership, and scalable product delivery."
      />

      <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 md:ml-6 space-y-10 pl-6 md:pl-8">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative group">
            {/* Minimalist Solid Dot Marker */}
            <div className="absolute -left-[29px] md:-left-[37px] top-1.5 h-2.5 w-2.5 rounded-full bg-sky-500 ring-4 ring-zinc-50 dark:ring-zinc-950" />

            <div className="flex flex-col space-y-3">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1">
                <div>
                  <h3 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    {exp.role}
                  </h3>
                  <span className="text-sm font-medium text-sky-600 dark:text-sky-400 font-mono">
                    {exp.company}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  <span>{exp.period}</span>
                  <span>•</span>
                  <span>{exp.location}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                {exp.description}
              </p>

              {/* Bullet Points */}
              <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                {exp.impactBullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-sky-500 font-mono select-none">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Stack Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {exp.techStack.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-[11px] font-mono rounded-md">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
