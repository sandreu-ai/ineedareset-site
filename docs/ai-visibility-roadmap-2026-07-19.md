# RESET AI Visibility / Entity SEO Roadmap

Date: 2026-07-19

## Current state verified

- Live domain: https://ineedareset.co
- Repo: /home/sandreu/projects/ineedareset-site
- Technical crawl basics: live `robots.txt` and `sitemap.xml` return 200.
- Existing indexable pages: homepage, gallery, Ellis County page, and city pages for Waxahachie, Midlothian, Red Oak, Ovilla, and Ennis.
- Existing schema: homepage has `LocalBusiness`; city pages have service/provider JSON-LD; reviews and local proof are visible.
- Local check: `npm run check` passed on 2026-07-19.

## Gaps against AI Visibility System standard

1. Entity consistency
   - Current site has baseline entity signals, social profiles, reviews, and service-area language.
   - Missing a formal public NAP/entity source-of-truth document that can be reused across Google Business Profile, citations, social profiles, schema, and directory submissions.
   - Need to verify exact public business name, public address/service-area display, public phone, email, logo URL, hours, categories, and sameAs links across all external platforms.

2. Structured data
   - Present but incomplete.
   - Add richer homepage graph: `Organization`/`LocalBusiness`, `WebSite`, `Service`, `OfferCatalog`, `Review` or `AggregateRating` only when supported by visible Google review evidence, `FAQPage`, `ImageObject`, and breadcrumbs on inner pages.
   - Add `FAQPage` schema to city/service pages after expanding FAQ content.

3. Topical authority
   - Current architecture is strong for local garage reset/location pages but not yet a full topic cluster.
   - Build cluster around garage reset, garage organization, decluttering, storage systems, moving/downsizing overflow, estate/transition spaces, pricing, timeline, safety, what to keep/remove, and aftercare.

4. AEO/GEO answer content
   - Current copy answers basic who/what/how.
   - Needs direct answer sections for cost, timeline, prep, safety, what happens to unwanted items, how quoting works, whether customer must be present, storage add-ons, and what makes a job a bad fit.

5. FAQ depth
   - Current FAQ footprint is small.
   - Target: 40-60 high-quality RESET-specific FAQs first, then expand toward 100 only if answers remain useful and non-duplicative.

6. Authority outside the site
   - Need a citation/reputation tracker for Google Business Profile, Facebook, Instagram, Apple Maps, Bing Places, Yelp/Nextdoor/BBB/Angi where appropriate, local chamber, local sponsorships, and supplier/manufacturer directories for storage products if applicable.

7. Local search signals
   - City pages exist for key Ellis County cities.
   - Next pages to consider: Cedar Hill, Mansfield, Midlothian/Waxahachie combined service-area variants, and Fort Worth-area qualified page only if lead quality and scheduling make sense.
   - Each city page should gain local project photos, local testimonial snippets, local FAQs, landmarks, and service-area explanation.

8. EEAT/trust
   - Reviews are visible.
   - Add owner/team section, process photos, insurance/trust policy language, privacy/photo publishing policy, before/after case studies, and clear guarantees/limits.

9. Technical quality
   - Crawl basics are live and passing.
   - Need recurring checks for Core Web Vitals, broken links, image dimensions/compression, accessibility labels, canonical consistency, and schema validation.

10. Original cite-worthy assets
   - Good opportunity: garage reset pricing guide, photo-based estimate checklist, garage organization maintenance checklist PDF, before/after case-study library, and storage add-on planner.

## Highest-leverage next sprint

1. Create canonical entity profile and external citation tracker.
2. Add expanded JSON-LD graph and FAQ schema.
3. Build a `/faq.html` or FAQ section expansion with 40-60 useful questions.
4. Build one pricing/process guide page designed for AI answers.
5. Upgrade city pages with stronger local proof and local FAQs.
6. Run live schema, Lighthouse/Core Web Vitals, sitemap, robots, and broken-link checks after deployment.
