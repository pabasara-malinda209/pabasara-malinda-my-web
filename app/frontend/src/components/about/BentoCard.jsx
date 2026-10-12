import { Reveal } from "@/components/common/Reveal";

export const BentoCard = ({ className = "", delay = 0, children, testId }) => (
  <Reveal delay={delay} className={className}>
    <div
      data-testid={testId}
      className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-[var(--bg2)] p-6 transition-colors duration-500 hover:border-[var(--cyan)]/30 sm:p-8"
    >
      {children}
    </div>
  </Reveal>
);
