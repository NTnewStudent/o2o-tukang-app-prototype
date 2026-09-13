const STORE_KEY = "batatukang-proto-v2";

const defaultState = () => ({
  lang: "en",
  tier: "gold",
  storeId: "kebayoran",
  cart: [{ id: "keramik-60", qty: 12 }, { id: "adukan", qty: 3 }],
  payMethod: "qris",
  comboPay: true,
  fulfill: "delivery",
  slotId: "t16",
  wallet: 180000,
  searchQ: "",
  tukangPillar: "all",
  orders: [
    {
      id: "BT-1042",
      type: "goods",
      status: "out",
      created: "2026-09-12 08:20",
      items: [{ id: "keran", qty: 1 }, { id: "pipa-3", qty: 4 }],
      fulfill: "delivery",
      storeId: "kebayoran",
      payMethod: "qris",
      slotId: "t16"
    },
    {
      id: "BT-1038",
      type: "goods",
      status: "delivered",
      created: "2026-09-10 16:05",
      items: [{ id: "cat-20", qty: 1 }],
      fulfill: "pickup",
      storeId: "bekasi",
      payMethod: "va"
    }
  ],
  jobs: [
    {
      id: "TK-220",
      service: "plumb",
      mitraId: "budi",
      mode: "quote",
      status: "enroute",
      created: "2026-09-12 09:10",
      skuId: "keran",
      address: "Jl. Melawai Raya 18, Kebayoran"
    }
  ],
  chats: {
    cs: [
      { who: "cs", en: "Hi ASAS — send an Order ID and we will help.", idn: "Hai ASAS — kirim ID pesanan, kami bantu." },
      { who: "me", en: "Need to reschedule BT-1042 delivery.", idn: "Perlu ubah jadwal kiriman BT-1042." }
    ],
    "TK-220": [
      { who: "mitra", en: "Budi here. I will call 10 minutes before arrival.", idn: "Ini Budi. Saya telepon 10 menit sebelum tiba." },
      { who: "me", en: "Gate code 1821. Mixer already delivered.", idn: "Kode gerbang 1821. Kran sudah tiba." }
    ]
  },
  draftJob: null,
  lastQuotes: ["budi", "andi", "sari"],
  rateStars: 5
});

const AppState = {
  data: defaultState(),

  load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) this.data = { ...defaultState(), ...JSON.parse(raw) };
    } catch (_) { /* ignore */ }
    return this;
  },
  save() {
    localStorage.setItem(STORE_KEY, JSON.stringify(this.data));
  },
  set(partial) {
    Object.assign(this.data, partial);
    this.save();
  },

  lang() { return this.data.lang; },
  setLang(lang) { this.set({ lang }); },

  tier() { return tierById(this.data.tier) || TIERS[2]; },
  setTier(id) { this.set({ tier: id }); },

  store() { return storeById(this.data.storeId) || STORES[0]; },

  memberPrice(list) {
    return Math.round(list * (1 - this.tier().discount));
  },

  cartLines() {
    return this.data.cart.map((l) => {
      const p = productById(l.id);
      return { ...l, product: p, line: this.memberPrice(p.price) * l.qty, list: p.price * l.qty };
    }).filter((l) => l.product);
  },
  cartCount() { return this.data.cart.reduce((n, l) => n + l.qty, 0); },

  freightParts() {
    if (this.data.fulfill === "pickup") {
      return { base: 0, dist: 0, weight: 0, list: 0, waive: 0, delivery: 0 };
    }
    const store = this.store();
    const lines = this.cartLines();
    const weight = lines.reduce((n, l) => n + (l.product.weight || 2) * l.qty, 0);
    const base = this.data.fulfill === "express" ? 35000 : 15000;
    const dist = this.data.fulfill === "express" ? 12000 : (store.km <= 8 ? 5000 : 18000);
    const weightFee = weight > 80 ? 15000 : weight > 20 ? 5000 : 0;
    const list = base + dist + weightFee;
    const member = lines.reduce((n, l) => n + l.line, 0);
    const waive = (this.data.tier === "gold" || this.data.tier === "platinum") && member >= 150000 && this.data.fulfill === "delivery" ? list : 0;
    return { base, dist, weight: weightFee, list, waive, delivery: Math.max(0, list - waive) };
  },

  cartTotals() {
    const lines = this.cartLines();
    const list = lines.reduce((n, l) => n + l.list, 0);
    const member = lines.reduce((n, l) => n + l.line, 0);
    const freight = this.freightParts();
    return {
      list, member, savings: list - member,
      delivery: freight.delivery, freight,
      grand: member + freight.delivery,
      points: Math.round((member / 10000) * this.tier().points)
    };
  },

  paySplit(grand) {
    const wallet = this.data.comboPay ? Math.min(this.data.wallet, grand) : 0;
    return { wallet, rest: Math.max(0, grand - wallet) };
  },

  addToCart(id, qty = 1) {
    const row = this.data.cart.find((l) => l.id === id);
    if (row) row.qty += qty;
    else this.data.cart.push({ id, qty });
    this.save();
  },
  setQty(id, qty) {
    if (qty <= 0) this.data.cart = this.data.cart.filter((l) => l.id !== id);
    else {
      const row = this.data.cart.find((l) => l.id === id);
      if (row) row.qty = qty;
    }
    this.save();
  },

  placeGoodsOrder() {
    const totals = this.cartTotals();
    const split = this.paySplit(totals.grand);
    const order = {
      id: "BT-" + (1000 + this.data.orders.length + 7),
      type: "goods",
      status: "paid",
      created: nowStamp(),
      items: this.data.cart.map((l) => ({ ...l })),
      fulfill: this.data.fulfill,
      storeId: this.data.storeId,
      payMethod: this.data.payMethod,
      slotId: this.data.slotId,
      totals, split
    };
    this.data.orders.unshift(order);
    this.data.wallet = Math.max(0, this.data.wallet - split.wallet);
    this.data.cart = [];
    this.save();
    return order;
  },

  placeJob(mitraId) {
    const d = this.data.draftJob || { service: "plumb", mode: "quote", skuId: null, address: "Jl. Melawai Raya 18" };
    const job = {
      id: "TK-" + (200 + this.data.jobs.length + 5),
      service: d.service,
      mitraId,
      mode: d.mode || "quote",
      status: d.mode === "project" ? "hired" : "paid",
      created: nowStamp(),
      skuId: d.skuId,
      address: d.address || "Jl. Melawai Raya 18, Kebayoran",
      notes: d.notes || ""
    };
    this.data.jobs.unshift(job);
    this.save();
    return job;
  },

  addChat(thread, text) {
    if (!this.data.chats[thread]) this.data.chats[thread] = [];
    this.data.chats[thread].push({ who: "me", en: text, idn: text });
    this.save();
  }
};

function nowStamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

function formatIDR(n) {
  return "Rp " + Math.round(n).toLocaleString("id-ID");
}

function slotLabel(id) {
  const s = SLOTS.find((x) => x.id === id) || SLOTS[1];
  return AppState.lang() === "id" ? s.idn : s.en;
}
