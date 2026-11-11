export interface ServiceItem {
  name: string;
  description: string;
}

export interface ServiceSection {
  title: string;
  description: string;
  items: ServiceItem[];
  display?: "cards" | "list" | "featured";
}

export interface PlatformLogo {
  src: string;
  alt: string;
}

export interface Service {
  id: string;
  title: string;
  summary: string;
  intro: string[];
  highlights: string[];
  platformLogos?: PlatformLogo[];
  sectionsLayout?: "stacked" | "split";
  sections: ServiceSection[];
  image: string;
  imageAlt: string;
}

/** public/images/services/ GitHub에서 같은 이름으로 교체 가능 */
function serviceBanner(filename: string) {
  return `/images/services/${filename}`;
}

export const services: Service[] = [
  {
    id: "piping",
    title: "Piping Design",
    summary: "Planning, Basic Design, Detail Design",
    intro: [
      "Planning 단계 WBS, 마일스톤 기반 일정 수립, Mechanical, Instrument, Electrical, Civil 등 유관 공종 간 인터페이스 조율. Basic Design Plot Plan을 통한 배관 라우팅, 설비 배치 작성, Detail Design Piping Plan/ISO, Stress ISO, Support Detail, Information 도면 작성.",
      "국내외 대형 EPC 프로젝트 배관 설계.",
    ],
    highlights: [
      "Planning, Basic Design, Detail Design 단계별 수행",
      "3D Plan, ISO, Stress ISO, Support Detail 도면 제공",
      "화공, 발전, LNG 분야 대형 프로젝트 다수 수행",
      "다공종 Coordination 및 설계 변경 대응",
    ],
    sections: [
      {
        title: "Planning",
        description: "",
        items: [
          {
            name: "Project Scheduling",
            description:
              "프로젝트 일정 및 주요 마일스톤 수립, 배관 설계 진행 현황과 공정별 진척도 관리.",
          },
          {
            name: "Coordination",
            description:
              "발주처 및 유관 공종과의 기술적 협의를 통한 설계 인터페이스 조정, 업무 수행.",
          },
        ],
      },
      {
        title: "Basic Design",
        description: "",
        items: [
          {
            name: "Plot Plan",
            description:
              "Equipment, Structure, Pipe Rack, Utility, Roadway 등을 반영한 설비 배치도, Pipe Routing, Valve Access, Maintenance Space를 반영한 배치안 작성.",
          },
        ],
      },
      {
        title: "Detail Design",
        description: "",
        items: [
          {
            name: "Piping Plan Dwg., ISO Dwg.",
            description:
              "3D 모델 기반 Plan 도면 및 Isometric 도면 작성. Line Number, Material, Insulation, Testing 정보를 포함한 시공용 ISO 도면 작성.",
          },
          {
            name: "Stress ISO Dwg.",
            description:
              "Stress Analysis 결과를 반영한 ISO 도면 작성. Support 위치, Expansion Joint, Special Item 등 해석 결과 연계 사항 도면 표기.",
          },
          {
            name: "Support Detail Dwg.",
            description:
              "배관 하중 및 설계 조건 고려, 배관 지지대(Support) 구조와 설치 상세 설계, 제작·시공용 도면 작성.",
          },
          {
            name: "Information Dwg. etc",
            description:
              "Line List, Valve List, Material Take-off, Tie-in List 등 배관 설계 부속 문서. 프로젝트 요구에 따른 Information Sheet 및 기타 참조 도면 제공.",
          },
        ],
      },
    ],
    image: serviceBanner("piping.jpg"),
    imageAlt: "Piping Design, P&ID 배관 상세 도면",
  },
  {
    id: "stress",
    title: "Stress Analysis",
    summary: "Thermal Analysis, Special Support, Trouble Shooting",
    intro: [
      "설계 단계 Operating, Transient, Occasional Load Case 검토, 현장 Support 이슈, 진동, Leak 등 긴급 문제 해석 및 대응안 작성. Piping Design 연계 Stress ISO 도면 작성.",
      "국내외 화공, 발전, LNG 프로젝트 High Temperature, High Pressure 배관, Critical Line 해석 경험 보유, Owner, EPC, Contractor 요구 Specification에 맞춘 해석 보고서 작성.",
    ],
    highlights: [
      "Thermal, Sustained, Occasional Load Case 종합 검토",
      "Special Support, Spring Hanger, Expansion Joint 설계",
      "현장 Trouble Shooting 및 긴급 해석 대응",
      "CAESAR II 기반 Stress 해석 및 보고서 작성",
    ],
    sections: [
      {
        title: "Thermal Analysis",
        description: "",
        items: [
          {
            name: "Thermal Analysis",
            description:
              "Operating, Design, Hydro Test, Upset Condition 등 Load Case별 응력, 변위 해석. ASME B31.3/B31.1 기준 Allowable Stress 검토, Nozzle Load Check, Flange Leakage 검토.",
          },
          {
            name: "Load Case Review",
            description:
              "Sustained, Expansion, Occasional(Wind, Seismic, Water Hammer) Load 조합 검토. Support Gap, Cold Spring, Expansion Loop 적정성 평가.",
          },
          {
            name: "Analysis Report",
            description:
              "Stress Mark-up, Support Load Summary, Nozzle Load Table, Critical Line List 등 해석 보고서 및 Piping Design 연계 산출물 제공.",
          },
        ],
      },
      {
        title: "Special Support",
        description: "",
        items: [
          {
            name: "Special Support",
            description:
              "Spring Hanger, Constant Support, Guide, Anchor, Expansion Joint 등 Special Support 선정 및 Detail Design. Manufacturer Catalogue 연계 Custom Support 설계.",
          },
          {
            name: "Support Optimization",
            description:
              "Support 수량, 위치 최적화를 통한 응력, 변위 만족 및 경제성 확보. Existing Plant Tie-in 구간 Support Review.",
          },
        ],
      },
      {
        title: "Trouble Shooting",
        description: "",
        items: [
          {
            name: "Trouble Shooting",
            description:
              "Support Damage, Vibration, Leak, Misalignment 등 현장 이슈 긴급 해석. Root Cause Analysis 및 Retrofit Support 설계, As-built 조건 반영 Re-analysis.",
          },
          {
            name: "Field Supervision",
            description:
              "현장 실측 데이터 반영, Hot/Cold Position Check, Spring Hanger Setting Verification 등 시공, Commissioning 단계 기술 지원.",
          },
        ],
      },
    ],
    image: serviceBanner("stress.jpg"),
    imageAlt: "Stress Analysis, SIGMA 3D Pipe Stress, Thermal 해석",
  },
  {
    id: "cad",
    title: "3D CAD",
    summary: "Modeling, Model Check",
    intro: [
      "Piping, Structure, Equipment, Support, Instrument & Electrical, Duct, HVAC 등 전 공종 3D Modeling.",
      "3D Model 기반 Clash Check 및 Design Review, 설계 오류 사전 검증",
      "Navisworks를 활용한 3D 통합 검토 및 설계 검증",
    ],
    highlights: [],
    platformLogos: [
      {
        src: "/images/services/platforms/hexagon.svg",
        alt: "Hexagon",
      },
      {
        src: "/images/services/platforms/aveva.png",
        alt: "AVEVA",
      },
      {
        src: "/images/services/platforms/autocad-plant3d.svg",
        alt: "AutoCAD Plant 3D",
      },
      {
        src: "/images/services/platforms/revit.svg",
        alt: "Autodesk Revit",
      },
      {
        src: "/images/services/platforms/bentley.svg",
        alt: "Bentley",
      },
    ],
    sections: [
      {
        title: "Modeling",
        description: "",
        items: [
          {
            name: "Equip./Structure",
            description:
              "Pressure Vessel, Heat Exchanger, Pump, Compressor, Steel Structure, Pipe Rack & Shelter 등 Equipment와 Structure Modeling.",
          },
          {
            name: "Piping/Support",
            description:
              "Piping Route, Valve, Flange, In-line Item, Pipe Support 3D Modeling 및 ISO 도면 자동 생성을 위한 Attribute 관리.",
          },
          {
            name: "Instrument & Electrical",
            description:
              "Instrument Item, Cable Way, Tray, Conduit, Junction Box, Panel 등 Instrument 및 Electrical 공종 Item Modeling.",
          },
          {
            name: "Duct/HVAC Etc.",
            description:
              "Duct, HVAC Equipment, Fire Protection, Architectural Element 등 대부분 공종 Item Modeling.",
          },
        ],
      },
      {
        title: "Model Check",
        description: "",
        items: [
          {
            name: "Model 검증",
            description:
              "Design 및 Human Error 검토, 3D Model 정확성, 효율성, 품질 향상.",
          },
          {
            name: "Navisworks 검증",
            description:
              "Hard, Soft, Clearance Check 등 간섭 검토 및 Report 작성. Design Tracking, Model Review 기반 Design과 Model 정확성 및 품질 확인.",
          },
        ],
      },
    ],
    image: serviceBanner("cad.png"),
    imageAlt: "3D CAD, 3D Model, Model Review, Plan/ISO DWG, Report",
  },
  {
    id: "programming",
    title: "설계 IT",
    summary: "Admin, Programming",
    intro: [],
    highlights: [],
    sectionsLayout: "split",
    sections: [
      {
        title: "Admin",
        description: "",
        display: "list",
        items: [
          { name: "Project Setup", description: "" },
          { name: "Specification & Catalogue", description: "" },
          {
            name: "제출 성과품 및 Inform을 위한 Setting",
            description: "",
          },
          { name: "Trouble Shooting", description: "" },
          { name: "모든 3D Model Platform 가능", description: "" },
        ],
      },
      {
        title: "Programming",
        description: "",
        display: "list",
        items: [
          {
            name: "3D Modeling 관련 Application Program",
            description: "",
          },
          {
            name: "3D 검토 및 성과품 관련 Utility Program",
            description: "",
          },
          {
            name: "P&ID와 3D 간 정합성 Check Program",
            description: "",
          },
          {
            name: "3D Admin 관련 Application Program",
            description: "",
          },
          { name: "경영관리 지원 Program", description: "" },
        ],
      },
      {
        title: "Admin",
        description: "",
        items: [
          {
            name: "Project Setup",
            description:
              "Project의 모든 특성과 조건 고려, 프로젝트 생성, ISO, PLAN, Support Drawing Setting.",
          },
          {
            name: "Specification & Catalogue",
            description:
              "PMS 기반 전 공정 Specification 작성, Vendor Print 내용과 형상 기반 Catalogue 생성. Modeling 관련 Error 및 Trouble 해결.",
          },
        ],
      },
      {
        title: "Programming",
        description: "",
        display: "featured",
        items: [
          {
            name: "MaxskillWorkPro",
            description:
              "3D 작업의 통일성과 정확성 향상, 작업시간 단축, 전체적인 Project 품질 향상을 위한 3D 통합 Add-in 프로그램.",
          },
          {
            name: "P&ID",
            description:
              "P&ID로 부터 Piping BM 추출, 3D 모델 간 Line List, Valve, Instrument, Equipment Tag 적합성 검토. P&ID로 부터 추출한 BM Update 연동 Validation Check 기능.",
          },
        ],
      },
    ],
    image: serviceBanner("programming.jpg"),
    imageAlt: "설계 IT, Programming",
  },
];

export function getServiceCardItems(service: Service) {
  if (service.highlights.length > 0) {
    return service.highlights.slice(0, 3);
  }
  const titles = service.sections
    .filter(
      (section) =>
        service.sectionsLayout !== "split" || section.display === "list",
    )
    .map((section) => section.title);
  return titles.filter((title, index) => titles.indexOf(title) === index).slice(0, 3);
}
