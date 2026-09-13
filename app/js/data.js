const STORES = [
  { id: "kebayoran", en: "Kebayoran Superstore", idn: "Superstore Kebayoran", area: "Jaksel", km: 1.8, hours: "08:00–21:00", fenceKm: 8, phone: "021-7201-1042" },
  { id: "bekasi", en: "Bekasi Superstore", idn: "Superstore Bekasi", area: "Bekasi", km: 14.2, hours: "08:00–21:00", fenceKm: 10, phone: "021-8801-2201" },
  { id: "tangerang", en: "Tangerang Superstore", idn: "Superstore Tangerang", area: "Tangerang", km: 18.6, hours: "08:00–20:30", fenceKm: 12, phone: "021-5577-3310" }
];

const TIERS = [
  { id: "regular", discount: 0, points: 1, minSpend: 0 },
  { id: "silver", discount: 0.05, points: 1.2, minSpend: 500000 },
  { id: "gold", discount: 0.1, points: 1.5, minSpend: 2000000 },
  { id: "platinum", discount: 0.15, points: 2, minSpend: 8000000 }
];

const CATS = [
  { id: "cement", icon: "🧱", bg: "linear-gradient(135deg,#c2410c,#ea580c)", en: "Cement & mix", idn: "Semen & adukan" },
  { id: "tile", icon: "◻️", bg: "linear-gradient(135deg,#0f766e,#14b8a6)", en: "Tile & stone", idn: "Keramik & batu" },
  { id: "paint", icon: "🎨", bg: "linear-gradient(135deg,#7c3aed,#c026d3)", en: "Paint", idn: "Cat" },
  { id: "mep", icon: "🔌", bg: "linear-gradient(135deg,#0369a1,#22d3ee)", en: "MEP & pipe", idn: "MEP & pipa" },
  { id: "hardware", icon: "🔧", bg: "linear-gradient(135deg,#b45309,#f59e0b)", en: "Hardware", idn: "Perkakas" },
  { id: "finish", icon: "🪵", bg: "linear-gradient(135deg,#44403c,#a8a29e)", en: "Finish & board", idn: "Finishing" }
];

