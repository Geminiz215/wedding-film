// ============================================================
//  SEMUA KONTEN UNDANGAN ADA DI FILE INI.
//  Ganti teks, tanggal, foto, rekening, dll. di sini saja —
//  komponen di /components otomatis mengikuti.
// ============================================================

// ---------- Mempelai ----------
export const bride = {
  name: 'Syifa',
  childOf: 'PUTRI PERTAMA DARI',
  parents: 'BAPAK HENDRA WIDYA & IBU RATNA SARI',
};

export const groom = {
  name: 'Farhat',
  childOf: 'PUTRA KEDUA DARI',
  parents: 'BAPAK SURYA MAHENDRA & IBU DEWI LESTARI',
};

export const families = 'KELUARGA BESAR WIDYA & KELUARGA BESAR MAHENDRA';

// ---------- Tanggal (beberapa format dipakai di tempat berbeda) ----------
export const dates = {
  pageTitle: '24.10.2026', // judul tab browser
  hero: '24 . 10 . 2026', // badge "PREMIERING" di hero
  callSheet: 'SATURDAY, OCTOBER 24TH, 2026', // baris atas section jadwal
  closing: 'OCTOBER 24, 2026', // kartu "FIN."
  rsvpDeadline: 'OCTOBER 10TH, 2026',
};

// ---------- Lokasi ----------
export const venue = {
  name: 'Pine Hill Sanctuary',
  heroLine: 'PINE HILL SANCTUARY — LEMBANG, BANDUNG',
  region: 'BANDUNG HIGHLANDS',
  address: 'Jalan Maribaya Timur Kp. Cibeunying Kaler, Lembang, Bandung Barat',
  billingAddress: 'JALAN MARIBAYA TIMUR, LEMBANG, BANDUNG',
  copyText: 'Pine Hill Sanctuary, Jalan Maribaya Timur, Lembang, Bandung Barat',
  note: 'Terletak di ketinggian 1.200 MDPL dengan udara sejuk hutan pinus. Kami menyarankan tamu undangan mengenakan pakaian hangat atau selendang tambahan untuk acara malam hari.',
  gps: `6°49'30.4"S 107°39'54.2"E`,
  mapsUrl: 'https://maps.google.com/?q=Pine+Hill+Cibodas+Lembang+Bandung',
};

// ---------- Hero ----------
export const hero = {
  tagline: 'In the Mood for Forever',
  background: {
    src: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1800&q=85',
    fallback: 'https://placehold.co/1800x1200/1A120B/E8B84B?text=Misty+Pine+Landscape',
    alt: 'Misty Morning Pine Forest Landscape',
  },
  couplePhoto: {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80',
    fallback: 'https://placehold.co/1400x900/2B1D12/E8B84B?text=Golden+Hour+Silhouette',
    alt: 'Couple in Warm Golden Light',
  },
};

// ---------- Kutipan di bawah nama mempelai ----------
export const quote = {
  lines: [
    '“Kita tidak bertemu secara kebetulan;',
    'kita adalah dua adegan panjang yang akhirnya',
    'menemukan satu layar yang sama.”',
  ],
  source: '— DIALOGUE FROM ACT I (OSLO / JAKARTA, 2021)',
};

