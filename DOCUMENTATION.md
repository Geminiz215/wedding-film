# Dokumentasi — Undangan Pernikahan "Cinematic Memories"

Undangan digital bertema film, dibuat dengan **Next.js (App Router)** + **Tailwind CSS v3** + **GSAP** (animasi) + **Lenis** (smooth scroll).

## Menjalankan

```bash
npm install      # sekali saja
npm run dev      # mode pengembangan → http://localhost:3000
npm run build    # build produksi
npm start        # jalankan hasil build
```

Nama tamu bisa dipersonalisasi lewat URL: `http://localhost:3000/?to=Nadya+%26+Raka`
(nama muncul di layar pembuka & otomatis terisi di form RSVP).

---

## Struktur File

```
wedding-invitation/
├── app/
│   ├── layout.jsx          ← <html>, <head>, Google Fonts, judul tab browser
│   ├── page.jsx            ← halaman utama: menyusun semua section + state musik & popup peta
│   └── globals.css         ← CSS custom (grain, vignette, flicker, billing block, dll.)
│
├── data/
│   └── wedding.js          ← ★ SEMUA KONTEN UNDANGAN (edit di sini)
│
├── components/
│   ├── FilmImage.jsx       ← <img> + gambar cadangan jika link foto gagal
│   ├── FilmLeader.jsx      ← layar pembuka hitung mundur 3-2-1 + tombol masuk
│   ├── CinemaOverlays.jsx  ← efek film grain, light leak, vignette, kursor emas
│   ├── Header.jsx          ← navigasi atas + timecode
│   ├── SoundToggle.jsx     ← tombol musik pojok kanan bawah
│   ├── MapModal.jsx        ← popup info lokasi venue
│   └── sections/
│       ├── Hero.jsx        ← 1. judul besar + nama mempelai + tanggal
│       ├── Credits.jsx     ← 2. mempelai & orang tua + kutipan
│       ├── Story.jsx       ← 3. cerita perjalanan (scenes)
│       ├── Gallery.jsx     ← 4. galeri foto (stills)
│       ├── Schedule.jsx    ← 5. jadwal akad & resepsi, billing block, alamat, amplop digital
│       ├── Rsvp.jsx        ← 6. form RSVP + daftar ucapan
│       └── Closing.jsx     ← 7. penutup "FIN."
│
├── lib/
│   ├── cinematicScroll.js  ← smooth scroll + semua animasi scroll (GSAP)
│   ├── filmScore.js        ← musik latar (dibuat dengan Web Audio API, tanpa file mp3)
│   └── guest.js            ← membaca nama tamu dari URL (?to= / ?guest=)
│
├── tailwind.config.js      ← warna tema (film-gold, film-cream, …), font, letter-spacing
├── postcss.config.js
├── jsconfig.json           ← alias import "@/..."
└── package.json
```

**Aturan praktis:** mau ganti *isi* → buka `data/wedding.js`. Mau ganti *tampilan/tata letak* → buka komponen di `components/sections/`.

---

## Isi `data/wedding.js`

| Export          | Isi                                                                  | Dipakai di                    |
|-----------------|----------------------------------------------------------------------|-------------------------------|
| `bride`, `groom`| nama, urutan anak, nama orang tua                                    | Hero, Credits, Closing, judul |
| `families`      | nama keluarga besar                                                  | Credits                       |
| `dates`         | tanggal dalam beberapa format + batas RSVP                           | Hero, Schedule, Rsvp, Closing |
| `venue`         | nama, alamat, catatan, GPS, link Google Maps, teks yang disalin      | Hero, Schedule, MapModal      |
| `hero`          | tagline + 2 foto hero (background & foto pasangan)                   | Hero                          |
| `quote`         | baris-baris kutipan + sumber                                         | Credits                       |
| `scenes`        | daftar cerita: judul, tanggal, teks, kutipan, timecode, foto, layout | Story                         |
| `stills`        | daftar foto galeri: posisi grid, rasio, label film, caption          | Gallery                       |
| `events`        | akad & resepsi: jam, lokasi, dress code, deskripsi                   | Schedule                      |
| `billing`       | kredit ala poster film (pasangan `[peran, nama]` per baris)          | Schedule                      |
| `giftAccounts`  | rekening bank (nomor disalin otomatis tanpa spasi)                   | Schedule                      |
| `initialWishes` | contoh ucapan yang tampil di awal                                    | Rsvp                          |

### Menambah / menghapus scene atau foto galeri
Cukup tambah/hapus satu objek di array `scenes` atau `stills`. Contoh scene baru:

