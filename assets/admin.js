const loginForm = document.getElementById('loginForm');
const uploadForm = document.getElementById('uploadForm');
const managerPanel = document.getElementById('managerPanel');
const listEl = document.getElementById('galleryManagerList');
const saveButton = document.getElementById('saveGallery');
const reloadButton = document.getElementById('reloadGallery');
const statusEl = document.getElementById('adminStatus');
let galleryItems = [];

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? '#ffb0b0' : '#d7d9d8';
}

loginForm?.addEventListener('submit', async event => {
  event.preventDefault();
  setStatus('Checking password…');
  const password = new FormData(loginForm).get('password');
  const res = await fetch('/api/admin-login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ password }) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return setStatus(data.error || 'Login failed.', true);
  loginForm.hidden = true;
  managerPanel.hidden = false;
  setStatus('Logged in. Loading gallery…');
  await loadGallery();
});

uploadForm?.addEventListener('submit', async event => {
  event.preventDefault();
  const form = new FormData(uploadForm);
  const file = form.get('photo');
  if (!file || !file.type?.startsWith('image/')) return setStatus('Choose an image file.', true);
  setStatus('Compressing photo…');
  const image = await compressImage(file);
  const payload = {
    title: form.get('title'),
    city: form.get('city'),
    stage: form.get('stage'),
    note: form.get('note'),
    featured: form.get('featured') === 'on',
    fileName: file.name,
    contentType: image.contentType,
    dataUrl: image.dataUrl,
  };
  setStatus('Uploading…');
  const res = await fetch('/api/gallery-upload', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return setStatus(data.error || 'Upload failed.', true);
  uploadForm.reset();
  setStatus('Uploaded. You can move it in the list below, then save the order.');
  await loadGallery();
});

saveButton?.addEventListener('click', saveGallery);
reloadButton?.addEventListener('click', loadGallery);

async function loadGallery() {
  const res = await fetch('/api/gallery', { headers: { accept: 'application/json' } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return setStatus(data.error || 'Could not load gallery.', true);
  galleryItems = Array.isArray(data.items) ? data.items : [];
  renderGalleryManager();
  setStatus(data.canPersist ? 'Gallery loaded. Make changes and save when ready.' : 'Gallery loaded from static defaults. Configure Vercel Blob storage before saving uploads/order.', !data.canPersist);
}

async function saveGallery() {
  syncItemsFromInputs();
  if (!galleryItems.length) return setStatus('Gallery needs at least one photo.', true);
  setStatus('Saving gallery order…');
  const res = await fetch('/api/gallery-save', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ items: galleryItems }) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return setStatus(data.error || 'Save failed.', true);
  galleryItems = Array.isArray(data.items) ? data.items : galleryItems;
  renderGalleryManager();
  setStatus('Saved. Public gallery and homepage proof areas will use this order.');
}

function renderGalleryManager() {
  if (!listEl) return;
  if (!galleryItems.length) {
    listEl.innerHTML = '<p class="admin-status">No gallery photos found yet.</p>';
    return;
  }
  listEl.innerHTML = galleryItems.map((item, index) => `
    <article class="gallery-manager-card" data-index="${index}">
      <img src="${escapeHtml(item.url)}" alt="${escapeHtml(item.alt || item.title || 'RESET gallery photo')}" loading="lazy" />
      <div class="gallery-manager-fields">
        <div class="manager-card-header">
          <strong>#${index + 1}</strong>
          <span>${escapeHtml(item.source || 'gallery')}</span>
        </div>
        <label>Title <input data-field="title" value="${escapeHtml(item.title || '')}" /></label>
        <label>City <input data-field="city" value="${escapeHtml(item.city || '')}" /></label>
        <label>Stage
          <select data-field="stage">
            ${['Before', 'After', 'Progress', 'Reset'].map(stage => `<option ${String(item.stage || '') === stage ? 'selected' : ''}>${stage}</option>`).join('')}
          </select>
        </label>
        <label>Note <textarea data-field="note" rows="2">${escapeHtml(item.note || '')}</textarea></label>
        <label class="inline-check"><input data-field="featured" type="checkbox" ${item.featured ? 'checked' : ''} /> Featured on homepage</label>
        <div class="manager-actions">
          <button type="button" data-action="up" ${index === 0 ? 'disabled' : ''}>Move up</button>
          <button type="button" data-action="down" ${index === galleryItems.length - 1 ? 'disabled' : ''}>Move down</button>
          <button type="button" data-action="delete">Remove from gallery</button>
        </div>
      </div>
    </article>
  `).join('');
  listEl.querySelectorAll('button[data-action]').forEach(button => button.addEventListener('click', handleManagerAction));
  listEl.querySelectorAll('input, textarea, select').forEach(input => input.addEventListener('change', syncItemsFromInputs));
}

function handleManagerAction(event) {
  const card = event.currentTarget.closest('[data-index]');
  const index = Number(card?.dataset.index);
  const action = event.currentTarget.dataset.action;
  syncItemsFromInputs();
  if (!Number.isInteger(index)) return;
  if (action === 'up' && index > 0) [galleryItems[index - 1], galleryItems[index]] = [galleryItems[index], galleryItems[index - 1]];
  if (action === 'down' && index < galleryItems.length - 1) [galleryItems[index + 1], galleryItems[index]] = [galleryItems[index], galleryItems[index + 1]];
  if (action === 'delete') galleryItems.splice(index, 1);
  renderGalleryManager();
  setStatus('Unsaved changes. Click Save gallery order when ready.');
}

function syncItemsFromInputs() {
  listEl?.querySelectorAll('[data-index]').forEach(card => {
    const index = Number(card.dataset.index);
    const item = galleryItems[index];
    if (!item) return;
    card.querySelectorAll('[data-field]').forEach(input => {
      const field = input.dataset.field;
      item[field] = input.type === 'checkbox' ? input.checked : input.value;
    });
  });
}

async function compressImage(file) {
  const bitmap = await createImageBitmap(file);
  const max = 1800;
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.84));
  const dataUrl = await new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
  return { dataUrl, contentType: 'image/jpeg' };
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>'"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch]));
}
