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
    src: "/images/hero/power-plant-focused.jpg",
    alt: "발전 설비 전경",
    position: "center 50%",
  },
  {
    category: "Gas/LNG",
    label: "Gas/LNG",
    src: "/images/hero/gas-lng-terminal.jpg",
    alt: "Gas/LNG 저장 및 공급시설 전경",
    position: "center 50%",
  },
  {
    category: "산업설비",
    label: "Industrial",
    src: "/images/hero/semiconductor-building.jpg",
    alt: "반도체 산업설비 전경",
    position: "center 50%",
  },
] as const;

export type HeroSlide = (typeof heroSlides)[number];

export const HERO_SLIDE_INTERVAL_MS = 5000;
