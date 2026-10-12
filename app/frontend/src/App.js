import { Toaster } from "sonner";
import { useLenis } from "@/hooks/useLenis";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { SkillsMarquee } from "@/components/skills/SkillsMarquee";
import { Projects } from "@/components/projects/Projects";
import { GameSection } from "@/components/game/GameSection";
import { Contact } from "@/components/contact/Contact";

function App() {
  useLenis();
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[var(--bg)] text-[var(--text)]">
      <div className="grain" aria-hidden />
      <Navbar />
      <main>
        <Hero />
        <About />
        <SkillsMarquee />
        <Projects />
        <GameSection />
        <Contact />
      </main>
      <Footer />
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}

export default App;
