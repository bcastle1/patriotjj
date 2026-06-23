const DEFAULT_ALLOWED_ORIGINS = "https://patriotjj.com,https://www.patriotjj.com";

module.exports = async function parentAgentLead(req, res) {
  setCors(req, res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }

  try {
    const body = await readJsonBody(req);
    const lead = normalizeLead(body.lead || body);
    validateLead(lead);

    const crmResult = await saveLeadToSupabase(lead);
    const staffResult = await notifyStaff(lead, crmResult.id);
    const parentResult = await sendParentConfirmation(lead);

    res.status(200).json({
      ok: true,
      leadId: crmResult.id || lead.id,
      crmSaved: crmResult.saved,
      notificationSent: staffResult.sent,
      parentConfirmationSent: parentResult.sent,
      schedulingUrl: clean(process.env.PARENT_AGENT_SCHEDULING_URL || process.env.CALENDLY_EVENT_TYPE_URL)
    });
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({
      ok: false,
      error: error.code || "parent_agent_lead_failed",
      message: status >= 500 ? "Lead could not be processed." : error.message
    });
  }
};

function setCors(req, res) {
  const allowedOrigins = new Set(
    clean(process.env.PARENT_AGENT_ALLOWED_ORIGINS || DEFAULT_ALLOWED_ORIGINS)
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean)
  );
  const origin = req.headers.origin;
  if (origin && allowedOrigins.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");

  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 64 * 1024) {
      const error = new Error("Request body is too large.");
      error.statusCode = 413;
      error.code = "request_too_large";
      throw error;
    }
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

function normalizeLead(input = {}) {
  return {
    id: limit(input.id, 120) || `lead-${Date.now()}`,
    createdAt: input.createdAt || new Date().toISOString(),
    source: limit(input.source, 120) || "botpress-parent-agent",
    intent: limit(input.intent, 80) || "trial_class",
    parentName: limit(input.parentName, 160),
    parentEmail: limit(input.parentEmail, 180).toLowerCase(),
    parentPhone: limit(input.parentPhone, 60),
    studentName: limit(input.studentName, 160),
    studentAge: limit(input.studentAge, 20),
    grade: limit(input.grade, 40),
    experience: limit(input.experience, 160),
    goals: limit(input.goals, 220),
    preferredDate: limit(input.preferredDate, 40),
    preferredTime: limit(input.preferredTime, 120),
    safetyNotes: limit(input.safetyNotes, 1000),
    notes: limit(input.notes, 1200),
    recommendation: limit(input.recommendation, 800),
    followUpStatus: limit(input.followUpStatus, 80) || "needs_confirmation",
    registrationStatus: limit(input.registrationStatus, 80) || "lead",
    leadScore: scoreLead(input)
  };
}

function validateLead(lead) {
  if (!lead.parentName) {
    throw clientError("missing_parent_name", "Parent or guardian name is required.");
  }
  if (!lead.parentEmail && !lead.parentPhone) {
    throw clientError("missing_contact", "Parent email or phone is required.");
  }
  if (lead.parentEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.parentEmail)) {
    throw clientError("invalid_email", "Parent email is not valid.");
  }
}

async function saveLeadToSupabase(lead) {
  const supabaseUrl = clean(process.env.SUPABASE_URL).replace(/\/$/, "");
  const serviceKey = clean(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const table = clean(process.env.SUPABASE_LEADS_TABLE || "parent_agent_leads");
  if (!supabaseUrl || !serviceKey) return { saved: false, id: "" };

  const response = await fetch(`${supabaseUrl}/rest/v1/${encodeURIComponent(table)}`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation"
    },
    body: JSON.stringify(mapLeadToRow(lead))
  });

  if (!response.ok) {
    throw new Error(`Supabase lead insert failed: ${response.status}`);
  }

  const rows = await response.json();
  return { saved: true, id: rows?.[0]?.id || lead.id };
}

function mapLeadToRow(lead) {
  return {
    external_id: lead.id,
    source: lead.source,
    intent: lead.intent,
    parent_name: lead.parentName,
    parent_email: lead.parentEmail,
    parent_phone: lead.parentPhone,
    student_name: lead.studentName,
    student_age: lead.studentAge ? Number(lead.studentAge) || null : null,
    grade: lead.grade,
    experience_level: lead.experience,
    goals: lead.goals,
    preferred_trial_date: lead.preferredDate || null,
    preferred_trial_time: lead.preferredTime,
    safety_notes: lead.safetyNotes,
    notes: lead.notes,
    recommendation: lead.recommendation,
    lead_score: lead.leadScore,
    follow_up_status: lead.followUpStatus,
    registration_status: lead.registrationStatus,
    raw_payload: lead
  };
}

async function notifyStaff(lead, crmLeadId) {
  const webhookUrl = clean(process.env.STAFF_NOTIFICATION_WEBHOOK_URL);
  if (!webhookUrl) return { sent: false };

  const text = [
    `New ${lead.intent.replace(/_/g, " ")} lead for ${process.env.PARENT_AGENT_PROGRAM_NAME || "PatriotJJ"}.`,
    `Parent: ${lead.parentName}`,
    `Student: ${lead.studentName || "N/A"} ${lead.grade ? `(${lead.grade})` : ""}`,
    `Contact: ${[lead.parentEmail, lead.parentPhone].filter(Boolean).join(" | ")}`,
    `Recommendation: ${lead.recommendation || "Staff follow-up"}`
  ].join("\n");

  return postWebhook(webhookUrl, {
    text,
    leadId: crmLeadId || lead.id,
    lead
  });
}

async function sendParentConfirmation(lead) {
  const webhookUrl = clean(process.env.PARENT_CONFIRMATION_WEBHOOK_URL);
  if (!webhookUrl || !lead.parentEmail) return { sent: false };
  return postWebhook(webhookUrl, {
    to: lead.parentEmail,
    phone: lead.parentPhone,
    template: "trial_booked_pending_confirmation",
    lead,
    schedulingUrl: clean(process.env.PARENT_AGENT_SCHEDULING_URL || process.env.CALENDLY_EVENT_TYPE_URL)
  });
}

async function postWebhook(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error(`Webhook failed: ${response.status}`);
  return { sent: true };
}

function scoreLead(input) {
  let score = 40;
  const text = `${input.goals || ""} ${input.notes || ""} ${input.experience || ""}`.toLowerCase();
  if (input.parentEmail && input.parentPhone) score += 15;
  if (/trial|register|enroll|sign up/.test(text)) score += 15;
  if (/wrestling|returning|martial/.test(text)) score += 10;
  if (input.preferredDate || input.preferredTime) score += 10;
  if (input.safetyNotes) score += 5;
  return Math.min(100, score);
}

function clientError(code, message) {
  const error = new Error(message);
  error.statusCode = 400;
  error.code = code;
  return error;
}

function limit(value, max) {
  return clean(value).slice(0, max);
}

function clean(value) {
  return String(value ?? "").trim();
}
