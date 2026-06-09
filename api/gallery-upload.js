const { put } = require('@vercel/blob');
const { verifySession } = require('./_auth');
const { readManifest, sanitizeItems, MANIFEST } = require('./gallery');
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!verifySession(req)) return res.status(401).json({ error: 'Unauthorized' });
  if (!process.env.BLOB_READ_WRITE_TOKEN) return res.status(503).json({ error: 'Photo storage is not configured yet. Add BLOB_READ_WRITE_TOKEN in Vercel.' });
  const { title, city, stage, note, featured, fileName, contentType, dataUrl } = req.body || {};
  if (!title || !dataUrl || !String(dataUrl).startsWith('data:image/')) return res.status(400).json({ error: 'Missing title or image.' });
  const base64 = String(dataUrl).split(',')[1];
  const buffer = Buffer.from(base64, 'base64');
  if (buffer.length > 3_800_000) return res.status(413).json({ error: 'Image is still too large after compression.' });
  const safeName = String(fileName || title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'reset-gallery';
  const key = `reset-gallery/${Date.now()}-${safeName}.jpg`;
  const uploaded = await put(key, buffer, { access: 'public', contentType: contentType || 'image/jpeg', addRandomSuffix: false });
  const item = {
    id: key,
    url: uploaded.url,
    title: String(title).slice(0, 120),
    city: String(city || '').slice(0, 80),
    stage: String(stage || 'Reset').slice(0, 30),
    note: String(note || '').slice(0, 240),
    alt: `${stage || 'Reset'} photo for ${title}`,
    source: 'uploaded',
    featured: featured !== false,
    createdAt: new Date().toISOString(),
  };
  const manifest = await readManifest();
  const existing = Array.isArray(manifest.items) ? manifest.items : [];
  const items = sanitizeItems([item, ...existing]).slice(0, 120);
  await put(MANIFEST, JSON.stringify({ updatedAt: new Date().toISOString(), items }, null, 2), { access: 'public', contentType: 'application/json', addRandomSuffix: false, allowOverwrite: true });
  return res.status(200).json({ ok: true, url: uploaded.url, item });
};
