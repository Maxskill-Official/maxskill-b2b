export function getServiceItemImageKey(serviceId: string, itemName: string) {
  return `${serviceId}/${itemName}`;
}

const ITEMS_BASE = "/images/services/items";

function itemImage(
  filename: string,
  alt: string,
  imageClass?: string,
  imageContainerClass?: string,
  imageBodyClass?: string,
  unoptimized?: boolean,
) {
  return {
    src: `${ITEMS_BASE}/${filename}`,
    alt,
    filename,
    imageClass,
    imageContainerClass,
    imageBodyClass,
    unoptimized,
  };
}

/** 로컬 public/images/services/items/ 파일. GitHub에서 같은 이름으로 교체 가능 */
export const serviceItemImages: Record<
  string,
  {
    src: string;
    alt: string;
    filename: string;
    imageClass?: string;
    imageContainerClass?: string;
    imageBodyClass?: string;
    unoptimized?: boolean;
    intrinsic?: boolean;
  }
> = {
  // ── Piping Design ──
  "piping/Project Scheduling": itemImage(
    "piping-project-scheduling.jpg",
    "E3D Pipe Rack Top View, WBS, 일정 계획용 전체 배관 레이아웃",
    "object-cover object-center",
  ),
  "piping/Coordination": itemImage(
    "piping-coordination.jpg",
    "E3D Clash Check, 다공종 Coordination, 간섭 검토",
    "object-cover object-center",
  ),
  "piping/Plot Plan": itemImage(
    "piping-plot-plan.jpg",
    "E3D Plant Model, 설비, 구조, 배관 Plot Plan 배치",
    "object-cover object-center",
  ),
  "piping/3D Plan Dwg., ISO Dwg.": itemImage(
    "piping-iso-dwg.jpg",
    "CAESAR II Isometric, 시공용 ISO 도면, Support, 치수",
    "object-cover object-center",
    "relative h-56 overflow-hidden bg-white sm:h-64",
  ),
  "piping/Stress ISO Dwg.": itemImage(
    "piping-stress-iso.jpg",
    "CAESAR II Stress ISO, Support, Node, Elevation 표기",
    "object-cover object-center",
    "relative h-56 overflow-hidden bg-white sm:h-64",
  ),
  "piping/Support Detail Dwg.": itemImage(
    "piping-support-detail.jpg",
    "Support Detail Drawing, LOOKING EAST, Section, Base Plate",
    "object-cover object-center",
    "relative h-56 overflow-hidden bg-black sm:h-64",
  ),
  "piping/Information Dwg. etc": itemImage(
    "piping-information-dwg.jpg",
    "Stress List, Line No, ISO Dwg No 등 Information Sheet",
    "object-contain object-center",
    "relative h-72 overflow-hidden bg-white sm:h-80",
    undefined,
    true,
  ),

  // ── Stress Analysis ──
  "stress/Thermal Analysis": itemImage(
    "stress-thermal-analysis.jpg",
    "CAESAR II, Thermal Load Case, Allowable Stress 해석",
    "object-cover object-[42%_50%]",
  ),
  "stress/Load Case Review": itemImage(
    "stress-load-case.jpg",
    "Static Analysis Load Case Editor, 온도, Load 조합 검토",
    "object-cover object-[40%_12%]",
  ),
  "stress/Analysis Report": itemImage(
    "stress-analysis-report.jpg",
    "Code Stress by Percent, 해석 결과 3D 시각화",
    "object-cover object-[35%_50%]",
  ),
  "stress/Special Support": itemImage(
    "stress-special-support.jpg",
    "Special Support Detail Drawing",
    "object-cover object-center",
  ),
  "stress/Support Optimization": itemImage(
    "stress-support-optimization.jpg",
    "E3D 3D Plant Model, Support 위치, 최적화 Review",
    "object-cover object-center",
  ),
  "stress/Trouble Shooting": itemImage(
    "stress-trouble-shooting.jpg",
    "Expansion Joint 현장 Damage, Trouble Shooting",
    "object-cover object-center",
    "relative h-56 overflow-hidden bg-white sm:h-64",
  ),
  "stress/Field Support": itemImage(
    "stress-field-support.jpg",
    "Support Detail Drawing, Field Support, Spring Hanger Setting",
    "object-cover object-center",
    "relative h-56 overflow-hidden bg-white sm:h-64",
  ),

  // ── 3D CAD ──
  "programming/Project Setup": itemImage(
    "cad-s3d-admin.jpg",
    "Project Setup, 3D 모델, 도면 검토 및 원격 협업",
    "object-cover object-center",
  ),
  "programming/Specification & Catalogue": itemImage(
    "cad-spec-cata.jpg",
    "Specification & Catalogue, Catalog, Component Parameter 설정",
    "object-cover object-center",
    "relative h-56 overflow-hidden bg-white sm:h-64",
  ),
  "programming/Customizing": itemImage(
    "programming-customizing.png",
    "Customizing, S3D, E3D, AutoCAD Auto Generation Workflow",
    "object-contain object-center",
    "relative h-56 overflow-hidden bg-brand-dark sm:h-64",
  ),
  "programming/3D Total Application": {
    src: "/images/services/maxskill-workpro.png",
    alt: "3D Total Application, MaxskillWorkPro",
    filename: "maxskill-workpro.png",
    intrinsic: true,
  },
  "programming/P&ID": itemImage(
    "cad-pid-admin.jpg",
    "P&ID, P&ID와 3D 정합성 검토",
    "object-cover object-center",
  ),
  "cad/Equip./Structure": itemImage(
    "cad-equip-structure.jpg",
    "Equipment, Structure 3D Modeling, Vessel, Pipe Rack",
    "object-cover object-center",
  ),
  "cad/Piping/Support": itemImage(
    "cad-piping-support.jpg",
    "Piping, Support 3D Modeling",
    "object-cover object-center",
  ),
  "cad/Instrument & Elec.": itemImage(
    "cad-instrument-elec.jpg",
    "Instrument, Electrical 3D Modeling, Cable Tray",
    "object-cover object-center",
  ),
  "cad/Duct/HVAC Etc.": itemImage(
    "cad-duct-hvac.jpg",
    "Duct, HVAC 3D Modeling",
    "object-cover object-center",
  ),
  "cad/Model 검증": itemImage(
    "cad-clash-check.jpg",
    "Model 검증, 배관, 구조물 Hard Clash 검출",
  ),
  "cad/3D Product Line Check": itemImage(
    "cad-product-line-check.jpg",
    "3D Product Line Check",
  ),
  "cad/Maintenance, Operability, Safety Check": itemImage(
    "cad-mos-check.jpg",
    "LNG, 플랜트 MOS Review",
  ),
  "cad/P&ID Check": itemImage(
    "cad-pid-check.jpg",
    "P&ID Check 3D 모델 정합성",
  ),
  "cad/3D Animation & Plant Imaging": itemImage(
    "cad-plant-imaging.jpg",
    "3D Animation 및 Plant Imaging",
  ),
  "cad/Management Program, BOM, ISO DWG.": itemImage(
    "cad-bom-iso.jpg",
    "BOM, ISO 도면 자동 생성 Management",
  ),
  "cad/Navisworks 검증": itemImage(
    "cad-3rd-party.jpg",
    "Navisworks 검증, E3D, Tekla, IFC 등 멀티 디시플린 3D 모델 통합 리뷰",
    "object-cover object-[50%_38%]",
  ),

};

export function getServiceItemImage(serviceId: string, itemName: string) {
  return serviceItemImages[getServiceItemImageKey(serviceId, itemName)];
}

/** Verify no duplicate filenames at build time */
const filenames = Object.values(serviceItemImages).map((item) => item.filename);
if (new Set(filenames).size !== filenames.length) {
  throw new Error("Duplicate service item image filenames");
}
