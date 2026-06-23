# PatriotJJ Parent Agent Integration Contracts

## Lead Capture Webhook

Endpoint:

```text
POST https://patriotjj.com/api/parent-agent-lead
Content-Type: application/json
```

Payload:

```json
{
  "source": "botpress-parent-agent",
  "intent": "trial_class",
  "parentName": "Parent Name",
  "parentEmail": "parent@example.com",
  "parentPhone": "801-555-0100",
  "studentName": "Student Name",
  "studentAge": "12",
  "grade": "6",
  "experience": "Beginner",
  "goals": "Confidence and discipline",
  "preferredDate": "2026-07-01",
  "preferredTime": "Weekday afternoon",
  "safetyNotes": "",
  "notes": "",
  "recommendation": "Beginner youth class or introductory youth trial.",
  "followUpStatus": "needs_confirmation",
  "registrationStatus": "lead"
}
```

Response:

```json
{
  "ok": true,
  "leadId": "uuid-or-external-id",
  "crmSaved": true,
  "notificationSent": true,
  "parentConfirmationSent": true,
  "schedulingUrl": "https://calendly.com/..."
}
```

## Scheduling

Use one of these options:

- `PARENT_AGENT_SCHEDULING_URL`: direct Calendly or Google appointment schedule URL.
- `CALENDLY_EVENT_TYPE_URL`: fallback direct Calendly event URL.
- Staff-confirmed email fallback when no scheduling URL is configured.

The assistant may collect preferred date/time, but must not say the trial is confirmed until the calendar or staff confirms it.

## Staff Notification

Set `STAFF_NOTIFICATION_WEBHOOK_URL` to a Slack, Teams, Zapier, Make, or email automation webhook.

The API posts:

```json
{
  "text": "New trial class lead...",
  "leadId": "lead-id",
  "lead": {}
}
```

The notification destination should route to PatriotJJ staff only.

## Parent Confirmation

Set `PARENT_CONFIRMATION_WEBHOOK_URL` to the approved email/SMS automation endpoint.

The API posts:

```json
{
  "to": "parent@example.com",
  "phone": "801-555-0100",
  "template": "trial_booked_pending_confirmation",
  "lead": {},
  "schedulingUrl": "https://calendly.com/..."
}
```

The confirmation should say the request was received, not that attendance is confirmed unless a calendar booking exists.

## Registration Workflow

Registration remains on `https://patriotjj.com/#signup`.

Required steps:

1. Parent or guardian enters contact details.
2. Student information is entered.
3. Safety notes are disclosed for staff review.
4. Waiver acknowledgement and electronic signature are completed before participation.
5. Payment instructions or payment link are shown when available.
6. Staff reviews the registration and payment state in the admin dashboard.

## Payment Processor

The current static app uses Venmo payment instructions. If Stripe or another processor is added later:

- Use a server-created checkout session.
- Do not collect card numbers in Botpress or browser forms.
- Store only payment status, checkout session ID, and receipt metadata in CRM.
- Keep processor keys server-side.

## Optional CALL-E / E-Call

Calls are allowed only when all conditions are true:

- Parent requested a call.
- Parent provided a phone number.
- The call is about coach consultation, private evaluation, or a booked trial.
- Staff has approved the call path.

Do not call leads solely because they look high interest.
