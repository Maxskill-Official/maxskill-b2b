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

function ScopeLines({ lines }: { lines: string[][] }) {
  if (lines.length === 0) return null;

  return (
    <div className="space-y-1">
      {lines.map((items) => (
        <p
          key={items.join(" · ")}
          className="whitespace-nowrap text-[0.95rem] font-medium leading-snug text-sky-200 [text-shadow:0_1px_8px_rgba(0,0,0,0.75)] sm:text-base lg:text-[1.05rem]"
        >
          {items.join(" · ")}
        </p>
      ))}
    </div>
  );
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
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(12rem,0.55fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
              <div>
                <p className="page-subtitle">Business Area</p>
                <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                  {area.title}
                </h2>
                {area.titleEn !== area.title && (
                  <p className="mt-3 text-base font-medium text-sky-300 sm:text-lg">
                    {area.titleEn}
                  </p>
                )}
              </div>

              <div className="min-w-0 space-y-3 overflow-x-auto lg:overflow-visible lg:pt-36 xl:pt-44">
                {area.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="break-keep text-lg font-medium leading-snug text-white sm:text-xl sm:leading-snug"
                  >
                    {paragraph}
                  </p>
                ))}
                <ScopeLines lines={area.scopes} />
                {area.subAreas?.map((sub) => (
                  <div key={sub.title} className="space-y-2 pt-2">
                    <h3 className="text-xl font-bold text-white">
                      {sub.title}
                      <span className="ml-2 text-base font-medium text-sky-300">
                        {sub.titleEn}
                      </span>
                    </h3>
                    {sub.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="break-keep text-lg font-medium leading-snug text-white sm:text-xl sm:leading-snug"
                      >
                        {paragraph}
                      </p>
                    ))}
                    <ScopeLines lines={sub.scopes} />
                  </div>
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
