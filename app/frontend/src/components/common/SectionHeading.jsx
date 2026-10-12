import { Reveal } from "./Reveal";

export const SectionHeading = ({ index, label, title, children }) => (
  <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end">
    <Reveal className="md:col-span-8">
      <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[var(--cyan)]">
        <span>{index}</span>
        <span className="h-px w-10 bg-[var(--cyan)]/50" />
        <span>{label}</span>
      </p>
      <h2 className="font-display text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">{title}</h2>
    </Reveal>
    {children && (
      <Reveal delay={0.1} className="text-sm leading-relaxed text-zinc-400 md:col-span-4 md:text-base">
        {children}
      </Reveal>
    )}
  </div>
);
