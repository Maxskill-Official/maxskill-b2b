import { z } from "zod";

const optionalText = z.string().trim().max(2000).optional().default("");
const textList = z.array(z.string().trim().max(2000)).max(50).default([]);
const dateText = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/);

export const jobPostingInputSchema = z
  .object({
    postedAt: dateText,
    title: z.string().trim().min(1).max(200),
    periodStart: z.union([dateText, z.literal("")]).default(""),
    periodEnd: z.union([dateText, z.literal("")]).default(""),
    status: z.enum(["진행중", "마감"]).default("진행중"),
    content: textList,
    hireType: optionalText,
    experience: optionalText,
    education: optionalText,
    field: optionalText,
    duty: optionalText,
    qualification: optionalText,
    headcount: optionalText,
    commonQualifications: textList,
    process: textList,
    applyMethod: textList,
    notes: textList,
    contactName: optionalText,
    contactDept: optionalText,
    contactPhone: optionalText,
    contactEmail: z
      .union([z.string().trim().email().max(200), z.literal("")])
      .default(""),
    published: z.boolean().default(true),
  })
  .refine(
    (value) =>
      !value.periodStart ||
      !value.periodEnd ||
      value.periodStart <= value.periodEnd,
    {
      message: "접수 종료일은 시작일 이후여야 합니다.",
      path: ["periodEnd"],
    },
  );

export type JobPostingInput = z.infer<typeof jobPostingInputSchema>;
