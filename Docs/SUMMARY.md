# Ringkasan Project — DIUDARA Hi-Fi Mockup

> File ini diupdate otomatis setiap akhir sesi lewat `/end-session`. Selalu dibaca
> pertama kali oleh `/start-session`. Jaga tetap ringkas — detail panjang taruh di file
> plan masing-masing di `Docs/pending_works/` atau `Docs/completed_works/`.

## Status saat ini

Halaman yang sudah ada: Discover, Community Home (tab Feed/Konten/Anggota/Kalender/
Pengumuman/Dokumen), Live Room, Checkout, Creator Dashboard (per-komunitas, route
`/creator/dashboard/:id`), Pulse-ID Onboarding. Semua data dummy di `src/data/mock.ts`.
Sudah deploy ke Vercel (`diudara.vercel.app`).

Design system global sudah dibangun: `Sidebar` (bisa collapse, dropdown submenu
Komunitas/Dashboard Creator), `Header` (judul + breadcrumb + notifikasi + avatar,
opsional `insetDivider`), `PageContainer` — semua di `src/components/layout/`. Ikon
pakai Font Awesome (emoji cuma dipakai di chat). Logo & favicon di `src/assets/`
(`logo-dark/light.svg`, `icon-dark/light.svg`).

## Sedang dikerjakan

_(kosong — belum ada plan aktif)_

## Sudah selesai

_(kosong — belum ada plan yang di-log lewat workflow ini; halaman awal dibuat sebelum
workflow Docs/ ini ada)_

## Keputusan desain penting

- Palet warna: "Udara — Langit & Sinyal" (lihat `src/styles/tokens.css`)
- Font: Bricolage Grotesque (display) + Plus Jakarta Sans (body/UI)
- Stack: React + Vite + TypeScript, plain CSS (bukan Tailwind), React Router
- Semua konten dummy Bahasa Indonesia, tidak ada koneksi backend/database
