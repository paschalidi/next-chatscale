import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { CodePreview } from "@/components/home/code-preview";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main>
        <HeroSection />
        <FeaturesSection />
        <CodePreview />
      </main>
    </div>
  );
}