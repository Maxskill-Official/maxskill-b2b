import type { Project, ProjectCategory } from "@/data/projects";

const CATEGORIES: ProjectCategory[] = ["화공", "발전", "LNG", "산업설비"];

const HEADER_ALIASES: Record<string, keyof RowFields> = {
  name: "name",
  프로젝트: "name",
  client: "client",
  원도급사: "client",
  발주처: "client",
  category: "category",
  분야: "category",
  "화공/발전/lng": "category",
  "화공/발전/LNG": "category",
  year: "year",
  location: "location",
  service: "service",
  tool: "tool",
};

interface RowFields {
  name: string;
  client: string;
  category: string;
  year: string;
  location: string;
  service: string;
  tool: string;
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(cell.trim());
      cell = "";
    } else if (char === "\n" || (char === "\r" && text[i + 1] === "\n")) {
      row.push(cell.trim());
      if (row.some((value) => value.length > 0)) {
        rows.push(row);
      }
      row = [];
      cell = "";
      if (char === "\r") i++;
    } else {
      cell += char;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell.trim());
    if (row.some((value) => value.length > 0)) {
      rows.push(row);
    }
  }

  return rows;
}

function normalizeCategory(value: string): ProjectCategory | null {
  const trimmed = value.trim();
  if (trimmed === "Gas/LNG" || trimmed.toLowerCase() === "gas/lng") {
    return "LNG";
  }
  return CATEGORIES.includes(trimmed as ProjectCategory)
    ? (trimmed as ProjectCategory)
    : null;
}

function isHeaderRow(cells: string[]): boolean {
  const joined = cells.join(" ").toLowerCase();
  return (
    joined.includes("프로젝트") ||
    joined.includes("원도급") ||
    joined.includes("발주처") ||
    cells.some((cell) => HEADER_ALIASES[cell.trim().toLowerCase()] !== undefined)
  );
}

function mapRow(
  cells: string[],
  columnMap: (keyof RowFields | null)[],
): Project | null {
  const fields: Partial<RowFields> = {};

  columnMap.forEach((key, index) => {
    if (!key) return;

    const value = cells[index]?.trim() ?? "";
    if (!value && fields[key]) return;

    fields[key] = value;
  });

  const name = fields.name?.trim();
  const category = normalizeCategory(fields.category ?? "");

  if (!name || !category) return null;

  const year = Number.parseInt(fields.year ?? "", 10);
  if (!Number.isFinite(year)) return null;

  const client = fields.client?.trim() || "-";

  return {
    id: 0,
    name,
    client: client.toUpperCase() === "SAMSUNG S&T" ? "삼성물산(주)" : client,
    category,
    year,
    location: fields.location?.trim() || "-",
    service: fields.service?.trim() || undefined,
    tool: fields.tool?.trim() || undefined,
  };
}

function buildColumnMap(headerRow: string[]): (keyof RowFields | null)[] {
  return headerRow.map((cell) => {
    const key = HEADER_ALIASES[cell.trim().toLowerCase()];
    return key ?? null;
  });
}

export async function fetchProjectsFromGoogleSheet(
  csvUrl: string,
): Promise<Project[]> {
  const response = await fetch(csvUrl, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Google Sheet CSV fetch failed: ${response.status}`);
  }

  const text = await response.text();
  const rows = parseCsv(text);

  if (rows.length === 0) return [];

  const hasHeader = isHeaderRow(rows[0]);
  const dataRows = hasHeader ? rows.slice(1) : rows;
  const columnMap: (keyof RowFields | null)[] = hasHeader
    ? buildColumnMap(rows[0])
    : ["name", "client", "category", "year", "location", "service", "tool"];

  const projects = dataRows
    .map((cells) => mapRow(cells, columnMap))
    .filter((project): project is Project => project !== null)
    .map((project, index) => ({ ...project, id: index + 1 }));

  return projects;
}
