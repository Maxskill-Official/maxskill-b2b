from __future__ import annotations

import json
import re
import sys
from pathlib import Path

from openpyxl import load_workbook


CATEGORIES = ("화공", "발전", "LNG", "산업설비")


def text(value: object) -> str:
    return str(value or "").strip()


def contract_year(value: object) -> int:
    match = re.match(r"(\d{4})", text(value))
    if not match:
        raise ValueError(f"계약일에서 연도를 읽을 수 없습니다: {value!r}")
    return int(match.group(1))


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit(
            "사용법: python scripts/import-projects-xlsx.py <원본.xlsx> <출력.json>"
        )

    source = Path(sys.argv[1])
    output = Path(sys.argv[2])
    workbook = load_workbook(source, data_only=True)
    projects: list[dict[str, object]] = []

    for category in CATEGORIES:
        sheet = workbook[category]
        category_projects: list[dict[str, object]] = []
        for row in range(4, sheet.max_row + 1):
            if sheet.cell(row, 2).value is None or not sheet.cell(row, 3).value:
                continue
            category_projects.append(
                {
                    "name": text(sheet.cell(row, 3).value),
                    "client": text(sheet.cell(row, 4).value),
                    "category": category,
                    "year": contract_year(sheet.cell(row, 8).value),
                    "location": text(sheet.cell(row, 9).value),
                    "service": text(sheet.cell(row, 10).value),
                    "tool": text(sheet.cell(row, 11).value),
                }
            )

        category_projects.sort(key=lambda project: int(project["year"]), reverse=True)
        projects.extend(category_projects)

    for project_id, project in enumerate(projects, start=1):
        project["id"] = project_id

    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(
        json.dumps(projects, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Imported {len(projects)} project references.")


if __name__ == "__main__":
    main()
