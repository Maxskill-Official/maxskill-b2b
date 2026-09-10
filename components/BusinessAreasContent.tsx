"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type { BusinessArea, FeaturedProject } from "@/data/businessAreas";

function scrollToHash(hash: string) {
  if (!hash) return;

  const id = decodeURIComponent(hash.slice(1));
  const target = document.getElementById(id);
  if (!target) return;

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export type BusinessAreaView = BusinessArea & {
  featured: FeaturedProject[];
};

interface BusinessAreasContentProps {
  areas: BusinessAreaView[];
}

function FeaturedProjects({ projects }: { projects: FeaturedProject[] }) {
  if (projects.length === 0) {
    return (
      <p className="text-sm text-white/60">주요 수행 프로젝트는 준비 중입니다.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {projects.map((project) => (
        <article
          key={project.id}
          className="rounded-2xl border border-white/15 bg-black/50 p-6 backdrop-blur-sm"
        >
          {project.year > 0 && (
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-blue">
              {project.year}
            </p>
          )}
          <h3 className="mt-3 text-lg font-bold leading-snug text-brand-blue-light">
            {project.displayName}
          </h3>
          <p className="mt-3 text-sm font-medium text-brand-tan-light">
            {project.client}
          </p>
          <p className="mt-1 text-sm text-brand-tan-light/80">{project.location}</p>
        </article>
      ))}
    </div>
  );
}

export default function BusinessAreasContent({
  areas,
}: BusinessAreasContentProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/projects") return;

    const hash = window.location.hash;
    if (!hash) return;

    const timer = window.setTimeout(() => scrollToHash(hash), 100);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => scrollToHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <div>
      {areas.map((area) => (
        <article
          key={area.id}
          id={area.id}
          className="relative flex min-h-[48rem] flex-col overflow-hidden scroll-mt-28 sm:min-h-[52rem] sm:scroll-mt-32 lg:min-h-[56rem]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${area.image})` }}
            role="img"
            aria-label={area.imageAlt}
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/15 to-black/5" />

          <div className="section-container relative flex w-full flex-1 flex-col justify-between py-20 sm:py-24 lg:py-28">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-20">
              <div>
                <p className="page-subtitle">Business Area</p>
                <h2 className="mt-3 text-3xl font-bold text-brand-blue-light sm:text-4xl">
                  {area.title}
                </h2>
                {area.titleEn !== area.title && (
                  <p className="mt-3 text-base font-medium text-brand-blue sm:text-lg">
                    {area.titleEn}
                  </p>
                )}
              </div>

              <div className="max-w-3xl space-y-8">
                {area.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="readable-copy text-base text-brand-blue-light sm:text-[1.05rem] sm:leading-[2.05]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-14 sm:mt-16">
              <h3 className="mb-6 text-xl font-bold text-brand-blue-light sm:mb-8">
                주요 수행 프로젝트
              </h3>
              <FeaturedProjects projects={area.featured} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
