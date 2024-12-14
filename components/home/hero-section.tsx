"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center max-w-3xl">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
          <span className="text-sm font-medium">Powered by Rust 🦀</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Enterprise-Grade Chat Infrastructure
        </h1>
        <p className="mt-6 text-xl text-muted-foreground">
          Build scalable chat experiences with our multi-tenant infrastructure.
          Deploy in seconds, scale to millions.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="gap-2">
            Start Building <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">
            View Documentation
          </Button>
        </div>
      </div>
    </section>
  );
}