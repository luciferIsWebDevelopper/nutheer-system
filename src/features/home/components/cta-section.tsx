import Link from "next/link";
import { routes } from "@/config/routes";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Section } from "@/components/common/section";

export function CtaSection() {
  return (
    <Section variant="accent">
      <div className="rounded-2xl border bg-card p-8 md:p-12 text-center shadow-sm">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Ready to shape your tech future?
        </h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Join Nutheer System — where IT services, training, and AI-ready learning
          converge.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={routes.auth.register} className={cn(buttonVariants({ size: "lg" }))}>
            Create free account
          </Link>
          <Link
            href={routes.contact}
            className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
          >
            Contact us
          </Link>
        </div>
      </div>
    </Section>
  );
}
