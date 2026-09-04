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

// Komunitas yang sudah diikuti (member) oleh user saat ini — dipakai di dropdown sidebar
export const myJoinedCommunityIds = ["bimbel-sbmptn", "kajian-online", "desain-ui"];

// Komunitas yang dibuat/dikelola user saat ini sebagai creator — dipakai di dropdown sidebar
export const myCreatedCommunityIds = ["bimbel-sbmptn", "finansial-cerdas"];

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

// Tab Kalender — gabungan jadwal live, event, dan materi pembelajaran
export const calendarSchedule = [
  { date: "10", month: "Sep", day: "Rabu", title: "Live Q&A — Fungsi Kuadrat", type: "live", time: "19:00 WIB" },
  { date: "12", month: "Sep", day: "Jumat", title: "Live Q&A — Persiapan Try Out 3", type: "live", time: "19:00 WIB" },
  { date: "14", month: "Sep", day: "Minggu", title: "Materi baru: Modul Kalkulus Dasar", type: "materi", time: "Rilis 08:00 WIB" },
  { date: "15", month: "Sep", day: "Senin", title: "Kelas tambahan: Trigonometri lanjutan", type: "event", time: "16:00 WIB" },
  { date: "18", month: "Sep", day: "Kamis", title: "Deadline kuis mingguan modul 3", type: "materi", time: "23:59 WIB" },
  { date: "20", month: "Sep", day: "Sabtu", title: "Sesi motivasi bersama alumni", type: "event", time: "20:00 WIB" },
];

// Tab Pengumuman — dibuat khusus oleh admin/mentor komunitas
export const announcements = [
  {
    id: 1,
    title: "Perubahan jadwal live mingguan",
    body: "Mulai minggu depan, sesi live Q&A dipindah dari hari Sabtu ke hari Jumat pukul 19.00 WIB. Mohon disesuaikan ya!",
    author: "Pak Andi (Mentor)",
    date: "2 jam lalu",
    isNew: true,
  },
  {
    id: 2,
    title: "Peraturan komunitas — wajib dibaca member baru",
    body: "Dilarang membagikan link grup ke pihak luar, saling menghormati sesama member, dan gunakan bahasa yang sopan di forum diskusi.",
    author: "Admin",
    date: "1 hari lalu",
    isNew: true,
  },
  {
    id: 3,
    title: "Selamat! Try out 2 sudah bisa diakses",
    body: "Hasil dan pembahasan try out 2 sudah tersedia di tab Library. Jangan lupa dicek dan pelajari kesalahan masing-masing.",
    author: "Pak Andi (Mentor)",
    date: "4 hari lalu",
    isNew: false,
  },
  {
    id: 4,
    title: "Libur sesi live — long weekend",
    body: "Tidak ada sesi live minggu ini karena long weekend. Sesi live berikutnya kembali normal minggu depan.",
    author: "Admin",
    date: "1 minggu lalu",
    isNew: false,
  },
];

