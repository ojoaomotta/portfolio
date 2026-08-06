import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { WorkSection } from "@/components/sections/work-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-sky-500/20 selection:text-sky-400">
      {/* Skip to Main Content Landmark Link for Keyboard Users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-sky-500 focus:text-zinc-950 focus:font-mono focus:text-xs focus:font-semibold focus:rounded-md focus:shadow-xl focus:ring-2 focus:ring-zinc-950"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1 w-full focus:outline-none">
        <HeroSection />
        <WorkSection />
        <ExperienceSection />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
