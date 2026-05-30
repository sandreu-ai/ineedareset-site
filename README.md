# I Need a Reset

Static landing page for the Reset quote funnel.

Canonical production repository: `https://github.com/sandreu-ai/ineedareset-site.git`

Deployment status: GitHub push triggered Vercel successfully for commit `6ce40eb`, which includes the phone-number update from `5a22cf2` plus the ops-readiness docs/checks. `https://ineedareset.co` and `https://www.ineedareset.co` returned HTTP 200 after deployment.

## Public form

The page embeds the GoHighLevel Reset Quote Request form:

https://api.leadconnectorhq.com/widget/form/kdfWc9XF68KHtR1sByh8

## Local preview

```bash
npm install
npm run start
```

## Notes

- Positioning intentionally says **reset**, not clean-out.
- The form does not ask users to paste photo links. The follow-up workflow should text the lead and ask them to reply with 3–5 photos or a quick video.
- Target domain: `ineedareset.co` and `www.ineedareset.co`.
- Public phone display and `sms:` links should resolve to `(214) 682-3435` / `+12146823435`.

## Ops blockers that require external access

- Controlled quote-form email receipt: submit the embedded GHL form with a QA-only lead and verify owner/customer email receipts inside the destination inbox/GHL workflow logs.
- Voice AI forwarded-call logging: place one controlled forwarded call and verify the call appears in GHL Conversations/phone logs with the expected contact attribution and owner notification.
- Deployment auth: resolved through GitHub → Vercel integration for commit `6ce40eb`; CLI auth is still unavailable locally, but production deployment no longer blocks the current site update.
