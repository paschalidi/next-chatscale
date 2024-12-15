"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

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
          <Link href={'/live?cn=public'}>
            <Button>
              Try it out &nbsp;⚡
            </Button>
          </Link>
          <Button size="lg" variant="outline">
            View Documentation
          </Button>
        </div>
      </div>
    </section>
  );
}