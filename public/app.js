const form = document.getElementById('enhance-form');
const submitBtn = document.getElementById('submit');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const result = document.getElementById('result');

function setBusy(busy) {
  submitBtn.disabled = busy;
}

function showProgress(show) {
  progress.hidden = !show;
  if (!show) {
    progressBar.style.width = '0%';
    progressText.textContent = '';
  }
}

function updateProgress(percent, text) {
  const p = Math.max(0, Math.min(100, percent));
  progressBar.style.width = `${p}%`;
  progressText.textContent = text ?? `Processing... ${p}%`;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  result.hidden = true;
  result.textContent = '';

  const fileInput = document.getElementById('video');
  const file = fileInput.files?.[0];
  if (!file) {
    alert('Please choose a video file.');
    return;
  }

  const fd = new FormData();
  fd.append('video', file);
  fd.append('denoiseLevel', document.getElementById('denoiseLevel').value);
  fd.append('sharpenLevel', document.getElementById('sharpenLevel').value);
  fd.append('upscale', document.getElementById('upscale').value);
  fd.append('brightness', document.getElementById('brightness').value);
  fd.append('contrast', document.getElementById('contrast').value);
  fd.append('saturation', document.getElementById('saturation').value);

  setBusy(true);
  showProgress(true);
  updateProgress(10, 'Uploading video...');

  try {
    const res = await fetch('/api/enhance', { method: 'POST', body: fd });
    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(data.error || 'Failed to enhance');
    }
    updateProgress(70, 'Processing...');
    const data = await res.json();
    updateProgress(100, 'Done');
    const link = document.createElement('a');
    link.href = data.downloadUrl;
    link.textContent = 'Download enhanced video';
    link.download = '';
    result.innerHTML = '';
    result.appendChild(link);
    result.hidden = false;
  } catch (err) {
    alert(err.message || 'An error occurred');
  } finally {
    setBusy(false);
    setTimeout(() => showProgress(false), 1000);
  }
});

