async function loadGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  try {
    const res = await fetch('/api/gallery', { headers: { accept: 'application/json' } });
    if (!res.ok) return;
    const data = await res.json();
    const items = Array.isArray(data.items) ? data.items : [];
    if (!items.length) return;
    const dynamic = items.map(item => `
      <article class="gallery-card">
        <img src="${escapeHtml(item.url)}" alt="${escapeHtml(item.alt || item.title || 'RESET gallery photo')}" loading="lazy" />
        <div>
          <p class="eyebrow">${escapeHtml(item.stage || 'Reset')}</p>
          <h3>${escapeHtml(item.title || 'RESET project')}</h3>
          <p>${escapeHtml([item.city, item.note].filter(Boolean).join(' — ') || 'Before and after proof from a RESET project.')}</p>
        </div>
      </article>`).join('');
    grid.insertAdjacentHTML('afterbegin', dynamic);
  } catch (error) {
    console.warn('Gallery API unavailable; showing static gallery.', error);
  }
}
function escapeHtml(value) {
  return String(value || '').replace(/[&<>'"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch]));
}
loadGallery();
