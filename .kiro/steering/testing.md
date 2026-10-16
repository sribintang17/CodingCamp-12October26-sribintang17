---
inclusion: manual
name: testing-guide
description: Panduan pengujian manual fitur-fitur Life Dashboard
---

# Panduan Pengujian Manual

Tidak ada test runner di project ini. Semua pengujian dilakukan secara manual di browser.

## Persiapan
1. Buka `index.html` di browser (atau via Live Server)
2. Buka DevTools → tab **Console** untuk melihat error
3. Buka DevTools → tab **Application → Local Storage** untuk memantau data

---

## Checklist Pengujian

### ✅ Jam & Greeting
- [ ] Jam berdetak setiap detik
- [ ] Format: HH:MM:SS
- [ ] Tanggal tampil dalam Bahasa Indonesia
- [ ] Sapaan berubah sesuai waktu (Pagi/Siang/Sore/Malam)

### ✅ Custom Name (Challenge 1)
- [ ] Modal nama muncul otomatis saat pertama buka (localStorage kosong)
- [ ] Nama tersimpan setelah klik Simpan
- [ ] Refresh halaman → nama tetap tampil
- [ ] Tombol ✏️ Ubah Nama membuka modal kembali
- [ ] Input kosong tidak bisa disimpan

### ✅ Focus Timer
- [ ] Default 25:00
- [ ] Start → hitung mundur berjalan, tampilan hijau
- [ ] Stop → berhenti, tampilan oranye
- [ ] Start lagi → lanjut dari titik berhenti
- [ ] Reset → kembali ke durasi awal
- [ ] Set durasi 1 menit → Start → tunggu → bunyi + toast muncul
- [ ] Set durasi 0 atau > 120 → pesan error muncul

### ✅ To-Do List
- [ ] Tambah tugas "Belajar HTML" → muncul di daftar
- [ ] Tambah "belajar html" → error duplikat muncul (Challenge 2)
- [ ] Tambah tugas kosong → error muncul
- [ ] Centang tugas → teks dicoret, latar hijau muda
- [ ] Edit tugas → modal terbuka → ubah teks → simpan → berubah
- [ ] Edit ke nama yang sudah ada → error duplikat muncul
- [ ] Hapus tugas → hilang dari daftar
- [ ] Tombol "Hapus Tugas Selesai" → hanya yang dicentang dihapus
- [ ] Refresh → semua tugas masih ada

### ✅ Sorting (Challenge 3)
- [ ] Default → urutan seperti saat ditambahkan
- [ ] A→Z → urutan abjad
- [ ] Selesai di Bawah → tugas aktif di atas, selesai di bawah
- [ ] Selesai di Atas → tugas selesai di atas

### ✅ Quick Links
- [ ] Tambah nama "Google" + URL "google.com" → muncul dengan https://
- [ ] Tambah URL tidak valid → error muncul
- [ ] Klik nama link → terbuka di tab baru
- [ ] Hapus link → hilang dari daftar
- [ ] Refresh → link masih ada

### ✅ Responsivitas
- [ ] Tampil baik di lebar 1280px (laptop)
- [ ] Tampil baik di lebar 768px (tablet) — DevTools → responsive mode
- [ ] Tampil baik di lebar 375px (iPhone SE)

---

## Bug yang Diketahui / Batasan
- Favicon Quick Links bergantung pada Google S2 API; mungkin tidak tampil jika offline
- Bunyi timer menggunakan Web Audio API; perlu interaksi user sebelumnya di beberapa browser
