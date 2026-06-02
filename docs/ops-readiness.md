# RESET — Ops Readiness and Blocker Audit

Last updated: 2026-06-02

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
4. Verified the live HTML includes the LeadConnector chat widget and legal links; old chat widget/tap-to-text paths are removed for A2P review.

## Controlled quote-form email receipt

Code/site status:

- The public site now uses the LeadConnector chat widget `6a1f571c2b348da0f75c1cf7` as the only SMS opt-in path on widget pages. Embedded GHL forms and direct form fallback links are intentionally removed for A2P review.
- Local `npm run check` passed during the prior audit.
- 2026-06-02 public check: `https://ineedareset.co`, `https://www.ineedareset.co`, and direct GHL form URL all returned HTTP 200.
- 2026-06-02 previous public form config check found old form ID `kdfWc9XF68KHtR1sByh8`; that form is no longer embedded on the public quote pages for A2P compliance.

Current blocker: actual recent submission records and workflow execution logs cannot be verified from public/repo access. It requires authenticated GHL access to confirm whether Santiago's submission created/updated a contact, whether a workflow enrolled, and whether any owner alert action failed or was absent.

Suggested test:

1. In GHL, inspect the LeadConnector chat widget and conversations for widget ID `6a1f571c2b348da0f75c1cf7`.
2. Confirm whether the recent QA submission exists. Summarize only counts/status; do not export or paste private lead records.
3. Open Automations → Workflows and inspect any workflow triggered by the chat widget/conversation source.
4. Confirm it is published and has an explicit internal owner notification action to the operating inbox/phone.
5. Submit one controlled QA-only chat-widget lead after any fix, then verify contact/opportunity/workflow execution and owner inbox/SMS receipt.
6. Delete/tag the QA lead as test-only after verification.

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