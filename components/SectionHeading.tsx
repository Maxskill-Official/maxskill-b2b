interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  light?: boolean;
}

export default function SectionHeading({
  label,
  title,
  description,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p
        className={`page-subtitle ${light ? "text-white/70" : "text-brand-blue"}`}
      >
        {label}
      </p>
      <h2
        className="mt-3 text-3xl font-bold tracking-tight text-brand-blue-light sm:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p
          className={`readable-copy mt-5 md:whitespace-nowrap ${light ? "text-white/80" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
