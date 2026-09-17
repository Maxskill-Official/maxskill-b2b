import type { Project, ProjectCategory } from "@/data/projects";

const categoryStyles: Record<ProjectCategory, string> = {
  화공: "bg-brand-blue/20 text-brand-blue",
  발전: "bg-orange-500/20 text-orange-400",
  LNG: "bg-emerald-500/20 text-emerald-400",
  산업설비: "bg-violet-500/20 text-violet-400",
};

interface ProjectCardProps {
  project: Project;
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5"
    >
      <path
        d="M4.167 10h11.666M11.667 5.833 15.833 10l-4.166 4.167"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col rounded-2xl bg-brand-tan p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-8">
      <div className="flex items-start justify-between gap-3">
        <span
          className={`brand-font inline-flex rounded-full px-3 py-1 text-[10px] tracking-wider ${categoryStyles[project.category]}`}
        >
          {project.category === "LNG" ? "Gas/LNG" : project.category}
        </span>
        <span className="text-sm font-bold text-black/50">{project.year}</span>
      </div>

      <h3 className="mt-6 break-keep text-lg font-bold leading-snug text-black sm:text-xl">
        {project.name}
      </h3>

      <dl className="mt-5 space-y-2 text-sm text-black/70">
        <div className="flex gap-3">
          <dt className="shrink-0 font-medium text-black/50">발주처</dt>
          <dd className="font-semibold text-black/80">{project.client}</dd>
        </div>
        <div className="flex gap-3">
          <dt className="shrink-0 font-medium text-black/50">지역</dt>
          <dd className="font-semibold text-black/80">{project.location}</dd>
        </div>
        {project.tool && (
          <div className="flex gap-3">
            <dt className="shrink-0 font-medium text-black/50">Tool</dt>
            <dd className="font-semibold text-black/80">{project.tool}</dd>
          </div>
        )}
      </dl>

      <button
        type="button"
        className="group/btn mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black/80"
      >
        Read More
        <ArrowIcon />
      </button>
    </article>
  );
}
