const { list } = require('@vercel/blob');
const { defaultGalleryItems } = require('../lib/gallery-defaults');
const MANIFEST = 'reset-gallery/manifest.json';

module.exports = async function handler(req, res) {
  try {
    const manifest = await readManifest();
    return res.status(200).json({
      items: manifest.items,
      source: manifest.source,
      updatedAt: manifest.updatedAt || null,
      canPersist: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    });
  } catch (error) {
    return res.status(200).json({ items: withPublicUrls(defaultGalleryItems), source: 'default-error', canPersist: false });
  }
};

async function readManifest() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return { items: withPublicUrls(defaultGalleryItems), source: 'static-defaults' };
  }
  const blobs = await list({ prefix: MANIFEST, limit: 1 });
  const blob = blobs.blobs && blobs.blobs[0];
  if (!blob) return { items: withPublicUrls(defaultGalleryItems), source: 'static-defaults' };
  const response = await fetch(blob.url);
  if (!response.ok) return { items: withPublicUrls(defaultGalleryItems), source: 'manifest-unavailable' };
  const manifest = await response.json();
  const items = Array.isArray(manifest.items) && manifest.items.length ? manifest.items : withPublicUrls(defaultGalleryItems);
  return { items: sanitizeItems(items), source: 'blob', updatedAt: manifest.updatedAt };
}

function withPublicUrls(items) {
  return sanitizeItems(items).map(item => ({
    ...item,
    url: String(item.url || '').replace(/^\.\//, '/'),
  }));
}

function sanitizeItems(items) {
  return items.slice(0, 120).map((item, index) => ({
    id: String(item.id || `gallery-${index}`).slice(0, 160),
    url: String(item.url || '').slice(0, 800),
    title: String(item.title || 'RESET project').slice(0, 120),
    city: String(item.city || '').slice(0, 80),
    stage: String(item.stage || 'Reset').slice(0, 30),
    note: String(item.note || '').slice(0, 240),
    alt: String(item.alt || item.title || 'RESET gallery photo').slice(0, 180),
    source: String(item.source || 'uploaded').slice(0, 30),
    featured: Boolean(item.featured),
    createdAt: String(item.createdAt || new Date().toISOString()).slice(0, 40),
  })).filter(item => item.url);
}

module.exports.readManifest = readManifest;
module.exports.sanitizeItems = sanitizeItems;
module.exports.MANIFEST = MANIFEST;
