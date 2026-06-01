const crypto = require('crypto');
const COOKIE_NAME = 'reset_admin';
function getSecret() { return process.env.RESET_ADMIN_SESSION_SECRET || process.env.RESET_ADMIN_PASSWORD || ''; }
function sign(value) { return crypto.createHmac('sha256', getSecret()).update(value).digest('hex'); }
function makeSessionCookie() {
  const value = `${Date.now()}.${crypto.randomBytes(16).toString('hex')}`;
  return `${value}.${sign(value)}`;
}
function verifySession(req) {
  const raw = req.headers.cookie || '';
  const match = raw.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!match || !getSecret()) return false;
  const token = decodeURIComponent(match[1]);
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const value = `${parts[0]}.${parts[1]}`;
  const expected = sign(value);
  const actual = String(parts[2] || '');
  if (expected.length !== actual.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(actual))) return false;
  const age = Date.now() - Number(parts[0]);
  return Number.isFinite(age) && age >= 0 && age < 1000 * 60 * 60 * 12;
}
function setSession(res) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${encodeURIComponent(makeSessionCookie())}; HttpOnly; SameSite=Lax; Path=/; Max-Age=43200${secure}`);
}
module.exports = { verifySession, setSession };
