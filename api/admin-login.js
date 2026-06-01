const { setSession } = require('./_auth');
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const configured = process.env.RESET_ADMIN_PASSWORD;
  if (!configured) return res.status(503).json({ error: 'Admin upload is not configured yet. Set RESET_ADMIN_PASSWORD and RESET_ADMIN_SESSION_SECRET in Vercel.' });
  const password = req.body && req.body.password;
  if (typeof password !== 'string' || password !== configured) return res.status(401).json({ error: 'Invalid password' });
  setSession(res);
  return res.status(200).json({ ok: true });
};
