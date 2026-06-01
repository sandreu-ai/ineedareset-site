const loginForm = document.getElementById('loginForm');
const uploadForm = document.getElementById('uploadForm');
const statusEl = document.getElementById('adminStatus');
function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? '#ff8b8b' : '#d7d9d8';
}
loginForm?.addEventListener('submit', async event => {
  event.preventDefault();
  setStatus('Checking password…');
  const password = new FormData(loginForm).get('password');
  const res = await fetch('/api/admin-login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ password }) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return setStatus(data.error || 'Login failed.', true);
  loginForm.hidden = true;
  uploadForm.hidden = false;
  setStatus('Logged in. Choose a photo to upload.');
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
    fileName: file.name,
    contentType: image.contentType,
    dataUrl: image.dataUrl,
  };
  setStatus('Uploading…');
  const res = await fetch('/api/gallery-upload', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return setStatus(data.error || 'Upload failed.', true);
  uploadForm.reset();
  setStatus('Uploaded. Public gallery URL: ' + data.url);
});
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
