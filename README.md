# DIUDARA — Hi-Fi Mockup

Mockup frontend statis (React + Vite), tanpa database, sebagai referensi UI/UX untuk tim development.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Halaman yang tersedia

| Route | Halaman |
|---|---|
| `/discover` | Jelajahi & cari komunitas |
| `/community/:id` | Halaman komunitas — tab Feed, Content, Members |
| `/live/:id` | Live Room (video call UI) |
| `/checkout/:id` | Pilih tier & metode pembayaran |
| `/creator/dashboard` | Dashboard analytics untuk creator |
| `/onboarding` | Pulse-ID — AI co-builder setup komunitas |

ID komunitas yang tersedia di data dummy: `bimbel-sbmptn`, `coaching-bisnis`, `kajian-online`,
`finansial-cerdas`, `desain-ui`, `content-creator` (lihat `src/data/mock.ts`).

## Deploy ke Vercel

1. Push folder ini ke repository GitHub baru (terpisah dari monorepo `diudara`, atau sebagai branch/folder referensi).
2. Import repo tersebut di [vercel.com/new](https://vercel.com/new).
3. Vercel otomatis mendeteksi Vite — tidak perlu ubah build settings.
4. `vercel.json` sudah disiapkan supaya client-side routing (React Router) tidak 404 saat refresh di route selain `/`.

## Struktur

```
src/
  components/
    layout/AppShell.tsx   — sidebar navigasi utama
    ui/Avatar.tsx
  data/mock.ts             — semua data dummy Bahasa Indonesia
  pages/                   — satu file per halaman
  styles/tokens.css        — design tokens: palet Udara + tipografi
```

## Design tokens

Warna dan font didefinisikan sebagai CSS variables di `src/styles/tokens.css`
(palet "Udara — Langit & Sinyal", font Bricolage Grotesque + Plus Jakarta Sans).
Ubah di satu tempat ini untuk memengaruhi seluruh halaman.

## Catatan

Ini murni mockup statis untuk referensi visual/interaksi — semua data dummy, tidak ada
pemanggilan API sungguhan, tidak terhubung ke backend `apps/api` di repo utama. Komponen
di sini ditulis dengan struktur yang gampang di-port ke `apps/web` (yang juga React + Vite)
kalau tim mau reuse langsung.
