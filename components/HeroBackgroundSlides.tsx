import type { HeroSlide } from "@/data/heroSlides";

interface HeroBackgroundSlidesProps {
  slides: readonly HeroSlide[];
  activeIndex: number;
}

export function HeroBackgroundSlides({
  slides,
  activeIndex,
}: HeroBackgroundSlidesProps) {
  return (
    <>
      {slides.map((slide, index) => (
        <div
          key={slide.category}
          className={`absolute inset-0 overflow-hidden bg-brand-dark transition-opacity duration-1000 ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== activeIndex}
        >
          {/* cover가 화면을 빈틈없이 채우는 최소 크기로 표시 */}
          <div
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${slide.src})`,
              backgroundPosition: slide.position,
            }}
            role="img"
            aria-label={slide.alt}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-black/5" />
    </>
  );
}
