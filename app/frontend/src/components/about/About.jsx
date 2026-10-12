import { MapPin, Sparkles } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { FOCUS_STACK } from "@/data/skills";
import { SectionHeading } from "@/components/common/SectionHeading";
import { BentoCard } from "./BentoCard";
import { LocalClock } from "./LocalClock";

const Stat = ({ label, value, testId }) => (
  <div className="flex items-baseline justify-between border-b border-white/10 py-4 last:border-0">
    <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">{label}</span>
    <span className="font-display text-xl font-bold sm:text-2xl" data-testid={testId}>{value}</span>
  </div>
);

export const About = () => (
  <section id="about" className="relative px-5 py-28 sm:px-10 lg:px-16 lg:py-40" data-testid="about-section">
    <div className="mx-auto max-w-7xl">
      <SectionHeading index="01" label="About me" title={<>Code with <span className="text-outline">weight</span>,<br />worlds with soul.</>}>
        {PROFILE.focus}
      </SectionHeading>
      <div className="grid gap-5 md:grid-cols-12 md:grid-rows-[auto_auto]">
        <BentoCard className="md:col-span-7 md:row-span-2" testId="about-bio-card">
          <div className="flex h-full flex-col justify-between gap-10">
            <Sparkles className="text-[var(--cyan)]" size={22} />
            <div>
              <h3 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                I'm {PROFILE.firstName} {PROFILE.lastName}.
              </h3>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">{PROFILE.bio}</p>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--violet)]/20 blur-3xl transition-opacity duration-700 group-hover:opacity-100 md:opacity-60" />
        </BentoCard>
        <BentoCard className="md:col-span-5" delay={0.08} testId="about-stats-card">
          <Stat label="Age" value={PROFILE.age} testId="about-age" />
          <Stat label="Base" value={PROFILE.base} testId="about-base" />
          <Stat label="Status" value="Open" testId="about-status" />
        </BentoCard>
        <BentoCard className="md:col-span-5" delay={0.16} testId="about-clock-card">
          <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
            <MapPin size={14} className="text-[var(--amber)]" /> Local time · {PROFILE.timezone}
          </p>
          <LocalClock timezone={PROFILE.timezone} />
        </BentoCard>
        <BentoCard className="md:col-span-12" delay={0.1} testId="about-focus-card">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--cyan)]">Focus stack</p>
            <ul className="flex flex-wrap gap-2.5">
              {FOCUS_STACK.map((s) => (
                <li key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-200 transition-colors duration-300 hover:border-[var(--cyan)]/50 hover:text-[var(--cyan)]">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </BentoCard>
      </div>
    </div>
  </section>
);
