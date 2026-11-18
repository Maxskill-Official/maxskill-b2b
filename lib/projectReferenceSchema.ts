import { z } from "zod";

export const projectReferenceInputSchema = z.object({
  name: z.string().trim().min(1, "프로젝트명을 입력해 주세요.").max(300),
  client: z.string().trim().min(1, "발주처를 입력해 주세요.").max(200),
  category: z.enum(["화공", "발전", "LNG", "산업설비"]),
  year: z.coerce.number().int().min(0).max(2100),
  location: z.string().trim().min(1, "지역을 입력해 주세요.").max(200),
  service: z.string().trim().max(100).default(""),
  tool: z.string().trim().max(100).default(""),
  published: z.boolean().default(true),
});

export type ProjectReferenceInput = z.infer<
  typeof projectReferenceInputSchema
>;