// ---------- Cerita (Scenes) ----------
// layout: 'left'   = foto kiri, teks kanan
//         'right'  = teks kiri, foto kanan
//         'offset' = foto lebih kecil & bergeser, rasio 4:3
export const scenes = [
  {
    layout: 'left',
    number: 'SCENE 01',
    date: 'OCTOBER 2021',
    title: 'INT. RETROSPECTIVE SCREENING — NIGHT',
    story:
      'Hujan deras membasahi lobi bioskop independen di sudut Cikini. Dua kursi tersisa di baris tengah saat pemutaran ulang film Wong Kar-wai. Sebuah payung yang tertukar di pintu keluar menjadi dialog pembuka yang tak pernah direncanakan dalam naskah siapa pun.',
    quote: '“Apakah kursi di sebelahmu sudah ada pemiliknya?”',
    timecode: 'TC 00:14:22:08 // 35MM',
    image: {
      src: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=80',
      fallback: 'https://placehold.co/1200x750/2B1D12/E8B84B?text=Scene+01+Rainy+Afternoon',
      alt: 'Scene 01 — Rainy Art House Cinema',
    },
  },
  {
    layout: 'right',
    number: 'SCENE 02',
    date: 'MAY 2023',
    title: 'EXT. MISTY HIGHLANDS — DAWN',
    story:
      'Perjalanan darat pertama menembus kabut pagi perbukitan Ciwidey. Dengan termos kopi hangat dan kamera analog tua, kami menyadari bahwa keheningan bersama jauh lebih menenangkan daripada ribuan percakapan riuh di kota.',
    quote: '“Beberapa tempat terasa seperti rumah, bahkan sebelum kita tiba.”',
    timecode: 'TC 00:48:11:19 // 50MM ANAMORPHIC',
    image: {
      src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80',
      fallback: 'https://placehold.co/1200x750/2B1D12/E8B84B?text=Scene+02+Misty+Hills',
      alt: 'Scene 02 — Misty Highlands',
    },
  },
  {
    layout: 'offset',
    number: 'SCENE 03',
    date: 'DECEMBER 2025',
    title: 'EXT. SOUTHERN COASTLINE — GOLDEN HOUR',
    story:
      'Di bawah langit senja berwarna kuning keemasan dan deru ombak pantai selatan, sebuah pertanyaan sederhana diucapkan tanpa gemerlap panggung—hanya angin laut, cincin keluarga, dan mata yang berkaca-kaca.',
    quote: '“Maukah kau menulis babak-babak berikutnya bersamaku?”',
    timecode: 'TC 01:19:05:02 // GOLDEN HOUR',
    image: {
      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
      fallback: 'https://placehold.co/1200x900/2B1D12/E8B84B?text=Scene+03+Golden+Coast',
      alt: 'Scene 03 — Golden Hour Coastline',
    },
  },
];

// ---------- Galeri (Stills) ----------
// className = posisi di grid 12 kolom; aspect = rasio foto
// subtitle (opsional) = teks yang "terbakar" di dalam foto
export const stills = [
  {
    className: 'md:col-span-7',
    aspect: 'aspect-[16/10]',
    stock: 'KODAK PORTRA 400',
    frame: 'FRAME 23A',
    caption: 'FIG. 01 — WHISPERS IN THE PINES',
    exposure: 'f/1.4 • 1/250s',
    image: {
      src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80',
      fallback: 'https://placehold.co/1200x750/1A120B/E8B84B?text=Frame+23A',
      alt: 'Frame 23A — Intimate Hold',
    },
  },
  {
    className: 'md:col-span-5 md:mt-24',
    aspect: 'aspect-[4/5]',
    stock: 'KODAK PORTRA 400',
    frame: 'FRAME 24A',
    caption: 'FIG. 02 — THE QUIET EMBRACE',
    exposure: 'f/2.0 • 1/500s',
    image: {
      src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
      fallback: 'https://placehold.co/900x1125/1A120B/E8B84B?text=Frame+24A',
      alt: 'Frame 24A — Warm Embrace',
    },
  },
  {
    className: 'md:col-span-5 md:-mt-12',
    aspect: 'aspect-[4/5]',
    stock: 'ILFORD HP5 WARM',
    frame: 'FRAME 25B',
    caption: 'FIG. 03 — GOLDEN DUSK',
    exposure: 'f/1.8 • 1/1000s',
    image: {
      src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80',
      fallback: 'https://placehold.co/900x1125/1A120B/E8B84B?text=Frame+25B',
      alt: 'Frame 25B — Sunset Silhouette',
    },
  },
  {
    className: 'md:col-span-7 md:mt-12',
    aspect: 'aspect-[16/9]',
    stock: 'KODAK VISION3 500T',
    frame: 'FRAME 26A',
    caption: 'FIG. 04 — HORIZON OF PROMISE',
    exposure: 'f/2.8 • 1/125s',
    image: {
      src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
      fallback: 'https://placehold.co/1400x800/1A120B/E8B84B?text=Frame+26A',
      alt: 'Frame 26A — Sunbeams Over Valley',
    },
  },
  {
    className: 'md:col-span-10 md:col-start-2 mt-6 md:p-4',
    aspect: 'aspect-[21/9]',
    stock: 'PANAVISION ANAMORPHIC',
    frame: 'MASTER FRAME 27C',
    caption: 'FIG. 05 — THE FINAL REHEARSAL',
    exposure: '2.39:1 CINEMASCOPE',
    subtitle: '“And in that warm autumn light, time stood still.”',
    image: {
      src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
      fallback: 'https://placehold.co/1600x685/1A120B/E8B84B?text=Master+Frame+27C',
      alt: 'Frame 27C — Valley of Golden Light',
    },
  },
];

