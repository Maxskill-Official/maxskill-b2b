export const careersBannerText =
  "맥스킬에서는 함께 할 유능한 인재를 찾고 있습니다.";

/** 채용 상세에서 이력서 양식을 받을 때 쓰는 주소 */
export const resumeTemplateHref = "/api/resume-template";
export const resumeTemplateDownloadName = "(주)맥스킬 이력서 양식.xlsx";

export const salarySystemIntro =
  "당사는 전직원에게 연봉제를 실시하고 있습니다.";

export interface SalaryTableRow {
  label: string;
  items: string[];
}

export interface SalaryTableGroup {
  category: string;
  rows: SalaryTableRow[];
}

export const salaryTable: SalaryTableGroup[] = [
  {
    category: "연봉",
    rows: [
      {
        label: "월급여",
        items: [
          "기본급 (직급별 표준 금액)",
          "능력급 (기준능력급 + 개인별 능력 가감급)",
          "조정급 (직급별 표준 금액)",
        ],
      },
      {
        label: "설날/추석 상여 (200%)",
        items: [],
      },
    ],
  },
  {
    category: "성과급",
    rows: [
      {
        label: "집단 성과급 (P.I + P.S)",
        items: [],
      },
      {
        label: "생산성 격려금",
        items: ["경영목표 달성도에 따라 반기별로 지급"],
      },
      {
        label: "이익 배분 제도",
        items: [
          "경영 성과를 EVA라는 지표를 통해 평가하여 지급 (지급시기 : 년1회)",
        ],
      },
    ],
  },
];

export const employeeBenefits = [
  "노사협의회 운영",
  "취미활동 지원 (축구, 스포츠, 사진 등)",
  "건강검진",
  "자녀 학자금 (고등학교, 대학교)",
  "5일 근무제",
  "마일리지 제도 (구내식당형)",
  "개인형 퇴직연금",
];

export type JobPostingStatus = "진행중" | "마감";

export interface JobPosting {
  id: number;
  postedAt: string;
  title: string;
  period: string;
  periodStart?: string;
  periodEnd?: string;
  status: JobPostingStatus;
  content: string[];
  hireType?: string;
  experience?: string;
  education?: string;
  field?: string;
  duty?: string;
  qualification?: string;
  headcount?: string;
  commonQualifications?: string[];
  process?: string[];
  applyMethod?: string[];
  notes?: string[];
  contactName?: string;
  contactDept?: string;
  contactPhone?: string;
  contactEmail?: string;
}
