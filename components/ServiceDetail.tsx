import Image from "next/image";
import type { Service, ServiceItem } from "@/data/services";
import { getServiceItemImage } from "@/data/serviceItemImages";

interface ServiceDetailProps {
  service: Service;
  sectionId?: string;
}

function renderServiceItemCard(
  serviceId: string,
  item: ServiceItem,
  featured: boolean,
) {
  const itemImage = getServiceItemImage(serviceId, item.name);

  return (
    <div
      key={item.name}
      className="overflow-hidden rounded-xl border border-brand-card-border bg-brand-dark/40"
    >
      {itemImage && (
        featured || itemImage.intrinsic ? (
          <div className="overflow-hidden bg-brand-dark">
            <Image
              src={itemImage.src}
              alt={itemImage.alt}
              width={featured ? 1024 : 1600}
              height={featured ? 682 : 880}
              className={`block h-auto w-full ${itemImage.imageClass ?? ""}`}
              sizes={
                featured
                  ? "(max-width: 1024px) 100vw, 1024px"
                  : "(max-width: 1024px) 100vw, 512px"
              }
              quality={95}
            />
          </div>
        ) : (
        <div
          className={
            itemImage.imageContainerClass ??
            "relative h-56 overflow-hidden bg-brand-dark sm:h-64"
          }
        >
          {itemImage.unoptimized ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={itemImage.src}
              alt={itemImage.alt}
              className={`h-full w-full ${
                itemImage.imageClass ?? "object-cover object-center"
              }`}
            />
          ) : (
            <Image
              src={itemImage.src}
              alt={itemImage.alt}
              fill
              className={itemImage.imageClass ?? "object-cover object-center"}
              sizes="(max-width: 1024px) 100vw, 512px"
              quality={95}
            />
          )}
        </div>
        )
      )}
      <div
        className={
          itemImage?.imageBodyClass ??
          "px-4 pb-5 pt-3 sm:px-5 sm:pb-6 sm:pt-4"
        }
      >
        <p
          className={
            featured
              ? "text-lg font-semibold text-brand-blue-light sm:text-xl"
              : "font-semibold text-brand-blue-light"
          }
        >
          {item.name}
        </p>
        {item.description ? (
          <p className="readable-copy mt-3 text-sm leading-[1.9] sm:text-[0.95rem]">
            {item.description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default function ServiceDetail({
  service,
  sectionId,
}: ServiceDetailProps) {
  const stackedSections =
    service.sectionsLayout === "split"
      ? service.sections.filter((section) => section.display !== "list")
      : service.sections;

  return (
    <article
      id={sectionId}
      className="scroll-mt-28 overflow-hidden rounded-2xl border border-brand-card-border bg-brand-card sm:scroll-mt-32"
    >
      <div className="p-8 sm:p-10 lg:p-12">
        <p className="page-subtitle">Service</p>
        <h2 className="mt-3 text-3xl font-bold text-brand-blue-light sm:text-4xl">
          {service.title}
        </h2>
        <p className="readable-copy mt-6 text-base font-medium leading-[1.9] text-brand-blue sm:text-lg sm:leading-[2]">
          {service.summary}
        </p>
      </div>

      <div
        className={`relative overflow-hidden border-y border-white/10 ${
          service.id === "cad"
            ? "aspect-[16/9] bg-white"
            : service.id === "piping"
              ? "aspect-[16/9] bg-brand-dark"
              : "h-72 sm:h-96"
        }`}
      >
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          className={
            service.id === "cad" || service.id === "piping"
              ? "object-contain object-center"
              : "object-cover"
          }
          sizes="(max-width: 768px) 100vw, 1024px"
          priority={sectionId === "piping"}
        />
      </div>

      <div className="p-8 sm:p-10 lg:p-12">
        {stackedSections.length > 0 && (
          <div className="space-y-16">
            {stackedSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-xl font-bold text-brand-blue-light">{section.title}</h3>
                <div className="mt-2 h-px w-full bg-brand-card-border" />
                {section.description ? (
                  <p className="readable-copy mt-5 text-sm leading-[1.95]">
                    {section.description}
                  </p>
                ) : null}

                {section.display === "list" ? (
                  <ul className="mt-6 space-y-3">
                    {section.items.map((item) => (
                      <li
                        key={item.name}
                        className="readable-copy flex items-start gap-3 rounded-xl border border-brand-card-border bg-brand-dark/40 px-4 py-4 text-sm leading-[1.85]"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                        <span>
                          {item.name}
                          {item.description ? (
                            <span className="readable-copy mt-2 block text-sm leading-[1.9]">
                              {item.description}
                            </span>
                          ) : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : section.display === "featured" ? (
                  <div className="mt-6 space-y-5">
                    {section.items[0] &&
                      renderServiceItemCard(service.id, section.items[0], true)}
                    {section.items.length > 1 && (
                      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        {section.items.slice(1).map((item) =>
                          renderServiceItemCard(service.id, item, false),
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className={`mt-6 grid grid-cols-1 gap-5 ${
                      section.items.length === 1 ? "" : "lg:grid-cols-2"
                    }`}
                  >
                    {section.items.map((item) =>
                      renderServiceItemCard(service.id, item, false),
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
