"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { routes } from "@/config/routes";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { GradientBlob } from "@/components/common/gradient-blob";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <GradientBlob />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <Badge variant="secondary" className="mb-6 gap-1">
            <Sparkles className="h-3 w-3" aria-hidden />
            AI-Ready Learning Ecosystem
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Build the future with{" "}
            <span className="text-primary">Nutheer System</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Enterprise IT services, immersive training with animations, live
            sessions, careers, and skill intelligence — all in one platform.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={routes.learning.courses}
              className={cn(buttonVariants({ size: "lg" }), "inline-flex items-center")}
            >
              Explore courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href={routes.prefer}
              className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
            >
              Share your preferences
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
