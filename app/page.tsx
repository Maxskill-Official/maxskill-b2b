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
