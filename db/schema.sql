CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  login_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  position TEXT,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'employee'
    CHECK (role IN ('employee', 'admin')),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS position TEXT;

CREATE INDEX IF NOT EXISTS users_active_login_idx
  ON users (login_id)
  WHERE active = TRUE;

CREATE UNIQUE INDEX IF NOT EXISTS users_login_id_lower_idx
  ON users (LOWER(login_id));

CREATE TABLE IF NOT EXISTS job_postings (
  id BIGSERIAL PRIMARY KEY,
  posted_at DATE NOT NULL,
  title TEXT NOT NULL,
  period_start DATE,
  period_end DATE,
  status TEXT NOT NULL DEFAULT '진행중'
    CHECK (status IN ('진행중', '마감')),
  content JSONB NOT NULL DEFAULT '[]'::JSONB,
  hire_type TEXT,
  experience TEXT,
  education TEXT,
  field TEXT,
  duty TEXT,
  qualification TEXT,
  headcount TEXT,
  common_qualifications JSONB NOT NULL DEFAULT '[]'::JSONB,
  process JSONB NOT NULL DEFAULT '[]'::JSONB,
  apply_method JSONB NOT NULL DEFAULT '[]'::JSONB,
  notes JSONB NOT NULL DEFAULT '[]'::JSONB,
  contact_name TEXT,
  contact_dept TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS job_postings_public_idx
  ON job_postings (published, posted_at DESC);

CREATE TABLE IF NOT EXISTS project_references (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  client TEXT NOT NULL,
  category TEXT NOT NULL
    CHECK (category IN ('화공', '발전', 'LNG', '산업설비')),
  project_year INTEGER NOT NULL DEFAULT 0
    CHECK (project_year BETWEEN 0 AND 2100),
  location TEXT NOT NULL,
  service TEXT,
  tool TEXT,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS project_references_public_idx
  ON project_references (published, category, project_year DESC, id DESC);

CREATE TABLE IF NOT EXISTS company_metrics (
  id SMALLINT PRIMARY KEY DEFAULT 1
    CHECK (id = 1),
  revenue TEXT NOT NULL,
  headcount TEXT NOT NULL,
  updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO company_metrics (id, revenue, headcount)
VALUES (1, '45억원', '60명')
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS login_attempts (
  attempt_key TEXT PRIMARY KEY,
  failed_count INTEGER NOT NULL DEFAULT 0,
  blocked_until TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
