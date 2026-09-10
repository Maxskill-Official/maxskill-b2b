"use client";

import { useEffect, useState } from "react";
import { HeroBackgroundSlides } from "@/components/HeroBackgroundSlides";
import {
  heroSlides,
  HERO_SLIDE_INTERVAL_MS,
  type HeroSlide,
} from "@/data/heroSlides";

interface HeroSlideshowProps {
  slides?: readonly HeroSlide[];
  children: React.ReactNode;
}

export default function HeroSlideshow({
  slides = heroSlides,
  children,
}: HeroSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, HERO_SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="page-hero h-[min(50rem,82svh)] min-h-[32rem]">
      <HeroBackgroundSlides slides={slides} activeIndex={activeIndex} />

      <div className="page-hero-inner">
        <div className="page-hero-copy">{children}</div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 sm:bottom-6">
        {slides.map((slide, index) => (
          <button
            key={slide.category}
            type="button"
            aria-label={`${slide.category} 배경 보기`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
            className={`rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "h-2.5 w-10 bg-brand-blue"
                : "h-2.5 w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

    </section>
  );
}
