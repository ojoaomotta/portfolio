import { projects } from "@/config/projects";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import { ProjectCard } from "./project-card";

export function WorkSection() {
  return (
    <SectionWrapper id="work">
      <SectionHeading
        index="01 // WORK"
        title="Selected Case Studies"
        subtitle="Production engineering projects built with Next.js App Router, TypeScript, Prisma, and modern web standards."
      />

      <div className="flex flex-col space-y-10">
        {projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </SectionWrapper>
  );
}
