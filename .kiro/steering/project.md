---
inclusion: always
---

# Life Dashboard – Project Overview

Proyek Tugas Coding Camp oleh Sribintang17.

## Deskripsi
Website **To-Do List Life Dashboard** berbasis frontend murni (HTML5, CSS3, Vanilla JS).
Tidak menggunakan framework, library eksternal, atau backend apapun.

## Stack Teknologi
- **HTML5** – Struktur semantik dengan atribut ARIA untuk aksesibilitas
- **CSS3** – Custom Properties, Grid, Flexbox, animasi, desain responsif
- **Vanilla JavaScript (ES6+)** – Semua logika interaksi tanpa dependensi
- **Web Storage API** – `localStorage` untuk persistensi data di browser
- **Web Audio API** – Notifikasi suara saat Focus Timer selesai

## Struktur File
```
project/
├── index.html          ← Satu halaman utama (single-page)
├── css/style.css       ← Satu file CSS (jangan tambah file CSS lain)
├── js/script.js        ← Satu file JS  (jangan tambah file JS lain)
├── README.md
└── .kiro/
    ├── steering/       ← Konteks & aturan project untuk Kiro AI
    ├── hooks/          ← Otomasi event-driven Kiro
    └── settings/       ← Konfigurasi workspace
```

## Fitur Utama
1. Jam digital + tanggal (Bahasa Indonesia) + sapaan berdasarkan waktu
2. Focus Timer Pomodoro (1–120 menit) dengan Start / Stop / Reset
3. To-Do List – tambah, edit, selesai, hapus, sort, simpan di localStorage
4. Quick Links – tambah, buka, hapus, simpan di localStorage

## Tiga Challenge
1. **Custom Name** – greeting dengan nama pengguna, disimpan di localStorage
2. **Cegah Duplikat** – validasi case-insensitive sebelum tambah/edit tugas
3. **Sorting Tugas** – 4 mode: default, A→Z, selesai-di-bawah, selesai-di-atas