const PRODUCTS = [
  {
    id: "semen-50", cat: "cement", icon: "🧱", tint: "linear-gradient(135deg,#fed7aa,#fdba74)",
    price: 72000, unitEn: "sack 50kg", unitId: "sak 50kg",
    nameEn: "Tiga Roda Cement 50kg", nameId: "Semen Tiga Roda 50kg",
    descEn: "General-purpose Portland cement for slab, plaster and masonry. Pickup same-day from nearest superstore.",
    descId: "Semen Portland serbaguna untuk cor, plester, dan pasangan bata. Bisa diambil hari ini di superstore terdekat.",
    stock: { kebayoran: 48, bekasi: 12, tangerang: 31 },
    install: null, weight: 50
  },
  {
    id: "adukan", cat: "cement", icon: "🪣", tint: "linear-gradient(135deg,#e7e5e4,#a8a29e)",
    price: 52000, unitEn: "bag 25kg", unitId: "karung 25kg",
    nameEn: "Tile adhesive 25kg", nameId: "Perekat keramik 25kg",
    descEn: "C2TE adhesive for 60×60 porcelain. Pair with a tiler from Tukang tab.",
    descId: "Perekat C2TE untuk porselen 60×60. Pasangkan dengan tukang keramik di tab Tukang.",
    stock: { kebayoran: 22, bekasi: 9, tangerang: 17 },
    install: "tile", weight: 25
  },
  {
    id: "keramik-60", cat: "tile", icon: "◻️", tint: "linear-gradient(135deg,#ccfbf1,#5eead4)",
    price: 89000, unitEn: "m²", unitId: "m²",
    nameEn: "Granite tile 60×60", nameId: "Keramik granit 60×60",
    descEn: "Matte living-room granite. We recommend measure + install after delivery.",
    descId: "Granit matte ruang tamu. Disarankan ukur + pasang setelah barang tiba.",
    stock: { kebayoran: 86, bekasi: 40, tangerang: 54 },
    install: "tile", weight: 22
  },
  {
    id: "genteng", cat: "tile", icon: "🏠", tint: "linear-gradient(135deg,#fecaca,#f87171)",
    price: 4200, unitEn: "pcs", unitId: "bh",
    nameEn: "Concrete roof tile", nameId: "Genteng beton",
    descEn: "Interlocking roof tile. Delivery by truck; roof crew bookable as project mode.",
    descId: "Genteng interlocking. Kirim truk; kru atap bisa dipesan mode proyek.",
    stock: { kebayoran: 900, bekasi: 420, tangerang: 610 },
    install: "roof", weight: 3
  },
  {
    id: "cat-20", cat: "paint", icon: "🎨", tint: "linear-gradient(135deg,#e9d5ff,#c084fc)",
    price: 485000, unitEn: "pail 20L", unitId: "pail 20L",
    nameEn: "Interior emulsion 20L", nameId: "Cat interior 20L",
    descEn: "Low-VOC wall paint. Gold members save 10% at checkout.",
    descId: "Cat dinding rendah VOC. Member Gold hemat 10% di kasir.",
    stock: { kebayoran: 18, bekasi: 7, tangerang: 11 },
    install: "paint", weight: 24
  },
  {
    id: "pipa-3", cat: "mep", icon: "🚰", tint: "linear-gradient(135deg,#bae6fd,#38bdf8)",
    price: 28500, unitEn: "stick 4m", unitId: "batang 4m",
    nameEn: "PVC pipe 3 inch", nameId: "Pipa PVC 3 inci",
    descEn: "AW pipe for waste line. Pair with plumber (ledeng) after delivery.",
    descId: "Pipa AW pembuangan. Pasangkan dengan tukang ledeng setelah kirim.",
    stock: { kebayoran: 60, bekasi: 28, tangerang: 33 },
    install: "plumb", weight: 4
  },
  {
    id: "kabel", cat: "mep", icon: "🔌", tint: "linear-gradient(135deg,#fde68a,#fbbf24)",
    price: 18500, unitEn: "m", unitId: "m",
    nameEn: "NYM cable 3×2.5", nameId: "Kabel NYM 3×2.5",
    descEn: "House wiring cable. Electrician booking can reuse this SKU line.",
    descId: "Kabel instalasi rumah. Booking listrik bisa memakai baris SKU ini.",
    stock: { kebayoran: 200, bekasi: 80, tangerang: 120 },
    install: "elec", weight: 1
  },
  {
    id: "keran", cat: "hardware", icon: "🚿", tint: "linear-gradient(135deg,#ddd6fe,#818cf8)",
    price: 189000, unitEn: "set", unitId: "set",
    nameEn: "Basin mixer chrome", nameId: "Kran wastafel krom",
    descEn: "35mm cartridge mixer. Wanshifu-style install verb: sanitary.",
    descId: "Mixer kartrid 35mm. Kata kerja gaya Wanshifu: saniter.",
    stock: { kebayoran: 14, bekasi: 6, tangerang: 9 },
    install: "plumb", weight: 2
  },
  {
    id: "kunci", cat: "hardware", icon: "🔐", tint: "linear-gradient(135deg,#1e1b4b,#6366f1)",
    price: 459000, unitEn: "pcs", unitId: "bh",
    nameEn: "Smart door lock", nameId: "Kunci pintu pintar",
    descEn: "Fingerprint + PIN. Platform fixed-price install available.",
    descId: "Sidik jari + PIN. Instalasi harga tetap tersedia.",
    stock: { kebayoran: 8, bekasi: 3, tangerang: 5 },
    install: "lock", weight: 1
  },
  {
    id: "gypsum", cat: "finish", icon: "🪵", tint: "linear-gradient(135deg,#f5f5f4,#d6d3d1)",
    price: 65000, unitEn: "sheet 9mm", unitId: "lembar 9mm",
    nameEn: "Gypsum board 9mm", nameId: "Papan gypsum 9mm",
    descEn: "Ceiling board. Book plafon specialist after truck delivery.",
    descId: "Papan plafon. Pesan spesialis plafon setelah kirim truk.",
    stock: { kebayoran: 70, bekasi: 24, tangerang: 38 },
    install: "ceiling", weight: 8
  },
  {
    id: "gordyn", cat: "finish", icon: "🪟", tint: "linear-gradient(135deg,#fce7f3,#f9a8d4)",
    price: 245000, unitEn: "set 2.5m", unitId: "set 2,5m",
    nameEn: "Blackout curtain set", nameId: "Set gorden blackout",
    descEn: "Measure first, then install. Design-inspiration SKU.",
    descId: "Ukur dulu, lalu pasang. SKU inspirasi desain.",
    stock: { kebayoran: 11, bekasi: 4, tangerang: 7 },
    install: "curtain", weight: 3
  },
  {
    id: "lantai-vinyl", cat: "finish", icon: "🪵", tint: "linear-gradient(135deg,#fef3c7,#d6d3d1)",
    price: 165000, unitEn: "m²", unitId: "m²",
    nameEn: "SPC vinyl plank", nameId: "Lantai vinyl SPC",
    descEn: "Click-lock vinyl. Pair with parquet/vinyl specialist.",
    descId: "Vinyl click-lock. Pasangkan dengan spesialis parquet/vinyl.",
    stock: { kebayoran: 55, bekasi: 20, tangerang: 28 },
    install: "parquet", weight: 6
  }
];

