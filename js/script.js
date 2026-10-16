/**
 * Life Dashboard – script.js
 * Fitur: Clock, Greeting, Focus Timer, To-Do List, Quick Links
 * Storage: localStorage
 */

'use strict';

/* ═══════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════ */
const $ = (id) => document.getElementById(id);

/** Show a toast notification */
function showToast(msg, duration = 2500) {
  const toast = $('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

/** Show an inline error message */
function showError(elId, msg) {
  const el = $(elId);
  el.textContent = msg;
  el.hidden = false;
}

/** Clear an inline error message */
function clearError(elId) {
  const el = $(elId);
  el.textContent = '';
  el.hidden = true;
}

/** Normalize string for comparison (trim, lower) */
function normalize(str) {
  return str.trim().toLowerCase();
}

/** Escape HTML to prevent XSS */
function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/** Generate a simple unique ID */
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

/* ═══════════════════════════════════════════════════════════
   LOCAL STORAGE KEYS
══════════════════════════════════════════════════════════ */
const LS = {
  NAME:  'ldb_name',
  TODOS: 'ldb_todos',
  LINKS: 'ldb_links',
};

/* ═══════════════════════════════════════════════════════════
   1. CLOCK & GREETING
══════════════════════════════════════════════════════════ */
const DAYS_ID   = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
const MONTHS_ID = ['Januari','Februari','Maret','April','Mei','Juni',
                   'Juli','Agustus','September','Oktober','November','Desember'];

function updateClock() {
  const now = new Date();
  const h   = String(now.getHours()).padStart(2, '0');
  const m   = String(now.getMinutes()).padStart(2, '0');
  const s   = String(now.getSeconds()).padStart(2, '0');
  $('clock').textContent = `${h}:${m}:${s}`;

  const day   = DAYS_ID[now.getDay()];
  const date  = now.getDate();
  const month = MONTHS_ID[now.getMonth()];
  const year  = now.getFullYear();
  $('date').textContent = `${day}, ${date} ${month} ${year}`;

  // Greeting based on hour
  const hour = now.getHours();
  let greet;
  if (hour >= 5  && hour < 12) greet = 'Selamat Pagi ☀️';
  else if (hour >= 12 && hour < 15) greet = 'Selamat Siang 🌤';
  else if (hour >= 15 && hour < 19) greet = 'Selamat Sore 🌅';
  else                               greet = 'Selamat Malam 🌙';
  $('greeting').textContent = greet;
}

setInterval(updateClock, 1000);
updateClock();

/* ═══════════════════════════════════════════════════════════
   2. CUSTOM NAME (Challenge 1)
══════════════════════════════════════════════════════════ */
(function initName() {
  const stored = localStorage.getItem(LS.NAME) || '';
  renderName(stored || 'Pengguna');

  // Open modal on first visit if no name stored
  if (!stored) openNameModal();

  $('edit-name-btn').addEventListener('click', openNameModal);
  $('save-name-btn').addEventListener('click', saveName);
  $('cancel-name-btn').addEventListener('click', closeNameModal);
  $('name-modal').addEventListener('click', (e) => {
    if (e.target === $('name-modal')) closeNameModal();
  });
  $('name-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') saveName();
    if (e.key === 'Escape') closeNameModal();
  });
})();

function renderName(name) {
  $('username-display').textContent = name || 'Pengguna';
}

function openNameModal() {
  const stored = localStorage.getItem(LS.NAME) || '';
  $('name-input').value = stored;
  $('name-modal').hidden = false;
  setTimeout(() => $('name-input').focus(), 50);
}

function closeNameModal() {
  $('name-modal').hidden = true;
}

function saveName() {
  const val = $('name-input').value.trim();
  if (!val) {
    $('name-input').focus();
    return;
  }
  localStorage.setItem(LS.NAME, val);
  renderName(val);
  closeNameModal();
  showToast(`Halo, ${val}! 👋`);
}

/* ═══════════════════════════════════════════════════════════
   3. FOCUS TIMER
══════════════════════════════════════════════════════════ */
const timerState = {
  totalSeconds: 25 * 60,
  remaining:    25 * 60,
  interval:     null,
  running:      false,
};

