const STORES = [
  { id: "kebayoran", en: "Kebayoran Superstore", idn: "Superstore Kebayoran", area: "Jaksel", km: 1.8 },
  { id: "bekasi", en: "Bekasi Superstore", idn: "Superstore Bekasi", area: "Bekasi", km: 14.2 },
  { id: "tangerang", en: "Tangerang Superstore", idn: "Superstore Tangerang", area: "Tangerang", km: 18.6 }
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
    install: null
  },
  {
    id: "adukan", cat: "cement", icon: "🪣", tint: "linear-gradient(135deg,#e7e5e4,#a8a29e)",
    price: 52000, unitEn: "bag 25kg", unitId: "karung 25kg",
    nameEn: "Tile adhesive 25kg", nameId: "Perekat keramik 25kg",
    descEn: "C2TE adhesive for 60×60 porcelain. Pair with a tiler from Tukang tab.",
    descId: "Perekat C2TE untuk porselen 60×60. Pasangkan dengan tukang keramik di tab Tukang.",
    stock: { kebayoran: 22, bekasi: 9, tangerang: 17 },
    install: "tile"
  },
  {
    id: "keramik-60", cat: "tile", icon: "◻️", tint: "linear-gradient(135deg,#ccfbf1,#5eead4)",
    price: 89000, unitEn: "m²", unitId: "m²",
    nameEn: "Granite tile 60×60", nameId: "Keramik granit 60×60",
    descEn: "Matte living-room granite. We recommend measure + install after delivery.",
    descId: "Granit matte ruang tamu. Disarankan ukur + pasang setelah barang tiba.",
    stock: { kebayoran: 86, bekasi: 40, tangerang: 54 },
    install: "tile"
  },
  {
    id: "genteng", cat: "tile", icon: "🏠", tint: "linear-gradient(135deg,#fecaca,#f87171)",
    price: 4200, unitEn: "pcs", unitId: "bh",
    nameEn: "Concrete roof tile", nameId: "Genteng beton",
    descEn: "Interlocking roof tile. Delivery by truck; roof crew bookable as project mode.",
    descId: "Genteng interlocking. Kirim truk; kru atap bisa dipesan mode proyek.",
    stock: { kebayoran: 900, bekasi: 420, tangerang: 610 },
    install: "roof"
  },
  {
    id: "cat-20", cat: "paint", icon: "🎨", tint: "linear-gradient(135deg,#e9d5ff,#c084fc)",
    price: 485000, unitEn: "pail 20L", unitId: "pail 20L",
    nameEn: "Interior emulsion 20L", nameId: "Cat interior 20L",
    descEn: "Low-VOC wall paint. Gold members save 10% at checkout.",
    descId: "Cat dinding rendah VOC. Member Gold hemat 10% di kasir.",
    stock: { kebayoran: 18, bekasi: 7, tangerang: 11 },
    install: "paint"
  },
  {
    id: "pipa-3", cat: "mep", icon: "🚰", tint: "linear-gradient(135deg,#bae6fd,#38bdf8)",
    price: 28500, unitEn: "stick 4m", unitId: "batang 4m",
    nameEn: "PVC pipe 3 inch", nameId: "Pipa PVC 3 inci",
    descEn: "AW pipe for waste line. Pair with plumber (ledeng) after delivery.",
    descId: "Pipa AW pembuangan. Pasangkan dengan tukang ledeng setelah kirim.",
    stock: { kebayoran: 60, bekasi: 28, tangerang: 33 },
    install: "plumb"
  },
  {
    id: "kabel", cat: "mep", icon: "🔌", tint: "linear-gradient(135deg,#fde68a,#fbbf24)",
    price: 18500, unitEn: "m", unitId: "m",
    nameEn: "NYM cable 3×2.5", nameId: "Kabel NYM 3×2.5",
    descEn: "House wiring cable. Electrician booking can reuse this SKU line.",
    descId: "Kabel instalasi rumah. Booking listrik bisa memakai baris SKU ini.",
    stock: { kebayoran: 200, bekasi: 80, tangerang: 120 },
    install: "elec"
  },
  {
    id: "keran", cat: "hardware", icon: "🚿", tint: "linear-gradient(135deg,#ddd6fe,#818cf8)",
    price: 189000, unitEn: "set", unitId: "set",
    nameEn: "Basin mixer chrome", nameId: "Kran wastafel krom",
    descEn: "35mm cartridge mixer. Wanshifu-style install verb: sanitary.",
    descId: "Mixer kartrid 35mm. Kata kerja gaya Wanshifu: saniter.",
    stock: { kebayoran: 14, bekasi: 6, tangerang: 9 },
    install: "plumb"
  },
  {
    id: "kunci", cat: "hardware", icon: "🔐", tint: "linear-gradient(135deg,#1e1b4b,#6366f1)",
    price: 459000, unitEn: "pcs", unitId: "bh",
    nameEn: "Smart door lock", nameId: "Kunci pintu pintar",
    descEn: "Fingerprint + PIN. Platform fixed-price install available.",
    descId: "Sidik jari + PIN. Instalasi harga tetap tersedia.",
    stock: { kebayoran: 8, bekasi: 3, tangerang: 5 },
    install: "lock"
  },
  {
    id: "gypsum", cat: "finish", icon: "🪵", tint: "linear-gradient(135deg,#f5f5f4,#d6d3d1)",
    price: 65000, unitEn: "sheet 9mm", unitId: "lembar 9mm",
    nameEn: "Gypsum board 9mm", nameId: "Papan gypsum 9mm",
    descEn: "Ceiling board. Book plafon specialist after truck delivery.",
    descId: "Papan plafon. Pesan spesialis plafon setelah kirim truk.",
    stock: { kebayoran: 70, bekasi: 24, tangerang: 38 },
    install: "ceiling"
  }
];

