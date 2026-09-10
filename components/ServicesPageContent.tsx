"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import ServiceDetail from "@/components/ServiceDetail";
import { services } from "@/data/services";

function scrollToHash(hash: string) {
  if (!hash) return;

  const target = document.querySelector(hash);
  if (!target) return;

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function ServicesPageContent() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/services") return;

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
    <section className="section-container pb-20 pt-8 sm:pb-28 sm:pt-10">
      <div className="mx-auto max-w-5xl space-y-24 sm:space-y-32">
        {services.map((service, index) => (
          <div key={service.id}>
            {index > 0 && (
              <div className="mb-24 h-px w-full bg-brand-card-border sm:mb-32" />
            )}
            <ServiceDetail service={service} sectionId={service.id} />
          </div>
        ))}
      </div>
    </section>
  );
}