/** Tukang.com 23 specializations + reno bundle, tagged with Wanshifu-style verbs. */
const SERVICES = [
  { id: "ac", icon: "❄️", from: 175000, pillar: "maint", verb: "repair", en: "AC", idn: "AC", blurbEn: "Clean, install, gas", blurbId: "Cuci, pasang, isi freon" },
  { id: "cctv", icon: "📷", from: 180000, pillar: "maint", verb: "install", en: "CCTV", idn: "CCTV", blurbEn: "Camera + DVR", blurbId: "Kamera + DVR" },
  { id: "elec-fix", icon: "📺", from: 150000, pillar: "maint", verb: "repair", en: "Electronics", idn: "Elektronik", blurbEn: "TV, washer, fridge", blurbId: "TV, mesin cuci, kulkas" },
  { id: "elec", icon: "⚡", from: 150000, pillar: "maint", verb: "install", en: "Electrical", idn: "Listrik", blurbEn: "Wiring, breaker, lamps", blurbId: "Instalasi, MCB, lampu" },
  { id: "mech", icon: "⚙️", from: 180000, pillar: "maint", verb: "repair", en: "Mechanical", idn: "Mekanikal", blurbEn: "Pump, motor", blurbId: "Pompa, motor" },
  { id: "alum", icon: "🪟", from: 200000, pillar: "reno", verb: "install", en: "Aluminium & glass", idn: "Aluminium & kaca", blurbEn: "Frame, window", blurbId: "Kusen, jendela" },
  { id: "roof", icon: "🏠", from: 200000, pillar: "reno", verb: "repair", en: "Roofing", idn: "Atap", blurbEn: "Tile, leak, gutter", blurbId: "Genteng, bocor, talang" },
  { id: "tile", icon: "◻️", from: 180000, pillar: "reno", verb: "install", en: "Masonry & tile", idn: "Batu & keramik", blurbEn: "Floor / wall install", blurbId: "Pasang lantai / dinding" },
  { id: "paint", icon: "🎨", from: 150000, pillar: "reno", verb: "install", en: "Painting", idn: "Cat", blurbEn: "Interior & exterior", blurbId: "Interior & eksterior" },
  { id: "kusen", icon: "🚪", from: 180000, pillar: "reno", verb: "install", en: "Door frame", idn: "Kusen", blurbEn: "Wood / aluminium door", blurbId: "Pintu kayu / aluminium" },
  { id: "weld", icon: "🔥", from: 180000, pillar: "reno", verb: "install", en: "Welding", idn: "Las", blurbEn: "Canopy, fence", blurbId: "Kanopi, pagar" },
  { id: "plumb", icon: "🔧", from: 150000, pillar: "maint", verb: "repair", en: "Plumbing", idn: "Ledeng", blurbEn: "Leak, pump, sanitary", blurbId: "Bocor, pompa, saniter" },
  { id: "ceiling", icon: "🪵", from: 180000, pillar: "reno", verb: "install", en: "Ceiling", idn: "Plafon", blurbEn: "Gypsum, frame", blurbId: "Gypsum, rangka" },
  { id: "furniture", icon: "🪑", from: 150000, pillar: "reno", verb: "install", en: "Furniture", idn: "Furnitur", blurbEn: "Assemble & mount", blurbId: "Rakit & tempel" },
  { id: "curtain", icon: "🪟", from: 150000, pillar: "reno", verb: "install", en: "Curtain", idn: "Gordyn", blurbEn: "Measure + hang", blurbId: "Ukur + pasang" },
  { id: "parquet", icon: "🪵", from: 200000, pillar: "reno", verb: "install", en: "Parquet", idn: "Parquet", blurbEn: "Wood / vinyl floor", blurbId: "Lantai kayu / vinyl" },
  { id: "sofa", icon: "🛋️", from: 160000, pillar: "maint", verb: "repair", en: "Sofa", idn: "Sofa", blurbEn: "Reupholster, clean", blurbId: "Ganti kain, cuci" },
  { id: "carpet", icon: "🧶", from: 150000, pillar: "reno", verb: "install", en: "Vinyl & carpet", idn: "Vinyl & karpet", blurbEn: "Roll + glue", blurbId: "Gulung + lem" },
  { id: "wallpaper", icon: "📜", from: 150000, pillar: "reno", verb: "install", en: "Wallpaper", idn: "Wallpaper", blurbEn: "Wall cover", blurbId: "Penutup dinding" },
  { id: "pool", icon: "🏊", from: 250000, pillar: "reno", verb: "repair", en: "Swimming pool", idn: "Kolam renang", blurbEn: "Pump, tile, leak", blurbId: "Pompa, keramik, bocor" },
  { id: "garden", icon: "🌿", from: 150000, pillar: "reno", verb: "install", en: "Garden", idn: "Taman", blurbEn: "Drain, plants, fence", blurbId: "Saluran, tanaman, pagar" },
  { id: "arch", icon: "📐", from: 100000, pillar: "design", verb: "measure", en: "Architect design", idn: "Desain arsitek", blurbEn: "Survey + drawings", blurbId: "Survei + gambar kerja" },
  { id: "interior", icon: "🏡", from: 100000, pillar: "design", verb: "measure", en: "Interior design", idn: "Desain interior", blurbEn: "Moodboard + RAB", blurbId: "Moodboard + RAB" },
  { id: "reno", icon: "🏗️", from: 350000, pillar: "reno", verb: "install", en: "Renovation bundle", idn: "Paket renovasi", blurbEn: "Multi-trade project", blurbId: "Proyek multi-keahlian" },
  { id: "lock", icon: "🔐", from: 120000, pillar: "maint", verb: "install", en: "Lock & door", idn: "Kunci & pintu", blurbEn: "Smart lock, hinge", blurbId: "Kunci pintar, engsel" }
];

