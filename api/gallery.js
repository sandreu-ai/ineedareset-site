const { list } = require('@vercel/blob');
const MANIFEST = 'reset-gallery/manifest.json';
module.exports = async function handler(req, res) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) return res.status(200).json({ items: [], source: 'static-fallback' });
    const blobs = await list({ prefix: MANIFEST, limit: 1 });
    const blob = blobs.blobs && blobs.blobs[0];
    if (!blob) return res.status(200).json({ items: [], source: 'empty' });
    const response = await fetch(blob.url);
    if (!response.ok) return res.status(200).json({ items: [], source: 'manifest-unavailable' });
    const manifest = await response.json();
    return res.status(200).json({ items: Array.isArray(manifest.items) ? manifest.items : [], source: 'blob' });
  } catch (error) {
    return res.status(200).json({ items: [], source: 'error' });
  }
};
