import { skillCategories } from "@/config/skills";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function AboutSection() {
  const principles = [
    {
      title: "Authenticity & Ownership",
      description: "Focusing on clear problem solving, production feature delivery, end-to-end task ownership, and real software outcomes.",
    },
    {
      title: "Engineering Restraint",
      description: "Eliminating visual clutter, arbitrary animations, and unnecessary third-party dependencies. Every line of code must earn its place.",
    },
    {
      title: "Full-Stack Context",
      description: "Connecting backend data structures (Prisma ORM, PostgreSQL) seamlessly with modern React server and client components.",
    },
    {
      title: "Testing & Type Boundaries",
      description: "Enforcing strict TypeScript type safety, layer separation between database queries and UI, and component isolation.",
    },
  ];

  return (
    <SectionWrapper id="about">
      <SectionHeading
        index="03 // ABOUT"
        title="Engineering Philosophy"
        subtitle="Combining full-stack software development with responsive frontend design."
      />

      <div className="space-y-10">
        {/* Brand Narrative */}
        <div className="prose dark:prose-invert max-w-none text-base text-zinc-600 dark:text-zinc-300 leading-relaxed space-y-4">
          <p>
            I am a Frontend Engineer based in Brazil specializing in building production web applications. Having developed platforms like <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Makse Pro</strong> (a hybrid B2B/B2C ecommerce platform) and digital showpieces like <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Catarse</strong>, I focus on building reliable software with clean component architecture.
          </p>
          <p>
            My daily toolbelt centers on <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">React, Next.js, TypeScript, Prisma ORM, PostgreSQL</strong>, and <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">Tailwind CSS</strong>.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {principles.map((p) => (
            <Card key={p.title} className="p-5 flex flex-col space-y-2">
              <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 font-mono">
                // {p.title.toUpperCase()}
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {p.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Tech Stack Taxonomy */}
        <div className="space-y-4 pt-4">
          <h3 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-mono">
            // TECH_STACK_TAXONOMY
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillCategories.map((cat) => (
              <div
                key={cat.category}
                className="p-4 rounded-lg border border-zinc-200/80 bg-zinc-50/50 dark:border-zinc-800/80 dark:bg-[#121215] space-y-2.5"
              >
                <span className="block text-xs font-mono font-semibold text-zinc-500 dark:text-zinc-400 uppercase">
                  {cat.category}
                </span>

                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <Badge
                      key={s.name}
                      variant={s.highlight ? "sky" : "secondary"}
                      className="text-xs font-mono rounded-md"
                    >
                      {s.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
