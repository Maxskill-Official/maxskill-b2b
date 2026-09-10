import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import BusinessAreaCard from "@/components/BusinessAreaCard";
import { companyInfo, services, getServiceCardItems } from "@/data/company";
import { businessAreas } from "@/data/businessAreas";

export default function HomePage() {
  return (
    <main>
      <h1 className="sr-only">{companyInfo.name}</h1>
      <HeroSection />

      <section className="flex min-h-[260px] items-center bg-brand-blue sm:min-h-[300px] lg:min-h-[340px]">
        <div className="section-container py-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {companyInfo.vision}
          </h2>
          <p className="body-copy mx-auto mt-4 max-w-2xl text-white/80">
            고객 만족을 통해 &apos;Good Company&apos;가 되겠습니다.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex rounded-full bg-brand-blue-dark px-8 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:brightness-110"
          >
            회사소개 보기
          </Link>
        </div>
      </section>

      <section className="section-container py-20 sm:py-28">
        <SectionHeading
          label="Business Areas"
          title="사업분야"
          description="화공, 발전, LNG, 산업설비"
        />

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {businessAreas.map((area) => (
            <BusinessAreaCard key={area.id} area={area} />
          ))}
        </div>
      </section>

      <section className="section-container py-20 sm:py-28">
        <SectionHeading
          label="Our Services"
          title="업무분야"
        />

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              href={`/services#${service.id}`}
              title={service.title}
              summary={service.summary}
              items={getServiceCardItems(service)}
              image={service.image}
              imageAlt={service.imageAlt}
              imageContain={
                service.id === "piping" || service.id === "cad"
              }
              imageLight={service.id === "cad"}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
