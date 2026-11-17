import postgres from "postgres";

type SqlClient = ReturnType<typeof postgres>;

const globalForDb = globalThis as typeof globalThis & {
  maxskillSql?: SqlClient;
};

export function hasDatabaseConfig() {
  return Boolean(process.env.DATABASE_URL?.trim());
}

export function getSql(): SqlClient {
  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!globalForDb.maxskillSql) {
    globalForDb.maxskillSql = postgres(databaseUrl, {
      ssl: "require",
      max: 5,
      idle_timeout: 20,
      connect_timeout: 10,
    });
  }

  return globalForDb.maxskillSql;
}
