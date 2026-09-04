# Log Perubahan

> Append-only. Entri baru selalu ditambahkan di PALING BAWAH file ini lewat
> `/end-session`. Jangan edit atau hapus entri lama.

## [2026-09-04 17:10] Setup awal — mockup dasar & workflow Docs

- Plan: -
- Status: selesai penuh
- Perubahan:
  - Setup project React + Vite + TypeScript
  - Buat 6 halaman inti: Discover, Community Home, Live Room, Checkout, Creator
    Dashboard, Pulse-ID Onboarding
  - Setup design tokens palet "Udara — Langit & Sinyal" + tipografi Bricolage
    Grotesque/Plus Jakarta Sans
  - Push ke GitHub (`adamfloothink/diudara`), deploy ke Vercel (`diudara.vercel.app`)
  - Setup workflow `Docs/` (SUMMARY, LOG, pending_works, completed_works) dan slash
    command `/start-session`, `/end-session` untuk Claude Code
- File terdampak: seluruh `src/`, `CLAUDE.md`, `.claude/commands/*`, `Docs/*`
- Catatan: ini baseline sebelum workflow Docs/ dipakai secara rutin. Sesi berikutnya
  seharusnya sudah mulai pakai `/start-session` dan `/end-session` secara konsisten.

## [2026-09-04 21:20] Design system global (sidebar, header, body) + fitur Community Home

- Plan: - (kerjaan ad-hoc, bukan dari pending_works — belum ada plan file dibuat)
- Status: selesai penuh
- Perubahan:
  - Bangun komponen layout global reusable: `Sidebar`, `Header`, `PageContainer`
    (`src/components/layout/`), dipakai di semua 6 halaman
  - Sidebar: collapsible, dropdown submenu untuk "Komunitas" (komunitas yang
    di-join) dan "Dashboard Creator" (komunitas yang dikelola), border + radius
    100% pada semua menu, logo Diudara + icon-only saat collapsed
  - Header: judul + breadcrumb opsional + notifikasi + avatar, slot `actions` untuk
    search/filter per halaman, divider inset/full-bleed tergantung ada-tidaknya
    sidebar
  - Ganti semua ikon emoji ke Font Awesome (emoji cuma tersisa di konten chat)
  - Community Home: tambah 3 tab baru (Kalender — termasuk grid kalender bulanan
    visual, Pengumuman — dengan badge "Baru", Dokumen/Library — daftar file);
    rename tab Content→Konten, Members→Anggota, Library→Dokumen; tab Konten jadi
    layout 2 kolom (menu materi + detail viewer video/audio/dokumen); banner
    komunitas jadi floating card dengan kontras teks otomatis
  - Creator Dashboard sekarang per-komunitas (route `/creator/dashboard/:id`,
    data di `creatorStatsByCommunity`), tambah card "Dokumen paling banyak
    diunduh"
  - Sistem warna tombol global dirapikan (radius pill, aturan hover/opacity/kontras
    konsisten) di `src/styles/tokens.css`
  - Tambah favicon (`icon-light.svg`) dan aset logo baru di `src/assets/`
- File terdampak: `src/components/layout/*` (baru), `src/pages/*.tsx`,
  `src/data/mock.ts`, `src/styles/tokens.css`, `src/App.tsx`, `index.html`,
  `src/assets/*` (baru)
- Catatan: banyak keputusan desain kecil diputuskan on-the-fly lewat obrolan
  panjang (bukan dari plan tertulis) — kalau mau, sesi depan bisa tulis ringkasan
  aturan desain ini jadi 1 plan/reference file di `Docs/` biar tidak hilang
  konteksnya. Favicon `icon-light.svg` warnanya nyaris putih (`#f4f7fa`) — kurang
  kontras di tab browser mode terang, mungkin perlu direvisi ke `icon-dark.svg`.
