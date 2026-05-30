import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const required = [
  'Reset your garage. Reclaim your space.',
  'kdfWc9XF68KHtR1sByh8',
  'Request your reset quote',
  'no pasted photo links needed',
  'Call or text',
  'sms:+12146823435',
  'RESET call or text card',
  'ineedareset.co',
  'assets/reset-logo.png',
  '$99 Virtual Garage Reset Plan',
  '$199 In-Person Garage Reset Plan',
  'Free AI-assisted concept mockup',
  'Full $99 credited toward a booked Reset project within 30 days',
  'Full $199 credited toward a booked Reset project within 30 days',
  'One photo facing the garage door',
  'One photo facing the back wall',
  'One photo from a corner near the garage door',
  'Rough garage dimensions, if you know them',
  'Your main goal for the garage'
];

const banned = [
  'What needs to be cleaned out?',
  'Photos link, if available',
  'clean-out',
  'sms:+121****3435'
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

const galleryOrder = [
  'Cluttered garage before Reset job one',
  'Clean garage after Reset job one',
  'Garage storage project before Reset job two',
  'Organized garage view after Reset job two',
  'Reset local crew trailer signage',
  'RESET call or text card'
];
let lastIndex = -1;
for (const text of galleryOrder) {
  const index = html.indexOf(text);
  if (index === -1) {
    throw new Error(`Missing gallery item: ${text}`);
  }
  if (index <= lastIndex) {
    throw new Error(`Gallery item out of order: ${text}`);
  }
  lastIndex = index;
}
console.log('Site content check passed.');
