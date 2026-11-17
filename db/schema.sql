CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  login_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'employee'
    CHECK (role IN ('employee', 'admin')),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

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

CREATE TABLE IF NOT EXISTS login_attempts (
  attempt_key TEXT PRIMARY KEY,
  failed_count INTEGER NOT NULL DEFAULT 0,
  blocked_until TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
