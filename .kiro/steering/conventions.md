---
inclusion: always
---

# Coding Conventions – Life Dashboard

Panduan ini berlaku untuk semua perubahan kode pada project ini.

## HTML
- Gunakan elemen semantik (`<header>`, `<main>`, `<section>`, `<ul>`, dll.)
- Setiap elemen interaktif harus punya atribut `aria-label` atau `aria-labelledby`
- Gunakan `hidden` attribute untuk menyembunyikan elemen (bukan `display:none` inline)
- Input harus punya `maxlength` dan validasi di JS sebelum diproses

## CSS
- Semua nilai warna dan ukuran berulang **wajib** memakai CSS Custom Properties di `:root`
- Urutan properti: positioning → box model → typography → visual → misc
- Breakpoint responsif: `768px` (tablet) dan `480px` (mobile)
- Gunakan `transition` untuk semua perubahan visual interaktif
- Jangan gunakan `!important`

## JavaScript
- Mode `'use strict'` di baris pertama
- Semua ID element diakses via helper `const $ = (id) => document.getElementById(id)`
- Data To-Do dan Quick Links disimpan sebagai array of objects di `localStorage`
- Selalu sanitasi output HTML menggunakan `escHtml()` sebelum di-render ke DOM
- Validasi input: trim whitespace, cek kosong, cek duplikat (case-insensitive)
- Tidak ada `console.log` atau kode debug yang tertinggal di commit final

## Penamaan
- Variabel & fungsi: `camelCase`
- Konstanta global: `UPPER_SNAKE_CASE`
- ID elemen HTML: `kebab-case`
- Class CSS: BEM-light (`block__element--modifier`)

## Larangan
- ❌ Jangan tambah file CSS atau JS baru (hanya `style.css` dan `script.js`)
- ❌ Jangan pakai `innerHTML` untuk teks dari input user tanpa sanitasi
- ❌ Jangan pakai `eval()` atau `Function()` konstruktor
- ❌ Jangan tambah dependensi eksternal (npm, CDN library, framework)
