import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "muted" | "accent";
};

/**
 * Layout section wrapper with consistent vertical rhythm.
 */
export function Section({
  children,
  className,
  id,
  variant = "default",
}: SectionProps) {
  const variants = {
    default: "",
    muted: "bg-muted/40",
    accent: "bg-primary/5",
  };

  return (
    <section id={id} className={cn("py-16 md:py-24", variants[variant], className)}>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