```js
{
  layout: 'right',              // 'left' | 'right' | 'offset'
  number: 'SCENE 04',
  date: 'JANUARY 2026',
  title: 'INT. FAMILY HOME — EVENING',
  story: 'Teks cerita...',
  quote: '“Kutipan...”',
  timecode: 'TC 01:42:10:00 // 35MM',
  image: { src: 'https://...', fallback: 'https://placehold.co/1200x750', alt: 'Deskripsi foto' },
},
```

---

## Mengubah Ukuran Gambar

Ada 4 hal berbeda yang bisa disebut "ukuran gambar":

### 1. Rasio (bentuk) foto — `aspect`
Untuk galeri, ubah field `aspect` di `stills`:

```js
aspect: 'aspect-[16/10]',   // lebar
aspect: 'aspect-[4/5]',     // potret
aspect: 'aspect-square',    // kotak 1:1
aspect: 'aspect-[21/9]',    // sinematik super lebar
```

Untuk cerita (scenes), rasio ditentukan oleh `layout` di `components/sections/Story.jsx` → objek `LAYOUTS`
(`left`/`right` = `aspect-[16/10]`, `offset` = `aspect-[4/3]`).

### 2. Lebar foto di layar (berapa kolom) — `className`
Galeri memakai grid **12 kolom** (berlaku di layar ≥ 768px / `md:`). Ubah `className` di `stills`:

```js
className: 'md:col-span-7',                 // lebar 7 dari 12 kolom
className: 'md:col-span-5 md:mt-24',        // 5 kolom, digeser turun
className: 'md:col-span-10 md:col-start-2', // 10 kolom, mulai kolom ke-2 (tengah)
className: 'md:col-span-12',                // selebar penuh
```

Satu baris idealnya berjumlah 12 (mis. 7 + 5). Untuk scenes, ubah `photo` di `LAYOUTS` (`lg:col-span-7`, dst.).

### 3. Ukuran foto di hero
Di `components/sections/Hero.jsx`, bingkai foto pasangan:

```jsx
<div className="w-[88vw] md:w-[66vw] h-[68vh] ...">
```
`w-[88vw]` = 88% lebar layar (HP), `md:w-[66vw]` = 66% (desktop), `h-[68vh]` = 68% tinggi layar.

### 4. Resolusi file yang diunduh — parameter `w=` di URL
Link Unsplash memiliki `&w=1400&q=80`. `w` = lebar piksel, `q` = kualitas. Turunkan (mis. `w=1000&q=75`)
agar undangan lebih cepat dibuka di HP; naikkan untuk foto yang tampil sangat lebar.

### Memakai foto sendiri
Taruh file di folder `public/` (buat jika belum ada), misalnya `public/photos/scene-01.jpg`, lalu:

```js
image: { src: '/photos/scene-01.jpg', fallback: '', alt: 'Scene 01' },
```
Kompres foto dulu (lebar ±1400px, < 300 KB) supaya ringan.

> ⚠️ **Penting soal Tailwind:** tulis nama class secara utuh, misalnya `'aspect-[3/2]'`.
> Jangan dirangkai dari variabel seperti `` `aspect-[${a}/${b}]` `` — Tailwind tidak akan mendeteksinya
> dan style-nya tidak muncul. File di `data/` sudah ikut dipindai Tailwind (lihat `tailwind.config.js` → `content`).

---

## Mengubah Hal Lain

| Ingin mengubah…                         | Buka                                                             |
|-----------------------------------------|------------------------------------------------------------------|
| Warna tema emas/krem/latar              | `tailwind.config.js` → `colors.film` (+ `:root` di `globals.css`)|
| Font                                    | `app/layout.jsx` (link Google Fonts) + `tailwind.config.js`      |
| Menu navigasi atas                      | `components/Header.jsx` → `NAV_LINKS`                            |
| Kecepatan/efek animasi scroll           | `lib/cinematicScroll.js`                                         |
| Akor/volume musik                       | `lib/filmScore.js` → `CHORDS`, `masterGain`                      |
| Lama hitung mundur pembuka              | `components/FilmLeader.jsx` (`count = 3`, interval `900` ms)     |
| Intensitas film grain                   | `components/CinemaOverlays.jsx` → `opacity-[0.06]` pada canvas   |

## Catatan
- **Ucapan RSVP belum tersimpan ke server.** Ucapan baru hanya tampil di browser tamu itu sendiri dan hilang saat
  halaman di-refresh — sama seperti versi HTML sebelumnya. Untuk menyimpan sungguhan, sambungkan `handleSubmit`
  di `components/sections/Rsvp.jsx` ke Google Sheets / Supabase / API route.
- Tombol "copy" memakai Clipboard API, yang hanya berfungsi di **https** atau `localhost`.
- File lama `cinematic_memories_wedding_invitation.html` tidak dipakai lagi; simpan sebagai referensi atau hapus.
