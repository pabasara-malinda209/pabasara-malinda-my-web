import { SKILLS } from "@/data/skills";

const Row = ({ hidden }) => (
  <div className="flex shrink-0 items-center" aria-hidden={hidden}>
    {SKILLS.map((s, i) => (
      <span key={s} className="flex items-center">
        <span className={`font-display px-6 text-[clamp(3rem,9vw,8rem)] font-extrabold uppercase leading-none tracking-[-0.03em] ${i % 2 ? "text-outline" : "text-[var(--text)]"}`}>
          {s}
        </span>
        <span className="text-3xl text-[var(--cyan)] sm:text-5xl">✦</span>
      </span>
    ))}
  </div>
);

export const SkillsMarquee = () => (
  <section className="marquee relative overflow-hidden border-y border-white/10 py-10 sm:py-14" data-testid="skills-marquee">
    <div className="marquee-track flex w-max">
      <Row />
      <Row hidden />
    </div>
  </section>
);
