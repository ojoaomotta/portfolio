import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({
  index,
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 md:mb-16 space-y-2", className)}>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs font-semibold tracking-wider text-sky-500 dark:text-sky-400 uppercase">
          {index}
        </span>
        <div className="h-[1px] w-8 bg-zinc-300 dark:bg-zinc-800" />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