const CRAFTSMEN = [
  { id: "andi", name: "Andi Wijaya", cls: "specialist", skill: "elec", rating: 4.9, jobs: 312, years: 11, eta: 45, quote: 275000, city: "Jaksel", initials: "AW", color: "#0f766e",
    bioEn: "Licensed electrician. Panel upgrades and LED retrofits. Completes photo evidence before escrow release.",
    bioId: "Teknisi listrik bersertifikat. Upgrade panel dan retrofit LED. Unggah foto sebelum dana escrow cair." },
  { id: "sari", name: "Sari Lestari", cls: "tukang", skill: "tile", rating: 4.8, jobs: 198, years: 8, eta: 70, quote: 320000, city: "Bekasi", initials: "SL", color: "#c2410c",
    bioEn: "Porcelain and granite specialist. Brings wet-cutter. Daily 6-hour clean time.",
    bioId: "Spesialis porselen dan granit. Bawa mesin potong basah. Jam bersih harian 6 jam." },
  { id: "budi", name: "Budi Hartono", cls: "specialist", skill: "plumb", rating: 4.9, jobs: 267, years: 13, eta: 40, quote: 240000, city: "Tangerang", initials: "BH", color: "#0369a1",
    bioEn: "Leak detection + sanitary install. Works with chain SKUs (mixer, PVC).",
    bioId: "Deteksi bocor + pasang saniter. Terbiasa SKU toko (kran, PVC)." },
  { id: "joko", name: "Joko Prasetyo", cls: "specialist", skill: "ac", rating: 4.7, jobs: 154, years: 7, eta: 55, quote: 260000, city: "Jaksel", initials: "JP", color: "#0284c7",
    bioEn: "Split AC install and deep clean. Fixed-price menu for 0.5–2 PK.",
    bioId: "Pasang dan cuci AC split. Menu harga tetap 0.5–2 PK." },
  { id: "dewi", name: "Dewi Anggraini", cls: "tukang", skill: "paint", rating: 4.8, jobs: 221, years: 9, eta: 80, quote: 230000, city: "Depok", initials: "DA", color: "#7c3aed",
    bioEn: "Interior painter. Color-match to mall emulsion SKUs.",
    bioId: "Tukang cat interior. Cocokkan warna dengan SKU cat mal." },
  { id: "rudi", name: "Rudi Santoso", cls: "contractor", skill: "furniture", rating: 4.9, jobs: 401, years: 15, eta: 90, quote: 350000, city: "Jaksel", initials: "RS", color: "#b45309",
    bioEn: "Furniture and custom cabinet crew (3 people). Project RAB for multi-room.",
    bioId: "Kru furnitur dan kitchen set (3 orang). RAB proyek multi-ruang." },
  { id: "nina", name: "Nina Kusuma", cls: "specialist", skill: "interior", rating: 4.9, jobs: 88, years: 10, eta: 120, quote: 750000, city: "Jaksel", initials: "NK", color: "#be185d",
    bioEn: "Interior consultant. Moodboard + working drawings + RAB, Tukang Design Inspiration pattern.",
    bioId: "Konsultan interior. Moodboard + gambar kerja + RAB, pola Inspirasi Desain Tukang." },
  { id: "eko", name: "Eko Pramono", cls: "tukang", skill: "roof", rating: 4.6, jobs: 143, years: 12, eta: 80, quote: 310000, city: "Bekasi", initials: "EP", color: "#9a3412",
    bioEn: "Roof leak and tile replacement. Project mode for full re-roof.",
    bioId: "Bocor atap dan ganti genteng. Mode proyek untuk ganti atap penuh." },
  { id: "lia", name: "Lia Hartati", cls: "specialist", skill: "curtain", rating: 4.8, jobs: 176, years: 6, eta: 50, quote: 195000, city: "Jaksel", initials: "LH", color: "#db2777",
    bioEn: "Measure + hang curtains. Fixed price per window after site measure.",
    bioId: "Ukur + pasang gorden. Harga tetap per jendela setelah ukur lokasi." }
];

