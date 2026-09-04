export const currentUser = {
  name: "Rangga Putra",
  handle: "@ranggap",
  avatarColor: "#93A8C2",
  initials: "RP",
};

export type Community = {
  id: string;
  name: string;
  niche: string;
  category: string;
  members: string;
  price: string;
  billing: string;
  description: string;
  color: string;
  isLive?: boolean;
  liveViewers?: number;
  trending?: boolean;
};

export const communities: Community[] = [
  {
    id: "bimbel-sbmptn",
    name: "Bimbel Matematika Pak Andi",
    niche: "Edukasi",
    category: "Bimbel & Ujian",
    members: "1.240",
    price: "Rp149.000",
    billing: "/ bulan",
    description: "Kelas persiapan SBMPTN dengan diskusi soal harian dan sesi tanya-jawab langsung.",
    color: "var(--langit)",
    isLive: true,
    liveViewers: 128,
    trending: true,
  },
  {
    id: "coaching-bisnis",
    name: "Scale Up Business Circle",
    niche: "Bisnis",
    category: "Coaching Bisnis",
    members: "860",
    price: "Rp299.000",
    billing: "/ bulan",
    description: "Komunitas founder dan pelaku UMKM untuk saling berbagi strategi pertumbuhan.",
    color: "var(--hijau-lepas)",
  },
  {
    id: "kajian-online",
    name: "Kajian Rutin Ba'da Maghrib",
    niche: "Kajian",
    category: "Kajian & Rohani",
    members: "3.420",
    price: "Gratis",
    billing: "",
    description: "Kajian rutin online setiap hari, terbuka untuk umum dengan donasi sukarela.",
    color: "var(--sinyal)",
  },
  {
    id: "finansial-cerdas",
    name: "Kelas Finansial Cerdas",
    niche: "Finansial",
    category: "Edukasi Finansial",
    members: "2.100",
    price: "Rp199.000",
    billing: "/ bulan",
    description: "Belajar mengatur keuangan pribadi, investasi dasar, dan bebas utang bersama mentor.",
    color: "var(--merah-senja)",
  },
  {
    id: "desain-ui",
    name: "UI/UX Practice ID",
    niche: "Desain",
    category: "Skill Digital",
    members: "540",
    price: "Rp99.000",
    billing: "/ bulan",
    description: "Latihan case study UI/UX mingguan dengan review langsung dari mentor.",
    color: "var(--kabut)",
  },
  {
    id: "content-creator",
    name: "Content Creator Hub",
    niche: "Konten",
    category: "Kreator & Media",
    members: "1.780",
    price: "Rp129.000",
    billing: "/ bulan",
    description: "Tempat berbagi strategi konten, kolaborasi, dan review video sesama kreator.",
    color: "var(--langit-light)",
  },
];

export const categories = [
  "Semua",
  "Bimbel & Ujian",
  "Coaching Bisnis",
  "Kajian & Rohani",
  "Edukasi Finansial",
  "Skill Digital",
  "Kreator & Media",
];

export const trendingTags = [
  "#SBMPTN2027",
  "#UMKM",
  "#InvestasiPemula",
  "#DesainUI",
  "#KontenKreator",
  "#ProduktivitasKerja",
];

export const forumPosts = [
  {
    id: 1,
    author: "Sari Wulandari",
    time: "2 jam lalu",
    title: "Ada yang mau bahas soal integral trigonometri?",
    body: "Aku masih bingung di bagian substitusi, ada yang bisa bantu jelasin dengan contoh soal?",
    tag: "Diskusi",
    replies: 23,
    active: true,
  },
  {
    id: 2,
    author: "Budi Prakoso",
    time: "5 jam lalu",
    title: "Rekomendasi jadwal belajar 3 bulan menjelang ujian",
    body: "Mau share jadwal belajar yang aku pakai, semoga bisa membantu teman-teman yang lain juga.",
    tag: "Sharing",
    replies: 41,
    active: false,
  },
  {
    id: 3,
    author: "Pak Andi (Mentor)",
    time: "1 hari lalu",
    title: "Pengumuman: sesi live tambahan Sabtu ini",
    body: "Karena banyak yang minta, kita adakan sesi live tambahan jam 19.00 WIB membahas soal try out kemarin.",
    tag: "Pengumuman",
    replies: 12,
    active: false,
  },
];

