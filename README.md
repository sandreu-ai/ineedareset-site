# I Need a Reset

Static landing page for the Reset quote funnel.

Canonical production repository: `https://github.com/sandreu-ai/ineedareset-site.git`

Deployment status: GitHub push triggered Vercel successfully for commit `6ce40eb`, which includes the phone-number update from `5a22cf2` plus the ops-readiness docs/checks. `https://ineedareset.co` and `https://www.ineedareset.co` returned HTTP 200 after deployment.

## A2P chat widget

The public quote path uses the LeadConnector chat widget as the only SMS opt-in method on pages where the widget is embedded. Do not re-add embedded GHL forms, fallback form links, or other phone/SMS consent forms to those pages.

Widget ID: `6a1f571c2b348da0f75c1cf7`

## Local preview

```bash
npm install
npm run start
```

## Notes

- Positioning intentionally says **reset**, not clean-out.
- The quote flow does not ask users to paste photo links. Follow-up should happen through approved GHL/LeadConnector consent workflows.
- Target domain: `ineedareset.co` and `www.ineedareset.co`.
- Public phone display and `sms:` links should resolve to `(214) 682-3435` / `+12146823435`.

## Admin gallery upload

The private gallery upload page lives at `/admin.html` and uses Vercel serverless functions.

Required Vercel environment variables:

- `RESET_ADMIN_PASSWORD`: owner/admin upload password.
- `RESET_ADMIN_SESSION_SECRET`: random signing secret for the admin session cookie.
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob token for public gallery photo storage.

The admin page is noindexed and blocked in `robots.txt`. Uploads are compressed in-browser before being sent to `/api/gallery-upload`.

## Ops blockers that require external access

- Controlled chat-widget receipt: submit a QA-only chat-widget lead and verify owner/customer records inside GHL workflow logs.
- Voice AI forwarded-call logging: place one controlled forwarded call and verify the call appears in GHL Conversations/phone logs with the expected contact attribution and owner notification.
- Deployment auth: resolved through GitHub → Vercel integration for commit `6ce40eb`; CLI auth is still unavailable locally, but production deployment no longer blocks the current site update.
