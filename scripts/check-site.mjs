import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const required = [
  'Your space is not trash. It just needs a reset.',
  'kdfWc9XF68KHtR1sByh8',
  'Request your reset quote',
  'no pasted photo links needed',
  'ineedareset.co'
];

const banned = [
  'What needs to be cleaned out?',
  'Photos link, if available',
  'clean-out'
];

for (const text of required) {
  if (!html.includes(text)) {
    throw new Error(`Missing required text: ${text}`);
  }
}
for (const text of banned) {
  if (html.includes(text)) {
    throw new Error(`Banned wording still present: ${text}`);
  }
}
console.log('Site content check passed.');