// Tab Library — dokumen, file, video, dan materi yang sudah ditambahkan
export const libraryFiles = [
  { id: 1, name: "Rangkuman Trigonometri.pdf", type: "document", size: "2.4 MB", date: "3 hari lalu" },
  { id: 2, name: "Rekaman Live — Sesi Q&A 4.mp4", type: "video", size: "340 MB", date: "5 hari lalu" },
  { id: 3, name: "Template Latihan Soal SBMPTN.docx", type: "file", size: "180 KB", date: "1 minggu lalu" },
  { id: 4, name: "Pembahasan Try Out 2.pdf", type: "document", size: "3.1 MB", date: "1 minggu lalu" },
  { id: 5, name: "Rekaman Kelas Tambahan Trigonometri.mp4", type: "video", size: "512 MB", date: "2 minggu lalu" },
  { id: 6, name: "Bank Soal Kalkulus Dasar.pdf", type: "document", size: "1.8 MB", date: "3 minggu lalu" },
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

// Data dashboard creator — berbeda untuk masing-masing komunitas yang dikelola
export type CreatorStats = {
  salesSummary: {
    totalRevenue: string;
    totalMembers: number;
    newMembersThisMonth: number;
    churnRate: string;
    successRate: string;
  };
  revenueByMonth: { month: string; value: number }[];
  tierDistribution: { name: string; pct: number; color: string }[];
  activityLog: { name: string; action: string; time: string; type: string }[];
  recentMembers: { name: string; status: "active" | "pending" | "churned"; joined: string }[];
  topDocuments: { name: string; type: string; downloads: number }[];
};

export const creatorStatsByCommunity: Record<string, CreatorStats> = {
  "bimbel-sbmptn": {
    salesSummary: {
      totalRevenue: "Rp42.850.000",
      totalMembers: 1240,
      newMembersThisMonth: 86,
      churnRate: "3,2%",
      successRate: "94,6%",
    },
    revenueByMonth: [
      { month: "Apr", value: 28 },
      { month: "Mei", value: 34 },
      { month: "Jun", value: 31 },
      { month: "Jul", value: 40 },
      { month: "Agu", value: 38 },
      { month: "Sep", value: 46 },
    ],
    tierDistribution: [
      { name: "Basic", pct: 28, color: "var(--kabut)" },
      { name: "Pro", pct: 52, color: "var(--langit)" },
      { name: "VIP", pct: 20, color: "var(--sinyal)" },
    ],
    activityLog: [
      { name: "Sari Wulandari", action: "bergabung sebagai member", time: "10 menit lalu", type: "join" },
      { name: "Budi Prakoso", action: "upgrade ke tier Pro", time: "1 jam lalu", type: "upgrade" },
      { name: "Rina Kusuma", action: "gagal pembayaran recurring", time: "3 jam lalu", type: "failed" },
      { name: "Fajar Nugroho", action: "keluar dari komunitas (churn)", time: "5 jam lalu", type: "churn" },
      { name: "Dewi Anggraini", action: "membeli konten \"Modul Kalkulus\"", time: "1 hari lalu", type: "purchase" },
    ],
    recentMembers: [
      { name: "Sari Wulandari", status: "active", joined: "3 bulan lalu" },
      { name: "Budi Prakoso", status: "active", joined: "2 bulan lalu" },
      { name: "Dewi Anggraini", status: "active", joined: "8 bulan lalu" },
      { name: "Fajar Nugroho", status: "pending", joined: "Baru bergabung" },
      { name: "Rina Kusuma", status: "churned", joined: "Berakhir 3 hari lalu" },
    ],
    topDocuments: [
      { name: "Rangkuman Trigonometri.pdf", type: "document", downloads: 412 },
      { name: "Bank Soal Kalkulus Dasar.pdf", type: "document", downloads: 298 },
      { name: "Rekaman Live — Sesi Q&A 4.mp4", type: "video", downloads: 187 },
    ],
  },
  "finansial-cerdas": {
    salesSummary: {
      totalRevenue: "Rp18.400.000",
      totalMembers: 540,
      newMembersThisMonth: 34,
      churnRate: "2,1%",
      successRate: "97,1%",
    },
    revenueByMonth: [
      { month: "Apr", value: 12 },
      { month: "Mei", value: 15 },
      { month: "Jun", value: 14 },
      { month: "Jul", value: 19 },
      { month: "Agu", value: 22 },
      { month: "Sep", value: 26 },
    ],
    tierDistribution: [
      { name: "Basic", pct: 45, color: "var(--kabut)" },
      { name: "Pro", pct: 40, color: "var(--langit)" },
      { name: "VIP", pct: 15, color: "var(--sinyal)" },
    ],
    activityLog: [
      { name: "Anwar Hidayat", action: "bergabung sebagai member", time: "20 menit lalu", type: "join" },
      { name: "Lisa Permata", action: "upgrade ke tier VIP", time: "2 jam lalu", type: "upgrade" },
      { name: "Yoga Saputra", action: "membeli e-book \"Bebas Utang dalam 6 Bulan\"", time: "6 jam lalu", type: "purchase" },
      { name: "Nadia Ramadhani", action: "keluar dari komunitas (churn)", time: "1 hari lalu", type: "churn" },
    ],
    recentMembers: [
      { name: "Anwar Hidayat", status: "pending", joined: "Baru bergabung" },
      { name: "Lisa Permata", status: "active", joined: "1 bulan lalu" },
      { name: "Yoga Saputra", status: "active", joined: "4 bulan lalu" },
      { name: "Nadia Ramadhani", status: "churned", joined: "Berakhir 1 hari lalu" },
    ],
    topDocuments: [
      { name: "Template Anggaran Bulanan.xlsx", type: "file", downloads: 356 },
      { name: "E-book Bebas Utang dalam 6 Bulan.pdf", type: "document", downloads: 240 },
      { name: "Rekaman Webinar Investasi Dasar.mp4", type: "video", downloads: 165 },
    ],
  },
};

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