function timerFormat(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function updateTimerDisplay() {
  const display = $('timer-display');
  display.textContent = timerFormat(timerState.remaining);
  display.classList.toggle('running', timerState.running);
  display.classList.toggle('stopped', !timerState.running && timerState.remaining < timerState.totalSeconds && timerState.remaining > 0);
  display.classList.toggle('done',    timerState.remaining === 0);
}

function timerTick() {
  if (timerState.remaining <= 0) {
    clearInterval(timerState.interval);
    timerState.running = false;
    $('timer-status').textContent = '🎉 Waktu habis! Istirahat sejenak.';
    updateTimerDisplay();
    showToast('⏰ Fokus selesai! Waktunya istirahat.', 4000);
    // Simple audio cue using Web Audio API
    try { playBeep(); } catch (_) {}
    return;
  }
  timerState.remaining--;
  updateTimerDisplay();

  const mins = Math.floor(timerState.remaining / 60);
  const secs = timerState.remaining % 60;
  $('timer-status').textContent = `⏳ ${timerFormat(timerState.remaining)} tersisa – tetap fokus!`;
}

function playBeep() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  [0, 0.3, 0.6].forEach((delay) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.4, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.25);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime  + delay + 0.25);
  });
}

$('timer-start').addEventListener('click', () => {
  if (timerState.running) return;
  if (timerState.remaining === 0) {
    timerState.remaining = timerState.totalSeconds; // auto-reset if done
  }
  timerState.running = true;
  timerState.interval = setInterval(timerTick, 1000);
  $('timer-status').textContent = `⏳ ${timerFormat(timerState.remaining)} tersisa – tetap fokus!`;
  updateTimerDisplay();
  showToast('▶ Timer dimulai!');
});

$('timer-stop').addEventListener('click', () => {
  if (!timerState.running) return;
  clearInterval(timerState.interval);
  timerState.running = false;
  $('timer-status').textContent = '⏸ Timer dijeda.';
  updateTimerDisplay();
  showToast('⏸ Timer dijeda.');
});

$('timer-reset').addEventListener('click', () => {
  clearInterval(timerState.interval);
  timerState.running = false;
  timerState.remaining = timerState.totalSeconds;
  $('timer-status').textContent = 'Siap untuk fokus!';
  updateTimerDisplay();
  showToast('↺ Timer direset.');
});

$('timer-set-btn').addEventListener('click', () => {
  const val = parseInt($('timer-minutes').value, 10);
  if (isNaN(val) || val < 1 || val > 120) {
    showToast('⚠️ Masukkan durasi antara 1–120 menit.');
    return;
  }
  clearInterval(timerState.interval);
  timerState.running = false;
  timerState.totalSeconds = val * 60;
  timerState.remaining    = val * 60;
  $('timer-status').textContent = `Durasi diatur ke ${val} menit. Siap!`;
  updateTimerDisplay();
  showToast(`⏱ Durasi diatur ke ${val} menit.`);
});

// Allow Enter key on duration input
$('timer-minutes').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') $('timer-set-btn').click();
});

updateTimerDisplay();

/* ═══════════════════════════════════════════════════════════
   4. TO-DO LIST
══════════════════════════════════════════════════════════ */

// ── Data ────────────────────────────────────────────────
let todos = [];

function loadTodos() {
  try {
    todos = JSON.parse(localStorage.getItem(LS.TODOS)) || [];
  } catch {
    todos = [];
  }
}

function saveTodos() {
  localStorage.setItem(LS.TODOS, JSON.stringify(todos));
}

// ── Sort (Challenge 3) ──────────────────────────────────
function getSortedTodos() {
  const mode = $('sort-select').value;
  const copy = [...todos];
  switch (mode) {
    case 'alpha':
      copy.sort((a, b) => a.text.localeCompare(b.text, 'id'));
      break;
    case 'done-last':
      copy.sort((a, b) => Number(a.done) - Number(b.done)
        || a.text.localeCompare(b.text, 'id'));
      break;
    case 'done-first':
      copy.sort((a, b) => Number(b.done) - Number(a.done)
        || a.text.localeCompare(b.text, 'id'));
      break;
    default: // insertion order
      break;
  }
  return copy;
}

