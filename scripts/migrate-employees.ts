import bcrypt from "bcryptjs";
import sqlServer from "mssql";
import postgres from "postgres";

const requiredEnv = (name: string) => {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required.`);
  return value;
};

const databaseUrl = requiredEnv("DATABASE_URL");
const adminNames = new Set(["이금선", "박종현", "박경화"]);

async function main() {
  const source = await sqlServer.connect({
    server: requiredEnv("SOURCE_SQL_SERVER"),
    database: process.env.SOURCE_SQL_DATABASE?.trim() || "PJ_OT_DB",
    user: requiredEnv("SOURCE_SQL_USER"),
    password: requiredEnv("SOURCE_SQL_PASSWORD"),
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
  });

  const target = postgres(databaseUrl, { ssl: "require", max: 1 });

  try {
    const result = await source.request().query<{
      emp_id: string;
      emp_kor_nm: string;
      emp_pw: string;
    }>(`
    SELECT
      LTRIM(RTRIM(emp_id)) AS emp_id,
      LTRIM(RTRIM(emp_kor_nm)) AS emp_kor_nm,
      LTRIM(RTRIM(emp_pw)) AS emp_pw
    FROM dbo.PJ_EMPLOYEE
    WHERE ISNULL(retire_at, N'N') = N'N'
      AND NULLIF(LTRIM(RTRIM(emp_id)), N'') IS NOT NULL
      AND NULLIF(LTRIM(RTRIM(emp_pw)), N'') IS NOT NULL
  `);

    const adminMatches = new Map<string, number>();
    adminNames.forEach((name) => adminMatches.set(name, 0));

    for (const employee of result.recordset) {
      if (adminNames.has(employee.emp_kor_nm)) {
        adminMatches.set(
          employee.emp_kor_nm,
          (adminMatches.get(employee.emp_kor_nm) ?? 0) + 1,
        );
      }
    }

    const invalidAdmins = Array.from(adminMatches).filter(
      ([, count]) => count !== 1,
    );
    if (invalidAdmins.length > 0) {
      throw new Error(
        `Admin lookup must return exactly one active account each: ${invalidAdmins
          .map(([name, count]) => `${name}=${count}`)
          .join(", ")}`,
      );
    }

    await target.begin(async (tx) => {
      for (const employee of result.recordset) {
        const passwordHash = await bcrypt.hash(employee.emp_pw, 12);
        const role = adminNames.has(employee.emp_kor_nm) ? "admin" : "employee";

        await tx`
        INSERT INTO users (login_id, name, password_hash, role, active, updated_at)
        VALUES (
          ${employee.emp_id},
          ${employee.emp_kor_nm},
          ${passwordHash},
          ${role},
          TRUE,
          NOW()
        )
        ON CONFLICT (login_id) DO UPDATE SET
          name = EXCLUDED.name,
          password_hash = EXCLUDED.password_hash,
          role = EXCLUDED.role,
          active = TRUE,
          updated_at = NOW()
        `;
      }
    });

    console.log(
      `Migrated ${result.recordset.length} active accounts; ${adminNames.size} admins assigned.`,
    );
  } finally {
    await source.close();
    await target.end();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
