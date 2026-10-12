import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { scrollToId } from "@/hooks/useLenis";
import { EASE } from "@/components/common/Reveal";
import { HeroScene } from "./HeroScene";
import { MaskedTitle } from "./MaskedTitle";

const fade = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.9, ease: EASE },
});

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] overflow-hidden" data-testid="hero-section">
      <div className="grid-lines absolute inset-0 opacity-60" aria-hidden />
      <div className="hero-glow absolute inset-0" aria-hidden />
      <motion.div style={{ y: sceneY }} className="absolute inset-0">
        <HeroScene />
      </motion.div>
    <motion.div style={{ y, opacity }} className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-10 pt-32 sm:px-10 lg:px-16">
        <motion.div {...fade(0.9)} className="mb-6 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-300 sm:text-xs sm:tracking-[0.25em]">
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 backdrop-blur" data-testid="hero-role-badge">
            {PROFILE.role} • {PROFILE.tagline}
          </span>
          <span className="flex items-center gap-2 text-[var(--mint)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--mint)]" />
            {PROFILE.status}
          </span>
        </motion.div>
        <MaskedTitle
          lines={
            [
            { text: `${PROFILE.title} ${PROFILE.firstName}` },
            { text: PROFILE.lastName, indent: true, className: "text-gradient" },
          ]
          }
        />
        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <motion.p {...fade(1.05)} className="max-w-md text-base leading-relaxed text-zinc-300 sm:text-lg" data-testid="hero-intro">
            {PROFILE.intro}
          </motion.p>
          <motion.button
            {...fade(1.2)}
            onClick={() => scrollToId("about")}
            className="group flex items-center gap-4 self-start font-mono text-xs uppercase tracking-[0.25em] text-zinc-300 sm:self-auto"
            data-testid="hero-scroll-cta"
          >
            Scroll to explore
            <span className="grid h-12 w-12 place-items-center rounded-full border border-white/20 transition-colors duration-300 group-hover:border-[var(--cyan)] group-hover:bg-[var(--cyan)] group-hover:text-black">
              <ArrowDownRight size={18} className="transition-transform duration-300 group-hover:rotate-45" />
            </span>
          </motion.button>
        </div>
    </motion.div>
    </section>
  );
};
