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
      "Planning 단계에서는 WBS, 마일스톤 기반 일정 수립과 Mechanical, Instrument, Electrical, Civil 등 유관 공종 간 인터페이스를 조율합니다. Basic Design에서는 Plot Plan을 통해 배관 라우팅, 설비 배치를 작성하고, Detail Design에서는 3D Plan/ISO, Stress ISO, Support Detail, Information 도면을 제공합니다.",
      "국내외 대형 EPC 프로젝트의 배관 설계를 수행합니다.",
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
        description:
          "프로젝트 착수 초기부터 설계 일정, 공정, 협업 체계를 수립하여 이후 설계 단계의 품질과 납기를 확보합니다.",
        items: [
          {
            name: "Project Scheduling",
            description:
              "설계 WBS에 의한 배관설계 마일스톤, M/H 산출 및 일정 관리를 수행합니다.",
          },
          {
            name: "Coordination",
            description:
              "Mechanical, Instrument, Electrical, Civil, HVAC 등 타 공종과의 인터페이스 조율. 3D 모델, P&ID, Plot Plan 간 정합성 검토 및 설계 변경 사항 공유 체계를 운영합니다.",
          },
        ],
      },
      {
        title: "Basic Design",
        description:
          "플랜트 전체 배관, 설비 배치의 기본 골격을 확정하는 단계로, 이후 Detail Design의 기준이 됩니다.",
        items: [
          {
            name: "Plot Plan",
            description:
              "Equipment, Structure, Pipe Rack, Utility, Roadway 등을 반영한 설비 배치도, Pipe Routing, Valve Access, Maintenance Space를 반영한 배치안을 작성합니다.",
          },
        ],
      },
      {
        title: "Detail Design",
        description:
          "현장 시공, Stress Analysis,3D 모델링에 직접 연계되는 상세 설계 도면을 작성합니다.",
        items: [
          {
            name: "3D Plan Dwg., ISO Dwg.",
            description:
              "3D 모델 기반 Plan 도면 및 Isometric 도면 작성. Line Number, Material, Insulation, Testing 정보를 포함한 시공용 ISO 도면을 제공합니다.",
          },
          {
            name: "Stress ISO Dwg.",
            description:
              "Stress Analysis 결과를 반영한 ISO 도면 작성. Support 위치, Expansion Joint, Special Item 등 해석 결과 연계 사항을 도면에 명확히 표기합니다.",
          },
          {
            name: "Support Detail Dwg.",
            description:
              "Pipe Support, Guide, Anchor, Spring Hanger 등 지지대 상세 도면. Standard Support 및 Special Support 설계를 포함합니다.",
          },
          {
            name: "Information Dwg. etc",
            description:
              "Line List, Valve List, Material Take-off, Tie-in List 등 배관 설계 부속 문서. 프로젝트 요구에 따른 Information Sheet 및 기타 참조 도면을 제공합니다.",
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
    summary:
      "Thermal Analysis, Special Support, Trouble Shooting, 배관 응력 해석",
    intro: [
      "설계 단계에서 Operating, Transient, Occasional Load Case를 검토하고, 현장에서 발생하는 Support 이슈, 진동, Leak 등 긴급 문제에 대한 해석, 대응안을 작성합니다. Piping Design과 연계하여 Stress ISO 도면을 작성합니다.",
      "국내외 화공, 발전, LNG 프로젝트에서 High Temperature, High Pressure 배관, Critical Line에 대한 해석 경험을 보유하고 있으며, Owner, EPC, Contractor 요구 Specification에 맞춘 해석 보고서를 작성합니다.",
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
        description:
          "온도 변화에 따른 배관 관련 열팽창, 응력, 변위를 해석하여 안전한 배관 설계를 지원합니다.",
        items: [
          {
            name: "Thermal Analysis",
            description:
              "Operating, Design, Hydro Test, Upset Condition 등 Load Case별 응력, 변위 해석. ASME B31.3/B31.1 기준 Allowable Stress 검토, Nozzle Load Check, Flange Leakage 검토를 수행합니다.",
          },
          {
            name: "Load Case Review",
            description:
              "Sustained, Expansion, Occasional(Wind, Seismic, Water Hammer) Load 조합 검토. Support Gap, Cold Spring, Expansion Loop 적정성 평가를 수행합니다.",
          },
          {
            name: "Analysis Report",
            description:
              "Stress Mark-up, Support Load Summary, Nozzle Load Table, Critical Line List 등 해석 보고서 및 Piping Design 연계 산출물을 제공합니다.",
          },
        ],
      },
      {
        title: "Special Support",
        description:
          "일반 Standard Support로 해결되지 않는 구간에 대한 특수 지지대, Spring Hanger 설계를 수행합니다.",
        items: [
          {
            name: "Special Support",
            description:
              "Spring Hanger, Constant Support, Guide, Anchor, Expansion Joint 등 Special Support 선정 및 Detail Design. Manufacturer Catalogue와 연계하여 Custom Support를 설계합니다.",
          },
          {
            name: "Support Optimization",
            description:
              "Support 수량, 위치 최적화를 통한 응력, 변위 만족 및 경제성 확보. Existing Plant Tie-in 구간 Support Review를 수행합니다.",
          },
        ],
      },
      {
        title: "Trouble Shooting",
        description:
          "시공, 운전 중 발생하는 배관 관련 이슈에 대한 원인 분석과 대응안을 작성합니다.",
        items: [
          {
            name: "Trouble Shooting",
            description:
              "Support Damage, Vibration, Leak, Misalignment 등 현장 이슈 긴급 해석. Root Cause Analysis 및 Retrofit Support 설계, As-built 조건 반영 Re-analysis를 수행합니다.",
          },
          {
            name: "Field Support",
            description:
              "현장 실측 데이터 반영, Hot/Cold Position Check, Spring Hanger Setting Verification 등 시공, Commissioning 단계 기술을 지원합니다.",
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
    summary:
      "설계의 모든 과정을 3D CAD 기반으로 수행하여 정확성, 효율성, 품질을 향상",
    intro: [
      "Piping, Structure, Equipment, Support, Instrument & Electrical, Duct, HVAC 등 전 공종을 3D Model",
      "3D Model 기반으로 Clash Check 및 Design Review를 수행하여 설계 오류를 사전에 검증",
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
        description:
          "Piping, Structure, Equipment, Support, Instrument & Electrical, Duct, HVAC 등 전 공종을 3D Model",
        items: [
          {
            name: "Equip./Structure",
            description:
              "Pressure Vessel, Heat Exchanger, Pump, Compressor, Steel Structure, Pipe Rack 등 Equipment, Structure 3D 모델링.",
          },
          {
            name: "Piping/Support",
            description:
              "Piping Route, Valve, Flange, In-line Item, Pipe Support 3D 모델링. ISO 도면 자동 생성을 위한 Attribute 관리.",
          },
          {
            name: "Instrument & Elec.",
            description:
              "Instrument, Cable Tray, Conduit, Junction Box, Panel 등 Instrument, Electrical 3D 모델링.",
          },
          {
            name: "Duct/HVAC Etc.",
            description:
              "Duct, HVAC Equipment, Fire Protection, Architectural Element 등 부 공종 3D 모델링.",
          },
        ],
      },
      {
        title: "Model Check",
        description:
          "3D Model 기반으로 Clash Check 및 Design Review를 수행하여 설계 오류를 사전에 검증하고, Navisworks를 활용한 3D 통합 검토 및 설계 검증을 수행합니다.",
        items: [
          {
            name: "Model 검증",
            description:
              "Design 및 Human Error 검토하여 3D Model의 정확성, 효율성, 품질을 향상합니다.",
          },
          {
            name: "Navisworks 검증",
            description:
              "Hard, Soft, Clearance Check 등 간섭 검토 및 Report 작성. Design Tracking, Model Review로 Design과 Model의 정확성 및 품질을 검토합니다.",
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
    summary: "Admin, Program",
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
        title: "Program",
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
              "Project의 모든 특성과 조건을 고려하여 프로젝트를 생성하고, ISO, PLAN, Support Drawing의 Setting 작업을 수행합니다. Modeling 관련 Error 및 Trouble을 해결합니다.",
          },
          {
            name: "Specification & Catalogue",
            description:
              "PMS를 기반으로 전 공정의 Specification을 작성하고, Vendor Print의 내용과 형상을 기반으로 Catalogue를 생성합니다.",
          },
        ],
      },
      {
        title: "Program",
        description: "",
        display: "featured",
        items: [
          {
            name: "Customizing",
            description:
              "S3D, E3D, AutoCAD, Excel/VBA 등 플랫폼 기반 Custom Macro, Report, Interface 개발. 프로젝트 Standard, Template, Check List 자동화와 Line List, 3D Model, ISO/BOM 자동 생성 Workflow를 지원합니다.",
          },
          {
            name: "3D Total Application",
            description:
              "3D 작업의 통일성과 정확성을 높이고 작업시간을 단축하여, 전체적인 Project 품질 향상을 목적으로 개발된 3D 통합 Add-in 프로그램입니다.",
          },
          {
            name: "P&ID",
            description:
              "P&ID와 3D 모델 간 Line Number, Valve, Instrument, Equipment Tag 정합성 검토 기준 설정. P&ID Update 연동 Admin.",
          },
        ],
      },
    ],
    image: serviceBanner("programming.jpg"),
    imageAlt: "설계 IT, Program",
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
