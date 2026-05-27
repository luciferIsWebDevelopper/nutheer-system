"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <Skeleton className="h-48 w-full rounded-xl" />,
});

type LottiePlayerProps = {
  animationData: object;
  className?: string;
  loop?: boolean;
};

/**
 * Lazy-loaded Lottie animation player for lesson content.
 */
export function LottiePlayer({
  animationData,
  className,
  loop = true,
}: LottiePlayerProps) {
  return (
    <div className={className} role="img" aria-label="Lesson animation">
      <Lottie animationData={animationData} loop={loop} className="w-full h-full" />
    </div>
  );
}
