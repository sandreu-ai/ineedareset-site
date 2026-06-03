# RESET — Ops Readiness and Blocker Audit

Last updated: 2026-05-29

Privacy rule: this file intentionally excludes secrets, customer records, raw CRM exports, cookies, tokens, and private conversations.

## Repo/deploy status

- Canonical repo verified locally: `https://github.com/sandreu-ai/ineedareset-site.git`.
- Commit `5a22cf2` changed the public phone number and brand-card asset.
- Commit `6ce40eb` added the ops-readiness docs/checks and was pushed to `origin/main`.
- Vercel CLI auth remains unavailable locally, but the GitHub → Vercel integration deployed commit `6ce40eb` successfully.
- Live HTTP verification after deploy: `https://ineedareset.co` and `https://www.ineedareset.co` both returned HTTP 200.

Deployment verification performed:

1. Pushed `main` to `https://github.com/sandreu-ai/ineedareset-site.git`.
2. Checked GitHub commit status for `6ce40eb`; Vercel returned `success` / `Deployment has completed`.
3. Verified both production domains returned HTTP 200.
4. Verified the live HTML includes the embedded GHL form ID `kdfWc9XF68KHtR1sByh8` and tap-to-text links.

## Controlled quote-form email receipt

Code/site status:

- The public site embeds GHL form `kdfWc9XF68KHtR1sByh8` and includes a direct fallback link.
- Local `npm run check` passed during this audit.

Current blocker: actual form submission receipt cannot be verified from the repo alone. It requires authenticated GHL/inbox access to confirm that a QA-only form submission creates the expected contact/conversation/workflow event and sends the expected owner/customer emails.

Suggested test:

1. Submit the public form with a clearly labeled QA-only lead.
2. Confirm GHL form submission record exists for form `kdfWc9XF68KHtR1sByh8`.
3. Confirm owner notification email receipt and any customer auto-reply receipt.
4. Delete/tag the QA lead as test-only after verification.

## Voice AI forwarded-call logging

Current blocker: forwarded-call logging cannot be verified from static site files. It requires authenticated GHL/LeadConnector phone/Voice AI access and one controlled call.

Suggested test:

1. Place a controlled forwarded call to the active RESET number/path.
2. Confirm the call appears in GHL Conversations/phone logs.
3. Confirm caller/contact attribution, recording/transcript/summary availability if enabled, and owner notification behavior.
4. Confirm no customer-facing automation fires unless consent/compliance and copy are approved.

## Safe repo improvements made in this audit

- Fixed three masked `sms:` hrefs so tap-to-text uses `+12146823435` while the visible copy remains `(214) 682-3435`.
- Expanded `scripts/check-site.mjs` to assert the correct `sms:` link and ban the previous masked href.
- Added this ops-readiness checklist and expanded README blocker notes.