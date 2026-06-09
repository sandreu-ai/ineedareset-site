const { put } = require('@vercel/blob');
const { verifySession } = require('./_auth');
const { readManifest, sanitizeItems, MANIFEST } = require('./gallery');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!verifySession(req)) return res.status(401).json({ error: 'Unauthorized' });
  if (!process.env.BLOB_READ_WRITE_TOKEN) return res.status(503).json({ error: 'Photo storage is not configured yet. Add BLOB_READ_WRITE_TOKEN in Vercel.' });

  const nextItems = sanitizeItems((req.body && req.body.items) || []);
  if (!nextItems.length) return res.status(400).json({ error: 'Gallery needs at least one photo.' });
  if (nextItems.length > 120) return res.status(400).json({ error: 'Gallery is limited to 120 photos.' });

  await put(MANIFEST, JSON.stringify({ updatedAt: new Date().toISOString(), items: nextItems }, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  return res.status(200).json({ ok: true, items: nextItems });
};