const SERVICES = [
  { id: "elec", icon: "⚡", from: 150000, en: "Electrical", idn: "Listrik", blurbEn: "Wiring, breaker, lamps", blurbId: "Instalasi, MCB, lampu" },
  { id: "plumb", icon: "🔧", from: 150000, en: "Plumbing", idn: "Ledeng", blurbEn: "Leak, pump, sanitary", blurbId: "Bocor, pompa, saniter" },
  { id: "tile", icon: "◻️", from: 180000, en: "Tiling", idn: "Keramik", blurbEn: "Floor / wall install", blurbId: "Pasang lantai / dinding" },
  { id: "paint", icon: "🎨", from: 150000, en: "Painting", idn: "Cat", blurbEn: "Interior & exterior", blurbId: "Interior & eksterior" },
  { id: "ac", icon: "❄️", from: 175000, en: "AC service", idn: "Servis AC", blurbEn: "Clean, install, gas", blurbId: "Cuci, pasang, isi freon" },
  { id: "lock", icon: "🔐", from: 120000, en: "Lock & door", idn: "Kunci & pintu", blurbEn: "Smart lock, hinge", blurbId: "Kunci pintar, engsel" },
  { id: "roof", icon: "🏠", from: 200000, en: "Roofing", idn: "Atap", blurbEn: "Tile, leak, gutter", blurbId: "Genteng, bocor, talang" },
  { id: "ceiling", icon: "🪵", from: 180000, en: "Ceiling", idn: "Plafon", blurbEn: "Gypsum, frame", blurbId: "Gypsum, rangka" },
  { id: "furniture", icon: "🪑", from: 150000, en: "Furniture", idn: "Furnitur", blurbEn: "Assemble & mount", blurbId: "Rakit & tempel" },
  { id: "garden", icon: "🌿", from: 150000, en: "Garden", idn: "Taman", blurbEn: "Drain, plants, fence", blurbId: "Saluran, tanaman, pagar" }
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
    bioId: "Kru furnitur dan kitchen set (3 orang). RAB proyek multi-ruang." }
];

function productById(id) { return PRODUCTS.find((p) => p.id === id); }
function craftsmanById(id) { return CRAFTSMEN.find((c) => c.id === id); }
function serviceById(id) { return SERVICES.find((s) => s.id === id); }
function storeById(id) { return STORES.find((s) => s.id === id); }
function tierById(id) { return TIERS.find((t) => t.id === id); }
function craftsmenFor(skill) {
  const list = CRAFTSMEN.filter((c) => c.skill === skill);
  return list.length ? list : CRAFTSMEN.slice(0, 3);
}
