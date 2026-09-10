import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  href: string;
  title: string;
  summary: string;
  items: string[];
  image: string;
  imageAlt: string;
  imageContain?: boolean;
  imageLight?: boolean;
}

export default function ServiceCard({
  href,
  title,
  summary,
  items,
  image,
  imageAlt,
  imageContain = false,
  imageLight = false,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-brand-card-border bg-brand-card transition-colors hover:border-brand-blue/30"
    >
      <div
        className={`relative aspect-[16/9] overflow-hidden border-b border-white/10 ${
          imageLight ? "bg-white" : "bg-brand-dark"
        }`}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          className={
            imageContain
              ? "object-contain object-center"
              : "object-cover transition-transform duration-700 group-hover:scale-105"
          }
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-8 sm:p-10">
        <h3 className="whitespace-nowrap text-xl font-bold text-brand-blue-light">{title}</h3>
        <p className="readable-copy mt-5 flex-1 text-[0.95rem] leading-[1.95]">
          {summary}
        </p>

        {items.length > 0 && (
          <ul className="mt-8 space-y-3.5">
            {items.map((item) => (
              <li
                key={item}
                className="readable-copy flex items-start gap-2.5 text-[0.95rem] leading-[1.85]"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
}