// ── Render ──────────────────────────────────────────────
function renderTodos() {
  const list   = $('todo-list');
  const sorted = getSortedTodos();
  list.innerHTML = '';

  if (sorted.length === 0) {
    list.innerHTML = '<li style="color:#9ca3af;font-size:.875rem;padding:.5rem 0;">Belum ada tugas. Tambahkan yang pertama! 🎉</li>';
  } else {
    sorted.forEach((todo) => {
      const li = document.createElement('li');
      li.className = `todo-item${todo.done ? ' done' : ''}`;
      li.dataset.id = todo.id;
      li.innerHTML = `
        <input
          type="checkbox"
          class="todo-item__check"
          aria-label="Tandai selesai: ${escHtml(todo.text)}"
          ${todo.done ? 'checked' : ''}
        />
        <span class="todo-item__text">${escHtml(todo.text)}</span>
        <div class="todo-item__actions">
          <button class="icon-btn icon-btn--edit"   aria-label="Edit tugas" title="Edit">✏️</button>
          <button class="icon-btn icon-btn--danger"  aria-label="Hapus tugas" title="Hapus">🗑️</button>
        </div>
      `;

      // Checkbox toggle
      li.querySelector('.todo-item__check').addEventListener('change', () => toggleTodo(todo.id));
      // Edit
      li.querySelector('.icon-btn--edit').addEventListener('click', () => openEditModal(todo.id));
      // Delete
      li.querySelector('.icon-btn--danger').addEventListener('click', () => deleteTodo(todo.id));

      list.appendChild(li);
    });
  }

  // Update count
  const done  = todos.filter(t => t.done).length;
  $('todo-count').textContent = `${todos.length} tugas · ${done} selesai`;
}

// ── Actions ─────────────────────────────────────────────
function addTodo() {
  clearError('todo-error');
  const raw = $('todo-input').value;
  const text = raw.trim();

  if (!text) {
    showError('todo-error', '⚠️ Tugas tidak boleh kosong.');
    $('todo-input').focus();
    return;
  }

  // Challenge 2: Duplikat check
  const isDuplicate = todos.some(t => normalize(t.text) === normalize(text));
  if (isDuplicate) {
    showError('todo-error', '⚠️ Tugas ini sudah ada dalam daftar!');
    $('todo-input').focus();
    return;
  }

  todos.push({ id: uid(), text, done: false, createdAt: Date.now() });
  saveTodos();
  renderTodos();
  $('todo-input').value = '';
  $('todo-input').focus();
  showToast('✅ Tugas ditambahkan!');
}

function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (!todo) return;
  todo.done = !todo.done;
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return;
  const text = todos[idx].text;
  todos.splice(idx, 1);
  saveTodos();
  renderTodos();
  showToast(`🗑 "${text.slice(0, 30)}" dihapus.`);
}

// ── Edit Modal ──────────────────────────────────────────
let editingId = null;

function openEditModal(id) {
  const todo = todos.find(t => t.id === id);
  if (!todo) return;
  editingId = id;
  $('edit-todo-input').value = todo.text;
  clearError('edit-error');
  $('edit-modal').hidden = false;
  setTimeout(() => $('edit-todo-input').focus(), 50);
}

function closeEditModal() {
  $('edit-modal').hidden = true;
  editingId = null;
}

function saveEdit() {
  clearError('edit-error');
  const text = $('edit-todo-input').value.trim();

  if (!text) {
    showError('edit-error', '⚠️ Tugas tidak boleh kosong.');
    return;
  }

  const todo = todos.find(t => t.id === editingId);
  if (!todo) { closeEditModal(); return; }

  // Duplicate check (exclude self)
  const isDuplicate = todos.some(t => t.id !== editingId && normalize(t.text) === normalize(text));
  if (isDuplicate) {
    showError('edit-error', '⚠️ Tugas ini sudah ada dalam daftar!');
    return;
  }

  todo.text = text;
  saveTodos();
  renderTodos();
  closeEditModal();
  showToast('✏️ Tugas diperbarui!');
}

$('save-edit-btn').addEventListener('click', saveEdit);
$('cancel-edit-btn').addEventListener('click', closeEditModal);
$('edit-modal').addEventListener('click', (e) => {
  if (e.target === $('edit-modal')) closeEditModal();
});
$('edit-todo-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') saveEdit();
  if (e.key === 'Escape') closeEditModal();
});

// ── Add button & Enter key ──────────────────────────────
$('todo-add-btn').addEventListener('click', addTodo);
$('todo-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTodo();
  if (e.key !== 'Enter') clearError('todo-error');
});