const INSPIRATIONS = [
  { id: "japandi", icon: "🪵", tint: "linear-gradient(135deg,#f5f5f4,#d6d3d1)", service: "interior",
    nameEn: "Japandi living", nameId: "Ruang tamu Japandi",
    descEn: "Warm wood + matte granite. Pair 60×60 tile + emulsion + curtain measure.",
    descId: "Kayu hangat + granit matte. Pasangkan keramik 60×60 + cat + ukur gorden." },
  { id: "tropical", icon: "🌿", tint: "linear-gradient(135deg,#d1fae5,#6ee7b7)", service: "garden",
    nameEn: "Tropical backyard", nameId: "Halaman tropis",
    descEn: "Drain, plants, fence. Book taman specialist after patio tile delivery.",
    descId: "Saluran, tanaman, pagar. Pesan spesialis taman setelah keramik teras tiba." },
  { id: "wetroom", icon: "🚿", tint: "linear-gradient(135deg,#e0f2fe,#7dd3fc)", service: "plumb",
    nameEn: "Wet-room refresh", nameId: "Refresh kamar mandi",
    descEn: "Mixer + tile + waterproof. Quote compare for ledeng + keramik.",
    descId: "Kran + keramik + waterproof. Bandingkan penawaran ledeng + keramik." },
  { id: "smartentry", icon: "🔐", tint: "linear-gradient(135deg,#1e1b4b,#6366f1)", service: "lock",
    nameEn: "Smart entry", nameId: "Pintu pintar",
    descEn: "Fixed-price smart lock install — Wanshifu 一口价 pattern.",
    descId: "Pasang kunci pintar harga tetap — pola 一口价 Wanshifu." }
];

