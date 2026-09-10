"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HeroBackgroundSlides } from "@/components/HeroBackgroundSlides";
import { companyInfo } from "@/data/company";
import { heroSlides, HERO_SLIDE_INTERVAL_MS } from "@/data/heroSlides";

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length);
    }, HERO_SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="page-hero h-[min(50rem,82svh)] min-h-[32rem]"
      aria-label="맥스킬"
    >
      <HeroBackgroundSlides slides={heroSlides} activeIndex={activeIndex} />

      <div className="page-hero-inner items-center text-center">
        <div className="relative z-20 max-w-5xl translate-y-8 sm:translate-y-10">
          <h2 className="text-2xl font-bold leading-tight text-white drop-shadow-lg sm:text-3xl lg:text-4xl">
            {companyInfo.vision}
          </h2>
          <p className="body-copy mx-auto mt-4 max-w-2xl text-sm text-white/90 drop-shadow-md sm:text-base">
            고객 만족을 통해 &apos;Good Company&apos;가 되겠습니다.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex rounded-full bg-brand-blue-dark px-8 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:brightness-110"
          >
            회사소개 보기
          </Link>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 sm:bottom-6">
        {heroSlides.map((slide, index) => (
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
