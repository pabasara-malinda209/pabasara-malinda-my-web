import { PROJECTS } from "@/data/projects";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => (
  <section id="work" className="px-5 py-28 sm:px-10 lg:px-16 lg:py-40" data-testid="projects-section">
    <div className="mx-auto max-w-7xl">
      <SectionHeading index="02" label="Selected work" title={<>Experiments that<br /><span className="text-gradient">refuse to sit still.</span></>}>
        A handful of builds where real-time graphics, interaction design and engineering meet.
      </SectionHeading>
      <div className="grid gap-5 md:grid-cols-12">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} delay={(i % 2) * 0.1} />
        ))}
      </div>
    </div>
  </section>
);
