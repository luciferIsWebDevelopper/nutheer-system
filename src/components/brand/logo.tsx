import Link from "next/link";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showTagline?: boolean;
  linked?: boolean;
};

const LogoMark = ({ showTagline }: { showTagline: boolean }) => (
  <>
    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm shadow-sm transition-transform group-hover:scale-105">
      N
    </span>
    <span className="flex flex-col">
      <span className="font-semibold tracking-tight leading-none">Nutheer</span>
      {showTagline && (
        <span className="text-xs text-muted-foreground">System</span>
      )}
    </span>
  </>
);

/**
 * Nutheer brand mark — consistent across header, footer, auth pages.
 * Pass linked={false} to render without an anchor (e.g. when already inside a Link).
 */
export function Logo({ className, showTagline = false, linked = true }: LogoProps) {
  if (!linked) {
    return (
      <span className={cn("group flex items-center gap-2", className)}>
        <LogoMark showTagline={showTagline} />
      </span>
    );
  }

  return (
    <Link
      href={routes.home}
      className={cn("group flex items-center gap-2", className)}
      aria-label="Nutheer System home"
    >
      <LogoMark showTagline={showTagline} />
    </Link>
  );
}
