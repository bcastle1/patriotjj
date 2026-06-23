-- Optional Supabase table for PatriotJJ parent-agent leads.
-- Apply only through the approved GitHub/Vercel deployment path.

create table if not exists public.parent_agent_leads (
  id uuid primary key default gen_random_uuid(),
  external_id text unique,
  source text not null default 'site-parent-agent',
  intent text not null default 'trial_class',
  parent_name text,
  parent_email text,
  parent_phone text,
  student_name text,
  student_age integer,
  grade text,
  experience_level text,
  goals text,
  preferred_trial_date date,
  preferred_trial_time text,
  safety_notes text,
  notes text,
  recommendation text,
  lead_score integer not null default 40,
  follow_up_status text not null default 'needs_confirmation',
  registration_status text not null default 'lead',
  raw_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists parent_agent_leads_created_at_idx
  on public.parent_agent_leads (created_at desc);

create index if not exists parent_agent_leads_follow_up_idx
  on public.parent_agent_leads (follow_up_status, registration_status);

create index if not exists parent_agent_leads_contact_idx
  on public.parent_agent_leads (parent_email, parent_phone);