// ── Clear done ──────────────────────────────────────────
$('clear-done-btn').addEventListener('click', () => {
  const count = todos.filter(t => t.done).length;
  if (count === 0) { showToast('Tidak ada tugas selesai untuk dihapus.'); return; }
  todos = todos.filter(t => !t.done);
  saveTodos();
  renderTodos();
  showToast(`🗑 ${count} tugas selesai dihapus.`);
});

// ── Sort select ─────────────────────────────────────────
$('sort-select').addEventListener('change', renderTodos);

// ── Init ────────────────────────────────────────────────
loadTodos();
renderTodos();

/* ═══════════════════════════════════════════════════════════
   5. QUICK LINKS
══════════════════════════════════════════════════════════ */

// ── Data ────────────────────────────────────────────────
let links = [];

function loadLinks() {
  try {
    links = JSON.parse(localStorage.getItem(LS.LINKS)) || [];
  } catch {
    links = [];
  }
}

function saveLinks() {
  localStorage.setItem(LS.LINKS, JSON.stringify(links));
}

// ── Render ──────────────────────────────────────────────
function renderLinks() {
  const list = $('links-list');
  list.innerHTML = '';

  if (links.length === 0) {
    list.innerHTML = '<li style="color:#9ca3af;font-size:.875rem;padding:.5rem 0;">Belum ada link. Tambahkan favorit kamu! 🔗</li>';
    return;
  }

  links.forEach((link) => {
    const li = document.createElement('li');
    li.className = 'link-item';
    li.dataset.id = link.id;

    // Favicon via Google S2
    let faviconUrl = '';
    try {
      const origin = new URL(link.url).origin;
      faviconUrl = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(origin)}&sz=32`;
    } catch (_) {}

    li.innerHTML = `
      ${faviconUrl
        ? `<img class="link-item__favicon" src="${escHtml(faviconUrl)}" alt="" aria-hidden="true" onerror="this.style.display='none'">`
        : ''}
      <a
        href="${escHtml(link.url)}"
        target="_blank"
        rel="noopener noreferrer"
        class="link-item__anchor"
        title="${escHtml(link.url)}"
      >${escHtml(link.name)}</a>
      <span class="link-item__url" title="${escHtml(link.url)}">${escHtml(link.url)}</span>
      <div class="todo-item__actions">
        <button class="icon-btn icon-btn--danger" aria-label="Hapus link ${escHtml(link.name)}" title="Hapus">🗑️</button>
      </div>
    `;

    li.querySelector('.icon-btn--danger').addEventListener('click', () => deleteLink(link.id));
    list.appendChild(li);
  });
}

// ── Validate URL ────────────────────────────────────────
function isValidUrl(str) {
  try {
    const url = new URL(str);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

// ── Actions ─────────────────────────────────────────────
function addLink() {
  clearError('link-error');
  const name = $('link-name-input').value.trim();
  let   url  = $('link-url-input').value.trim();

  if (!name) {
    showError('link-error', '⚠️ Nama link tidak boleh kosong.');
    $('link-name-input').focus();
    return;
  }

  if (!url) {
    showError('link-error', '⚠️ URL tidak boleh kosong.');
    $('link-url-input').focus();
    return;
  }

  // Auto-prepend https if missing
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;

  if (!isValidUrl(url)) {
    showError('link-error', '⚠️ URL tidak valid. Contoh: https://google.com');
    $('link-url-input').focus();
    return;
  }

  links.push({ id: uid(), name, url });
  saveLinks();
  renderLinks();
  $('link-name-input').value = '';
  $('link-url-input').value  = '';
  $('link-name-input').focus();
  showToast(`🔗 "${name}" ditambahkan!`);
}

function deleteLink(id) {
  const idx = links.findIndex(l => l.id === id);
  if (idx === -1) return;
  const name = links[idx].name;
  links.splice(idx, 1);
  saveLinks();
  renderLinks();
  showToast(`🗑 "${name}" dihapus.`);
}

$('link-add-btn').addEventListener('click', addLink);
$('link-url-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addLink();
  if (e.key !== 'Enter') clearError('link-error');
});
$('link-name-input').addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') clearError('link-error');
});

loadLinks();
renderLinks();
