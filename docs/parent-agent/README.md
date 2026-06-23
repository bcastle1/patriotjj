# PatriotJJ Recruiting and Parent Agent

This package defines the source-controlled PatriotJJ recruiting and parent-support agent for `https://patriotjj.com`.

## What ships in this branch

- Public Parent Agent section in `index.html`.
- Local assistant logic, lead capture, parent-question logging, recommendations, and admin lead dashboard in `app.js`.
- Responsive PatriotJJ styling in `styles.css`.
- Optional Vercel lead webhook at `api/parent-agent-lead.js`.
- Botpress flow spec in `botpress-flow.json`.
- Parent FAQ knowledge base in `parent-faq-knowledge-base.md`.
- Supabase CRM schema in `crm-schema.sql`.
- Follow-up message templates in `follow-up-templates.md`.
- QA checklist in `testing-checklist.md`.

## Runtime Architecture

1. `patriotjj.com` hosts the existing static site and Parent Agent fallback.
2. The site stores leads and questions in the existing browser CRM immediately.
3. The site tries `POST /api/parent-agent-lead`.
4. The Vercel function optionally writes to Supabase and calls staff/parent notification webhooks.
5. Botpress should use the same webhook action for production conversations.
6. Calendly or Google Calendar should be exposed through a controlled scheduling link or webhook, not a cross-subdomain redirect.

## Environment Variables

Set these only through the approved GitHub/Vercel deployment path.

```text
PARENT_AGENT_ALLOWED_ORIGINS=https://patriotjj.com,https://www.patriotjj.com
PARENT_AGENT_PROGRAM_NAME=PatriotJJ
PARENT_AGENT_SCHEDULING_URL=https://calendly.com/...
CALENDLY_EVENT_TYPE_URL=https://calendly.com/...
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<server-only key>
SUPABASE_LEADS_TABLE=parent_agent_leads
STAFF_NOTIFICATION_WEBHOOK_URL=<Slack/Teams/Zapier/email webhook>
PARENT_CONFIRMATION_WEBHOOK_URL=<email/SMS automation webhook>
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` in browser code.

## Botpress Deployment

1. Create the Botpress bot from `botpress-flow.json`.
2. Upload `parent-faq-knowledge-base.md` as the primary knowledge source.
3. Add an action named `capture_parent_lead`.
4. Configure that action to `POST https://patriotjj.com/api/parent-agent-lead`.
5. Send the collected parent/student fields as the JSON body.
6. In the Botpress handoff message, include the scheduling URL returned by the webhook when present.
7. Embed the Botpress webchat on `patriotjj.com` only after the bot ID and host script are committed in the approved GitHub repo.

## Scheduling

Preferred order:

1. Calendly event type URL for trial classes.
2. Google Calendar appointment schedule.
3. Staff-confirmed email follow-up fallback.

The site currently captures preferred date/time and keeps the parent-facing copy clear that availability is not final until staff confirms.

## Registration

Registration remains the existing on-page signup and waiver workflow. The Parent Agent routes parents there and links matching leads to new participant records by email, phone, or student name.

## Security Notes

- Parent/guardian involvement is required for minors.
- The assistant does not give medical advice.
- Injury, health, and safety concerns are escalated to staff.
- No outcome is guaranteed.
- API CORS is restricted to PatriotJJ origins by default.
- CRM writes happen server-side only when Supabase env vars are configured.

## PR Handoff

This branch is safe for review as source. Do not deploy, edit DNS, change hosting targets, or add live env vars outside the approved GitHub PR flow.
