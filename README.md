# 🚀 Life Dashboard – To-Do List

Proyek Coding Camp · Sribintang17  
**HTML · CSS · Vanilla JavaScript** — tanpa framework, tanpa backend.

---

## 📁 Struktur File

```
project/
├── index.html       ← Halaman utama
├── css/
│   └── style.css    ← Seluruh styling (gradient, kartu, responsif)
├── js/
│   └── script.js    ← Semua logika fitur
└── README.md        ← Dokumentasi ini
```

---

## ▶️ Cara Menjalankan

1. **Buka langsung di browser**
   - Klik dua kali `index.html`, atau
   - Klik kanan → *Open with* → browser pilihan kamu.

2. **Via Live Server (VS Code / Kiro IDE)** *(direkomendasikan)*
   - Install ekstensi **Live Server**.
   - Klik kanan `index.html` → *Open with Live Server*.
   - Perubahan akan langsung terlihat tanpa refresh manual.

> Tidak perlu Node.js, npm, atau server khusus — semua berjalan murni di browser.

---

## ✅ Fitur Lengkap

### 1. Jam Digital & Tanggal
- Jam HH:MM:SS yang diperbarui setiap detik.
- Tanggal lengkap dalam Bahasa Indonesia (hari, tanggal, bulan, tahun).
- Sapaan otomatis berdasarkan waktu:
  | Waktu | Sapaan |
  |-------|--------|
  | 05:00 – 11:59 | Selamat Pagi ☀️ |
  | 12:00 – 14:59 | Selamat Siang 🌤 |
  | 15:00 – 18:59 | Selamat Sore 🌅 |
  | 19:00 – 04:59 | Selamat Malam 🌙 |

### 2. Focus Timer (Pomodoro)
- Default 25 menit, dapat diatur 1–120 menit.
- Tombol **Start**, **Stop (jeda)**, **Reset**.
- Indikator warna: hijau saat berjalan, oranye saat dijeda, merah saat selesai.
- Bunyi notifikasi & toast saat waktu habis.

### 3. To-Do List
- **Tambah** tugas via input + tombol atau tekan Enter.
- **Tandai selesai** via checkbox.
- **Edit** via tombol ✏️ (modal popup).
- **Hapus** per item via tombol 🗑️.
- **Hapus semua tugas selesai** sekaligus.
- Disimpan di `localStorage` — data tetap ada setelah browser ditutup.

### 4. Quick Links
- Tambah nama + URL favorit.
- Buka link di tab baru.
- Favicon otomatis dari Google S2.
- Hapus link yang tidak diperlukan.
- Disimpan di `localStorage`.

---

## 🏆 Three Challenges

| # | Challenge | Implementasi |
|---|-----------|-------------|
| 1 | **Custom Name pada Greeting** | Modal nama muncul saat pertama buka. Nama disimpan di `localStorage` dan ditampilkan di header. Tombol ✏️ untuk mengubah kapan saja. |
| 2 | **Mencegah Tugas Duplikat** | Perbandingan case-insensitive + trim sebelum menambah/mengedit tugas. Pesan error inline muncul jika duplikat. |
| 3 | **Mengurutkan Tugas** | Dropdown dengan 4 opsi: Default (urutan input), A → Z, Selesai di Bawah, Selesai di Atas. Sorting tanpa mengubah data asli. |

---

## 🧪 Cara Menguji

### Clock & Greeting
- Buka halaman → jam berdetak setiap detik.
- Untuk menguji semua sapaan, ubah jam sistem komputer sementara.

### Focus Timer
1. Klik **▶ Start** → tampilan berubah hijau, hitung mundur berjalan.
2. Klik **⏸ Stop** → timer berhenti, tampilan oranye.
3. Klik **▶ Start** lagi → lanjut dari titik berhenti.
4. Klik **↺ Reset** → kembali ke durasi awal.
5. Atur durasi ke `1` menit → klik **Set** → **Start** → tunggu habis → cek bunyi & toast.

### To-Do List
1. Tambah tugas "Belajar HTML" → muncul di daftar.
2. Tambah tugas yang sama "belajar html" → pesan duplikat muncul (Challenge 2).
3. Centang tugas → teks dicoret, latar berubah hijau muda.
4. Klik ✏️ → edit teks → simpan.
5. Ubah dropdown sort → urutan daftar berubah (Challenge 3).
6. Tutup browser → buka kembali → tugas masih ada (localStorage).
7. Klik "🗑 Hapus Tugas Selesai" → hanya tugas selesai yang hilang.

### Custom Name (Challenge 1)
1. Pertama buka → modal nama muncul otomatis.
2. Masukkan nama → klik Simpan → nama tampil di header.
3. Klik ✏️ Ubah Nama → ganti nama → simpan.
4. Refresh halaman → nama tetap tersimpan.

### Quick Links
1. Masukkan nama "Google" + URL "google.com" → klik Tambah.
2. URL tanpa `https://` akan ditambah otomatis.
3. Klik nama link → terbuka di tab baru.
4. Hapus link → hilang dari daftar.
5. Refresh → link masih ada.

---

## 📱 Responsivitas
- **Laptop/Desktop**: Grid 2 kolom, timer full-width di atas.
- **Tablet (≤768px)**: Grid 1 kolom, ukuran font menyesuaikan.
- **HP (≤480px)**: Tampilan kompak, kolom URL link disembunyikan.

---

## 🛠 Teknologi

| Teknologi | Penggunaan |
|-----------|-----------|
| HTML5 Semantik | Struktur aksesibel (ARIA, roles) |
| CSS3 Custom Properties | Tema warna konsisten, animasi |
| CSS Grid & Flexbox | Layout responsif |
| Vanilla JavaScript (ES6+) | Semua logika interaksi |
| Web Storage API | Persistensi data di browser |
| Web Audio API | Bunyi notifikasi timer |

---

*Dibuat untuk tugas Coding Camp — © 2026 Sribintang17*
