async function loadGallery() {
  try {
    const res = await fetch('/api/gallery', { headers: { accept: 'application/json' } });
    if (!res.ok) return;
    const data = await res.json();
    const items = Array.isArray(data.items) ? data.items : [];
    if (!items.length) return;
    renderGalleryPage(items);
    renderHomepagePreview(items);
    renderHeroScroller(items);
  } catch (error) {
    console.warn('Gallery API unavailable; showing static gallery.', error);
  }
}

function renderGalleryPage(items) {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  grid.innerHTML = items.map(item => `
    <article class="gallery-card">
      <img src="${escapeHtml(item.url)}" alt="${escapeHtml(item.alt || item.title || 'RESET gallery photo')}" loading="lazy" />
      <div>
        <p class="eyebrow">${escapeHtml(item.stage || 'Reset')}</p>
        <h3>${escapeHtml(item.title || 'RESET project')}</h3>
        <p>${escapeHtml([item.city, item.note].filter(Boolean).join(' — ') || 'Before and after proof from a RESET project.')}</p>
      </div>
    </article>`).join('');
}

function renderHomepagePreview(items) {
  const preview = document.querySelector('[data-gallery-preview]');
  if (!preview) return;
  const featured = preferredItems(items).slice(0, 4);
  preview.innerHTML = featured.map(item => `
    <figure class="gallery-photo"><img src="${escapeHtml(item.url)}" alt="${escapeHtml(item.alt || item.title || 'RESET gallery photo')}" loading="lazy" /></figure>
  `).join('');
}

function renderHeroScroller(items) {
  const track = document.querySelector('.hero-gallery .gallery-track');
  if (!track) return;
  const scrollerItems = preferredItems(items).slice(0, 8);
  const doubled = [...scrollerItems, ...scrollerItems];
  track.innerHTML = doubled.map((item, index) => {
    const size = index % 3 === 0 ? ' large' : index % 3 === 1 ? '' : ' wide';
    const alt = index < scrollerItems.length ? escapeHtml(item.alt || item.title || 'RESET garage photo') : '';
    return `<figure class="gallery-photo${size}"><img src="${escapeHtml(item.url)}" alt="${alt}" loading="${index < 2 ? 'eager' : 'lazy'}" /></figure>`;
  }).join('');
}

function preferredItems(items) {
  const featured = items.filter(item => item.featured);
  return featured.length ? featured : items;
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>'"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch]));
}

loadGallery();
