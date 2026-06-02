import { readFileSync, existsSync } from 'node:fs';

const files = [
  'index.html',
  'ellis-county-garage-reset.html',
  'gallery.html',
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
  'api/gallery.js',
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
const adminApi = readFileSync('api/gallery-upload.js', 'utf8');
const required = [
  'Reset your garage. Reclaim your space.',
  '6a1f571c2b348da0f75c1cf7',
  'privacy.html',
  'terms.html',
  'Before / after proof',
  'LocalBusiness',
  'gallery.html',
  'waxahachie-garage-reset.html',
  'midlothian-garage-reset.html',
  'red-oak-garage-reset.html',
  'ovilla-garage-reset.html',
  'ennis-garage-reset.html',
];
for (const text of required) {
  if (!index.includes(text) && !sitemap.includes(text)) throw new Error(`Missing required text: ${text}`);
}
const banned = ['clean-out', 'Photos link, if available', 'What needs to be cleaned out?', 'api.leadconnectorhq.com/widget/form', 'link.msgsndr.com/js/form_embed.js', 'data-form-id=', 'sms:+'];
for (const file of files.filter(file => file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.xml') || file.endsWith('.txt'))) {
  const text = readFileSync(file, 'utf8');
  for (const phrase of banned) {
    if (text.includes(phrase)) throw new Error(`Banned wording still present in ${file}: ${phrase}`);
  }
}
if (!adminApi.includes('verifySession(req)')) throw new Error('Gallery upload API must verify admin session.');
if (!adminApi.includes('BLOB_READ_WRITE_TOKEN')) throw new Error('Gallery upload API must require blob storage configuration.');
if (!readFileSync('robots.txt', 'utf8').includes('Disallow: /admin.html')) throw new Error('Admin page must be noindexed/disallowed.');
console.log('Site content check passed.');
