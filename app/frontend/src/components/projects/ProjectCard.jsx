import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";

const track = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

export const ProjectCard = ({ project, delay }) => (
  <Reveal delay={delay} className={project.span}>
    <a
      href={project.href}
      onMouseMove={track}
      data-testid={`project-card-${project.id}`}
      className="spotlight group block h-full overflow-hidden rounded-3xl border border-white/10 bg-[var(--bg2)] p-3 transition-colors duration-500 hover:border-[var(--cyan)]/30"
    >
      <div className="relative h-64 overflow-hidden rounded-2xl sm:h-80 lg:h-96 [clip-path:inset(0_round_1rem)] transition-[clip-path] duration-700 group-hover:[clip-path:inset(10px_round_1.4rem)]">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e]/80 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 font-mono text-xs text-zinc-200 backdrop-blur">{project.index}</span>
      </div>
      <div className="flex items-end justify-between gap-4 px-3 pb-3 pt-6">
        <div>
          <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{project.title}</h3>
          <p className="mt-1 text-sm text-zinc-400">{project.kind}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li key={s} className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-zinc-300">{s}</li>
            ))}
          </ul>
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-[var(--cyan)] group-hover:bg-[var(--cyan)] group-hover:text-black">
          <ArrowUpRight size={20} />
        </span>
      </div>
    </a>
  </Reveal>
);
