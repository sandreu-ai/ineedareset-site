# RESET Canonical Entity Profile

Status: Draft source of truth for Entity SEO / AI Visibility. Verify each field before copying to external platforms.
Last updated: 2026-07-19

## Canonical business entity

- Business name: RESET
- Alternate/public listing name currently seen: Reset Garage Clean-Outs
- Website: https://ineedareset.co/
- Primary category: Garage organization service
- Secondary categories:
  - Home organization service
  - Garage cleanout/reset service
  - Storage and organization service
  - Local home service
- Description, short: RESET helps Ellis County homeowners turn overloaded garages, storage areas, and spare rooms back into clean, usable space.
- Description, standard: RESET helps busy homeowners in Ellis County and select DFW-area communities reclaim overloaded garages, storage areas, and spare rooms through practical sorting, reset planning, organizing, debris/removal coordination, and storage add-ons. Customers start with a simple quote request and can text photos or a walkthrough video for a clear plan.

## Contact and location fields

- Public phone: (214) 682-3435
- Public phone E.164: +12146823435
- Public email: NEEDS CONFIRMATION before external citation use
- Public address: Service-area business; do not publish a private/home street address unless explicitly approved.
- Public service area: Waxahachie, Midlothian, Red Oak, Ovilla, Ennis, nearby Ellis County communities, and select DFW-area jobs.
- Hours: By appointment / quote request. Needs final public-hours decision before citation rollout.

## Brand assets

- Logo path in repo: assets/reset-logo.png
- Brand language: say “reset,” not “clean-out” in primary marketing copy.
- Brand colors: gunmetal/steel gray with rally red accents.
- Privacy rule for photos: blur house numbers, license plates, customer identifiers, and private household details before publication.

## Current known profiles / sameAs

- Google Business Profile / Reviews: linked from homepage Google review cards.
- Instagram: https://www.instagram.com/resetgaragecleanouts/
- Facebook: https://www.facebook.com/resetgaragecleanouts

## Structured-data mapping

Use only fields supported by visible site content or verified business data.

- `@type`: LocalBusiness, HomeAndConstructionBusiness or ProfessionalService may be considered, but LocalBusiness is currently safest.
- `name`: RESET
- `alternateName`: Reset Garage Clean-Outs, if retained on Google profile.
- `url`: https://ineedareset.co/
- `telephone`: +12146823435
- `areaServed`: Ellis County TX, Waxahachie TX, Midlothian TX, Red Oak TX, Ovilla TX, Ennis TX, select DFW-area jobs.
- `sameAs`: Instagram, Facebook, Google profile/reviews URL.
- `hasOfferCatalog`: garage reset planning, in-person garage reset, sorting/organizing/removal coordination, storage and organization add-ons.
- `aggregateRating` / `review`: only include if the visible Google review count/rating is verified and kept current.
- `openingHoursSpecification`: do not add until hours are confirmed.
- `address`: do not add a private/home address unless explicitly approved.

## External citation checklist

- [ ] Google Business Profile: verify exact name, category, service area, phone, website, logo, hours, photos, services, FAQs.
- [ ] Bing Places: create/sync from GBP after fields are final.
- [ ] Apple Business Connect / Apple Maps: create or verify service-area listing if appropriate.
- [ ] Facebook: align name, description, phone, website, service area, logo.
- [ ] Instagram: align bio, link, category, highlights, photo proof.
- [ ] Yelp / Nextdoor / BBB / Angi: evaluate fit and lead quality before listing.
- [ ] Local chamber/community directories: pursue only if public contact info is finalized.
- [ ] Supplier/manufacturer directories: consider for storage/organization products if partner-eligible.

## Next site implementation tasks

1. Add an expanded JSON-LD graph on homepage using this entity profile.
2. Add FAQPage schema after FAQ expansion.
3. Add BreadcrumbList schema to city and gallery pages.
4. Build `/faq.html` and one original pricing/process guide.
5. Keep this file updated before any external citation rollout.
