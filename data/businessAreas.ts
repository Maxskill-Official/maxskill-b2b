import { projects as fallbackProjects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/data/projects";

export type FeaturedName = string | { match: string; display: string };

export type FeaturedProject = Project & { displayName: string };

export interface BusinessSubArea {
  title: string;
  titleEn: string;
  paragraphs: string[];
  scopes: string[][];
}

export interface BusinessArea {
  id: ProjectCategory;
  title: string;
  titleEn: string;
  paragraphs: string[];
  scopes: string[][];
  subAreas?: BusinessSubArea[];
  featuredNames: FeaturedName[];
  image: string;
  imageAlt: string;
}

export const businessAreas: BusinessArea[] = [
  {
    id: "화공",
    title: "화공",
    titleEn: "Petrochemical Plant",
    paragraphs: [
      "석유·가스·화학 원료를 다양한 공정을 통해 제품으로 생산하는 산업 플랜트",
    ],
    scopes: [
      [
        "석유화학",
        "정유",
        "Ethylene Cracker",
        "Polypropylene",
        "Ammonia",
        "Hydrogen",
        "Chemical Plant",
      ],
    ],
    featuredNames: [
      { match: "여수 금호폴리켐", display: "여수 금호폴리켐 EPDM PLANT" },
      "사우디 APCO PHD/UTOS Project",
      "Sarawak PetChem Methanol",
    ],
    image: "/images/hero/chemical.jpg",
    imageAlt: "석유화학 플랜트 전경",
  },
  {
    id: "발전",
    title: "발전",
    titleEn: "Power Plant",
    paragraphs: [
      "연료 또는 열에너지를 이용하여 전력을 생산하고 공급하는 플랜트",
    ],
    scopes: [
      [
        "복합화력",
        "LNG 발전",
        "HRSG",
        "보일러",
        "원자력 BOP",
        "신재생·수소 발전",
      ],
    ],
    featuredNames: [
      "Qatar Facility E IWPP Project",
      "KSA JUBAIL NET COGENERATION IPP Project",
      "Tanajib WISPP Project",
    ],
    image: "/images/hero/power-plant-2.png",
    imageAlt: "발전 플랜트 전경",
  },
  {
    id: "LNG",
    title: "Gas/LNG",
    titleEn: "Gas/LNG",
    paragraphs: [
      "천연가스 및 산업용 가스를 생산·처리·저장·공급하는 플랜트 및 인프라",
      "천연가스를 극저온 상태로 액화·저장·운송·기화하여 공급하는 에너지 산업",
    ],
    scopes: [
      [
        "Gas Processing",
        "Gas Treatment",
        "도시가스",
        "산업가스",
        "수소·가스 플랜트",
      ],
      [
        "LNG 생산·액화",
        "LNG 터미널",
        "저장시설",
        "Regasification",
        "LNG BOG",
      ],
    ],
    featuredNames: [
      "YHP LPG Terminal Project",
      "카타르 LNG NFXP EPC.2 Project",
      "Philippines Atimonam One Energy LNG to Power Project",
    ],
    image: "/images/hero/lng-tanks.png",
    imageAlt: "LNG 저장탱크 전경",
  },
  {
    id: "산업설비",
    title: "산업설비",
    titleEn: "Semiconductor · Water & Wastewater",
    paragraphs: [],
    scopes: [],
    subAreas: [
      {
        title: "반도체",
        titleEn: "Semiconductor",
        paragraphs: [
          "반도체 제조를 위한 초고순도·고정정 생산환경과 각종 Utility를 구축하는 산업",
        ],
        scopes: [
          [
            "Semiconductor Fab",
            "Clean Room Utility",
            "Process Gas System",
            "Chemical Supply System",
          ],
          ["UPW", "PCW", "CDA", "Waste Treatment"],
        ],
      },
      {
        title: "수처리",
        titleEn: "Water & Wastewater",
        paragraphs: [
          "반도체의 UPW/폐수처리와 발전의 Water Treatment, 화공의 Wastewater",
        ],
        scopes: [],
      },
    ],
    featuredNames: [
      { match: "현대제철", display: "현대제철 (HPLS)" },
      {
        match: "P5 ph-1",
        display: "삼성전자 P5 ph-1 2공구(삼성물산)",
      },
      { match: "흑연", display: "DYPNF 구형흑연 기본설계" },
    ],
    image: "/images/hero/industrial-wwt.png",
    imageAlt: "산업 수처리 설비 전경",
  },
];

function normalizeProjectName(name: string) {
  return name.replace(/[\s,./]/g, "").toLowerCase();
}

function findFeaturedProject(list: Project[], featuredName: string) {
  const exact = list.find((project) => project.name === featuredName);
  if (exact) return exact;

  const needle = normalizeProjectName(featuredName);
  return list.find((project) => {
    const haystack = normalizeProjectName(project.name);
    return haystack.includes(needle) || needle.includes(haystack);
  });
}

function featuredMatchName(item: FeaturedName) {
  return typeof item === "string" ? item : item.match;
}

function featuredDisplayName(item: FeaturedName, project: Project) {
  return typeof item === "string" ? project.name : item.display;
}

export function pickFeaturedProjects(
  projects: Project[],
  area: BusinessArea,
  limit = 3,
): FeaturedProject[] {
  if (area.featuredNames.length === 0) {
    return [];
  }

  const inCategory = projects.filter((project) => project.category === area.id);
  const fallbackCategory = fallbackProjects.filter(
    (project) => project.category === area.id,
  );
  const featured = area.featuredNames
    .map((item) => {
      const matchName = featuredMatchName(item);
      const project =
        findFeaturedProject(inCategory, matchName) ??
        findFeaturedProject(fallbackCategory, matchName) ??
        findFeaturedProject(projects, matchName) ??
        findFeaturedProject(fallbackProjects, matchName);
      if (!project) return null;
      return { ...project, displayName: featuredDisplayName(item, project) };
    })
    .filter((project): project is FeaturedProject => Boolean(project));

  if (featured.length >= limit) {
    return featured.slice(0, limit);
  }

  const used = new Set(featured.map((project) => project.name));
  const extras = [...inCategory]
    .sort((a, b) => b.year - a.year)
    .filter((project) => !used.has(project.name))
    .map((project) => ({ ...project, displayName: project.name }));

  return [...featured, ...extras].slice(0, limit);
}