export const contentLibrary = [
  {
    id: "week-1",
    title: "Minggu 1 — Dasar Aljabar",
    lessons: 6,
    items: [
      { title: "Pengenalan fungsi kuadrat", type: "video", duration: "18:20" },
      { title: "Latihan soal aljabar dasar", type: "ebook", duration: "12 hal" },
      { title: "Kuis mingguan", type: "quiz", duration: "10 soal" },
    ],
  },
  {
    id: "week-2",
    title: "Minggu 2 — Trigonometri",
    lessons: 5,
    items: [
      { title: "Identitas trigonometri", type: "video", duration: "24:10" },
      { title: "Rekaman audio ringkasan", type: "audio", duration: "9:45" },
    ],
  },
  {
    id: "week-3",
    title: "Minggu 3 — Kalkulus Dasar",
    lessons: 7,
    items: [
      { title: "Limit dan turunan", type: "video", duration: "31:02" },
      { title: "Modul latihan integral", type: "ebook", duration: "20 hal" },
    ],
  },
];

export const members = [
  { name: "Sari Wulandari", role: "Member", status: "active", joined: "3 bulan lalu" },
  { name: "Budi Prakoso", role: "Member", status: "active", joined: "2 bulan lalu" },
  { name: "Dewi Anggraini", role: "Admin", status: "active", joined: "8 bulan lalu" },
  { name: "Fajar Nugroho", role: "Member", status: "pending", joined: "Baru bergabung" },
  { name: "Rina Kusuma", role: "Member", status: "churned", joined: "Berakhir 3 hari lalu" },
];

export const upcomingEvents = [
  { date: "12 Sep", title: "Live Q&A — Persiapan Try Out 3", time: "19:00 WIB" },
  { date: "15 Sep", title: "Kelas tambahan: Trigonometri lanjutan", time: "16:00 WIB" },
  { date: "20 Sep", title: "Sesi motivasi bersama alumni", time: "20:00 WIB" },
];

export const salesSummary = {
  totalRevenue: "Rp42.850.000",
  totalMembers: 1240,
  newMembersThisMonth: 86,
  churnRate: "3,2%",
  successRate: "94,6%",
};

export const revenueByMonth = [
  { month: "Apr", value: 28 },
  { month: "Mei", value: 34 },
  { month: "Jun", value: 31 },
  { month: "Jul", value: 40 },
  { month: "Agu", value: 38 },
  { month: "Sep", value: 46 },
];

export const activityLog = [
  { name: "Sari Wulandari", action: "bergabung sebagai member", time: "10 menit lalu", type: "join" },
  { name: "Budi Prakoso", action: "upgrade ke tier Pro", time: "1 jam lalu", type: "upgrade" },
  { name: "Rina Kusuma", action: "gagal pembayaran recurring", time: "3 jam lalu", type: "failed" },
  { name: "Fajar Nugroho", action: "keluar dari komunitas (churn)", time: "5 jam lalu", type: "churn" },
  { name: "Dewi Anggraini", action: "membeli konten \"Modul Kalkulus\"", time: "1 hari lalu", type: "purchase" },
];

export const liveParticipants = [
  { name: "Pak Andi", role: "Host", speaking: true },
  { name: "Sari Wulandari", role: "Peserta", speaking: false },
  { name: "Budi Prakoso", role: "Peserta", speaking: false, muted: true },
  { name: "Dewi Anggraini", role: "Co-host", speaking: false },
];

export const tiers = [
  {
    id: "basic",
    name: "Basic",
    price: "Rp79.000",
    billing: "/ bulan",
    benefits: ["Akses grup diskusi", "Materi dasar", "Notifikasi event"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "Rp149.000",
    billing: "/ bulan",
    benefits: ["Semua benefit Basic", "Sesi live mingguan", "Akses modul lengkap", "Prioritas tanya-jawab"],
    highlight: true,
  },
  {
    id: "vip",
    name: "VIP",
    price: "Rp349.000",
    billing: "/ bulan",
    benefits: ["Semua benefit Pro", "1-on-1 konsultasi bulanan", "Review tugas personal", "Sertifikat penyelesaian"],
  },
];

export const paymentMethods = [
  { id: "qris", name: "QRIS", note: "Bayar pakai aplikasi bank atau e-wallet apa saja" },
  { id: "ewallet", name: "E-Wallet", note: "GoPay, OVO, DANA, ShopeePay" },
  { id: "va", name: "Virtual Account", note: "BCA, Mandiri, BNI, BRI" },
  { id: "card", name: "Kartu Debit/Kredit", note: "Visa & Mastercard" },
];
