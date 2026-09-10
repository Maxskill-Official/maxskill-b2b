import Link from "next/link";
import type { BusinessArea } from "@/data/businessAreas";

export default function BusinessAreaCard({ area }: { area: BusinessArea }) {
  return (
    <Link
      href={`/projects#${encodeURIComponent(area.id)}`}
      className="group relative flex min-h-[240px] flex-col overflow-hidden rounded-2xl border border-white/10 p-8 transition-colors hover:border-brand-blue/40 sm:min-h-[260px] sm:p-10"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${area.image})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-black/10" />

      <div className="relative flex flex-1 flex-col">
        <h3 className="text-xl font-bold text-brand-blue-light">{area.title}</h3>
        {area.titleEn !== area.title && (
          <p className="mt-2 text-sm font-medium text-brand-blue">
            {area.titleEn}
          </p>
        )}
        <p className="readable-copy mt-5 flex-1 text-[0.95rem] text-brand-blue-light">
          {area.paragraphs[0]}
        </p>
      </div>
    </Link>
  );
}
