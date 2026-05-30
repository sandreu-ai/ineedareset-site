# I Need a Reset

Static landing page for the Reset quote funnel.

Canonical production repository: `https://github.com/sandreu-ai/ineedareset-site.git`

Current deployment blocker: local Vercel CLI has no credentials in this environment. Run `vercel login` or deploy with a scoped token from an authenticated environment, then promote the local `main` commit `5a22cf2` or a newer commit.

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
- Deployment auth: this environment cannot deploy because Vercel CLI returns `No existing credentials found`; authenticate or provide `VERCEL_TOKEN` in a secure environment before running deployment commands.
