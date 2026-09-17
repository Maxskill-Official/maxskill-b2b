export const heroSlides = [
  {
    category: "화공",
    label: "Petrochemical Plant",
    src: "/images/hero/chemical.jpg",
    alt: "석유화학 플랜트 전경",
    position: "center 48%",
  },
  {
    category: "발전",
    label: "Power Plant",
    src: "/images/hero/power-plant-2.png",
    alt: "발전 플랜트 전경",
    position: "center 42%",
  },
  {
    category: "Gas/LNG",
    label: "Gas/LNG",
    src: "/images/hero/lng-tanks.png",
    alt: "LNG 저장탱크 전경",
    position: "center 50%",
  },
  {
    category: "산업설비",
    label: "Industrial",
    src: "/images/hero/industrial-wwt.png",
    alt: "산업 수처리 설비 전경",
    position: "center 46%",
  },
] as const;

export type HeroSlide = (typeof heroSlides)[number];

export const HERO_SLIDE_INTERVAL_MS = 5000;