// ---------- Acara (Akad & Resepsi) ----------
export const events = [
  {
    act: 'ACT I — THE VOWS',
    reel: 'REEL 01A',
    title: 'AKAD NIKAH',
    subtitle: 'The Sacred Matrimony Ceremony',
    timeLabel: 'CALL TIME',
    time: '15:00 — 16:30 WIB',
    location: 'GLASS CHAPEL, PINE HILL',
    extraLabel: 'ATMOSPHERE',
    extra: 'INTIMATE & SOLEMN',
    description:
      'Dihadiri oleh keluarga inti dan sahabat terdekat di tengah hutan pinus sore hari saat cahaya keemasan menembus pepohonan.',
  },
  {
    act: 'ACT II — THE CELEBRATION',
    reel: 'REEL 02B',
    title: 'EVENING RECEPTION',
    subtitle: 'Under the Stars Soirée & Toast',
    timeLabel: 'DOORS OPEN',
    time: '18:30 — 21:30 WIB',
    location: 'AMPHITHEATRE LAWN',
    extraLabel: 'WARDROBE CODE',
    extra: 'WARM EARTH, ESPRESSO & GOLD',
    description:
      'Perjamuan makan malam hangat di bawah lampu gantung temaram, iringan kuartet jazz klasik, dan pemutaran film pendek perjalanan kami.',
  },
];

// ---------- Billing block (kredit ala poster film) ----------
// Setiap baris = array pasangan [peran, nama]. Baris baru hanya terlihat di layar >= sm.
export const billing = [
  [
    ['PICTURES PRESENTS', bride.name],
    ['AND', groom.name],
    ['IN', '“CINEMATIC MEMORIES”'],
  ],
  [
    ['EXECUTIVE PRODUCERS', 'KEL. HENDRA WIDYA'],
    ['&', 'KEL. SURYA MAHENDRA'],
    ['CINEMATOGRAPHY', 'ANALOG FRAMES STUDIO'],
  ],
  [
    ['PRODUCTION DESIGN', 'PINE HILL SANCTUARY'],
    ['ORIGINAL SCORE', 'AUTUMN QUARTET'],
    ['FILMED AT', venue.billingAddress],
  ],
];

// ---------- Amplop digital ----------
export const giftAccounts = [
  { bank: 'BCA // ARCHIVE ACCOUNT', number: '8420 1928 44', owner: 'A.N. SYIFA' },
  { bank: 'MANDIRI // ARCHIVE ACCOUNT', number: '1310 0982 7712 4', owner: 'A.N. FARHAT' },
];

// ---------- Ucapan awal (contoh) ----------
export const initialWishes = [
  {
    name: 'Laras & Dimas',
    note: 'ATTENDING PREMIERE • 02 SEATS',
    message:
      'Semoga pernikahan kalian seperti film klasik yang tak lekang oleh waktu—selalu hangat setiap kali diputar kembali. Sampai jumpa di Lembang!',
  },
  {
    name: 'Rendra Prakoso',
    note: 'ATTENDING PREMIERE • 01 SEAT',
    message:
      'Masih ingat hari hujan di Cikini waktu kalian pertama kali cerita. Selamat menempuh babak paling indah, Syifa & Farhat.',
  },
  {
    name: 'Clara & Jonathan',
    note: 'AFAR (WARM REGARDS)',
    message:
      'Wishing you both a lifetime of golden hours, quiet morning coffees, and endless laughter. Here’s to forever!',
  },
  {
    name: 'Keluarga Besar Santoso',
    note: 'ATTENDING PREMIERE • 02 SEATS',
    message:
      'Selamat berbahagia untuk Syifa dan Farhat. Semoga cinta dan kasih sayang selalu menyertai rumah tangga kalian.',
  },
];
