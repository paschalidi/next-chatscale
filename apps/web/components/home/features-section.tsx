import { Zap, Shield, Layers, Cpu } from "lucide-react";
import { FeatureCard } from "./feature-card";

export function FeaturesSection() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900" id="features">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything you need for modern chat applications
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Zap className="h-6 w-6" />}
            title="Real-time Messaging"
            description="Built on Redis for lightning-fast message delivery and real-time updates."
          />
          <FeatureCard
            icon={<Shield className="h-6 w-6" />}
            title="Multi-tenant Security"
            description="Isolated environments for each organization using Kubernetes namespaces."
          />
          <FeatureCard
            icon={<Layers className="h-6 w-6" />}
            title="Ready-to-use Components"
            description="Beautiful React components for chat lists, message history, and inputs."
          />
          <FeatureCard
            icon={<Cpu className="h-6 w-6" />}
            title="Rust-Powered Backend"
            description="High-performance, memory-safe backend built with Rust for ultimate reliability."
          />
        </div>
      </div>
    </section>
  );
}