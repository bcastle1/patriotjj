# PatriotJJ Parent Agent Testing Checklist

## Site Fallback

- Open `index.html`.
- Confirm top navigation includes Parent Agent.
- Ask: "What are the camp dates and times?"
- Ask: "How much does camp cost?"
- Ask: "Is this safe for beginners?"
- Ask: "My child has an injury. Can they participate?"
- Confirm medical questions escalate to staff and do not give medical advice.
- Click Schedule, Pricing, Register, Trial Class, Gear, and Safety prompts.
- Confirm Register scrolls to the existing signup form.
- Confirm Trial Class focuses the lead form.

## Lead Capture

- Submit trial form with parent name, email, phone, student name, age, grade, experience, goal, preferred date/time, and safety notes.
- Confirm the lead is stored locally.
- Confirm a recommendation is shown.
- Confirm staff email fallback opens when `/api/parent-agent-lead` is not configured.
- Confirm safety notes set follow-up status to coach follow-up.

## Admin Dashboard

- Unlock admin with the current prototype password.
- Confirm metrics show:
  - New leads
  - Trial requests
  - Follow-ups needed
  - Lead conversion
  - Youth / teen lead distribution
  - Parent questions
  - Open opportunity
- Open the Leads tab.
- Select a lead.
- Confirm parent/student/experience/goals/safety/recommendation fields appear.
- Click Email Parent.
- Click Mark Followed Up.
- Confirm follow-up metrics update.
- Ask another Parent Agent question and confirm it appears in Recent parent questions.

## Registration Linkage

- Create a lead with a parent email or phone.
- Register a participant with the same parent email or phone.
- Confirm the lead status changes to followed up / registered.
- Confirm conversion rate changes.

## API Endpoint

- Run syntax check on `api/parent-agent-lead.js`.
- POST a valid lead JSON in a Vercel preview environment.
- Confirm invalid email returns `400 invalid_email`.
- Confirm missing contact returns `400 missing_contact`.
- Confirm missing Supabase env vars do not break the request.
- Confirm configured Supabase writes one row to `parent_agent_leads`.
- Confirm configured staff webhook receives a notification.
- Confirm configured parent confirmation webhook receives the template payload.

## Botpress

- Import or build the flow from `botpress-flow.json`.
- Upload `parent-faq-knowledge-base.md`.
- Test welcome quick replies.
- Test Student Fit collection.
- Test youth, teen, experienced, and safety-note recommendations.
- Test webhook action to `https://patriotjj.com/api/parent-agent-lead`.
- Confirm returned scheduling URL is shown only when configured.
- Confirm coach call flow requires phone number.

## Compliance

- Confirm no medical advice is given.
- Confirm no specific outcomes are promised.
- Confirm parent/guardian involvement is required for minors.
- Confirm waiver requirement is mentioned before participation.
- Confirm no payment card data is collected in chat.
- Confirm CORS allows only `https://patriotjj.com` and `https://www.patriotjj.com` unless a reviewed env change expands it.

## Responsive QA

- Check desktop width around 1440px.
- Check tablet width around 1024px.
- Check mobile width around 390px.
- Confirm Parent Agent cards do not overflow.
- Confirm trial form controls stack cleanly on mobile.
- Confirm admin tables scroll horizontally on mobile.