const SLOTS = [
  { id: "t14", en: "Today 14:00–16:00", idn: "Hari ini 14.00–16.00" },
  { id: "t16", en: "Today 16:00–18:00", idn: "Hari ini 16.00–18.00" },
  { id: "m08", en: "Tomorrow 08:00–10:00", idn: "Besok 08.00–10.00" },
  { id: "m10", en: "Tomorrow 10:00–12:00", idn: "Besok 10.00–12.00" }
];

const RAB_LINES = [
  { id: "labor", en: "Labor — 2 tilers × 2 days", idn: "Upah — 2 tukang × 2 hari", amount: 640000 },
  { id: "adhesive", en: "Tile adhesive 25kg × 3", idn: "Perekat keramik 25kg × 3", amount: 156000, skuId: "adukan" },
  { id: "tile", en: "Granite 60×60 × 12 m²", idn: "Granit 60×60 × 12 m²", amount: 1068000, skuId: "keramik-60" },
  { id: "grout", en: "Grout + sealer", idn: "Nat + sealer", amount: 85000 }
];

function productById(id) { return PRODUCTS.find((p) => p.id === id); }
function craftsmanById(id) { return CRAFTSMEN.find((c) => c.id === id); }
function serviceById(id) { return SERVICES.find((s) => s.id === id); }
function storeById(id) { return STORES.find((s) => s.id === id); }
function tierById(id) { return TIERS.find((t) => t.id === id); }
function inspireById(id) { return INSPIRATIONS.find((i) => i.id === id); }
function craftsmenFor(skill) {
  const list = CRAFTSMEN.filter((c) => c.skill === skill);
  if (list.length) return list;
  return CRAFTSMEN.slice(0, 3);
}

function searchCatalog(q) {
  const s = (q || "").trim().toLowerCase();
  if (!s) return { products: PRODUCTS.slice(0, 6), services: SERVICES.slice(0, 6) };
  const hit = (obj) => [obj.id, obj.en, obj.idn, obj.nameEn, obj.nameId, obj.blurbEn, obj.blurbId]
    .filter(Boolean).some((v) => String(v).toLowerCase().includes(s));
  return {
    products: PRODUCTS.filter(hit),
    services: SERVICES.filter(hit)
  };
}
