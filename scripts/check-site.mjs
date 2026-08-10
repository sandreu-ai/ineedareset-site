import { readFileSync, existsSync } from 'node:fs';

const files = [
  'index.html',
  'ellis-county-garage-reset.html',
  'gallery.html',
  'faq.html',
  'garage-reset-pricing.html',
  'garage-reset-vs-junk-removal.html',
  'garage-reset-vs-professional-organizer.html',
  'garage-reset-vs-dumpster-rental.html',
  'diy-garage-organization-vs-hiring-help.html',
  'garage-cleanout-for-elderly-parents.html',
  'garage-reset-after-moving.html',
  'prepare-for-garage-reset-appointment.html',
  'waxahachie-garage-reset.html',
  'midlothian-garage-reset.html',
  'red-oak-garage-reset.html',
  'ovilla-garage-reset.html',
  'ennis-garage-reset.html',
  'privacy.html',
  'terms.html',
  'admin.html',
  'api/admin-login.js',
  'api/gallery-upload.js',
  'api/gallery-save.js',
  'api/gallery.js',
  'lib/gallery-defaults.js',
  'assets/admin.js',
  'assets/gallery.js',
  'sitemap.xml',
  'robots.txt',
];
for (const file of files) {
  if (!existsSync(file)) throw new Error(`Missing expected file: ${file}`);
}
const index = readFileSync('index.html', 'utf8');
const sitemap = readFileSync('sitemap.xml', 'utf8');
const faqPage = readFileSync('faq.html', 'utf8');
const pricingPage = readFileSync('garage-reset-pricing.html', 'utf8');
const adminApi = readFileSync('api/gallery-upload.js', 'utf8');
const saveApi = readFileSync('api/gallery-save.js', 'utf8');
const adminPage = readFileSync('admin.html', 'utf8');
const adminJs = readFileSync('assets/admin.js', 'utf8');
const required = [
  'Reset your garage. Reclaim your space.',
  'kdfWc9XF68KHtR1sByh8',
  'privacy.html',
  'terms.html',
  'Before / after proof',
  'storage & organization upgrades',
  'Reset the space. Then make it easier to keep.',
  'Overhead ceiling racks are quoted only after product and site review',
  'LocalBusiness',
  'FAQPage',
  'Garage reset questions, answered before you ask for a quote.',
  'gallery.html',
  'faq.html',
  'waxahachie-garage-reset.html',
  'midlothian-garage-reset.html',
  'red-oak-garage-reset.html',
  'ovilla-garage-reset.html',
  'ennis-garage-reset.html',
  'garage-reset-vs-junk-removal.html',
  'garage-reset-vs-professional-organizer.html',
];
for (const text of required) {
  if (!index.includes(text) && !sitemap.includes(text) && !faqPage.includes(text)) throw new Error(`Missing required text: ${text}`);
}
const banned = ['Photos link, if available', 'What needs to be cleaned out?', '6a1f571c2b348da0f75c1cf7', 'chat-widget/loader.js', '+121****3435'];
for (const file of files.filter(file => file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.xml') || file.endsWith('.txt'))) {
  const text = readFileSync(file, 'utf8');
  for (const phrase of banned) {
    if (text.includes(phrase)) throw new Error(`Banned wording still present in ${file}: ${phrase}`);
  }
}
if (!adminApi.includes('verifySession(req)')) throw new Error('Gallery upload API must verify admin session.');
if (!saveApi.includes('verifySession(req)')) throw new Error('Gallery save API must verify admin session.');
if (!adminApi.includes('BLOB_READ_WRITE_TOKEN') || !saveApi.includes('BLOB_READ_WRITE_TOKEN')) throw new Error('Gallery APIs must require blob storage configuration before writes.');
if (!adminPage.includes('Privacy check before publishing')) throw new Error('Admin gallery manager must include customer-photo privacy warning.');
if (!pricingPage.includes('What affects the cost of a garage reset?') || !pricingPage.includes('FAQPage') || !sitemap.includes('garage-reset-pricing.html')) throw new Error('Pricing guide must be published with FAQ schema and sitemap coverage.');
if (!adminJs.includes('Move up') || !adminPage.includes('Save gallery order')) throw new Error('Admin page must include gallery reordering controls.');
if (!readFileSync('robots.txt', 'utf8').includes('Disallow: /admin.html')) throw new Error('Admin page must be noindexed/disallowed.');
if (!readFileSync('llms.txt', 'utf8').includes('Garage reset vs junk removal')) throw new Error('llms.txt must include expanded AEO answer pages.');
if (!readFileSync('docs/gbp-citation-packet.md', 'utf8').includes('Google Business Profile description')) throw new Error('GBP/citation packet missing.');
console.log('Site content check passed.');
