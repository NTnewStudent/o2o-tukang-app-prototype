const STORE_KEY = "batatukang-proto-v1";

const defaultState = () => ({
  lang: "en",
  tier: "gold",
  storeId: "kebayoran",
  cart: [{ id: "keramik-60", qty: 12 }, { id: "adukan", qty: 3 }],
  payMethod: "qris",
  fulfill: "delivery",
  orders: [
    {
      id: "BT-1042",
      type: "goods",
      status: "out",
      created: "2026-09-12 08:20",
      items: [{ id: "keran", qty: 1 }, { id: "pipa-3", qty: 4 }],
      fulfill: "delivery",
      storeId: "kebayoran",
      payMethod: "qris"
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
  cartTotals() {
    const lines = this.cartLines();
    const list = lines.reduce((n, l) => n + l.list, 0);
    const member = lines.reduce((n, l) => n + l.line, 0);
    const delivery = this.data.fulfill === "pickup" ? 0 : (this.data.tier === "gold" || this.data.tier === "platinum") && member >= 150000 ? 0 : 25000;
    return { list, member, savings: list - member, delivery, grand: member + delivery, points: Math.round((member / 10000) * this.tier().points) };
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
    const order = {
      id: "BT-" + (1000 + this.data.orders.length + 7),
      type: "goods",
      status: "paid",
      created: nowStamp(),
      items: this.data.cart.map((l) => ({ ...l })),
      fulfill: this.data.fulfill,
      storeId: this.data.storeId,
      payMethod: this.data.payMethod,
      totals
    };
    this.data.orders.unshift(order);
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
      status: "paid",
      created: nowStamp(),
      skuId: d.skuId,
      address: d.address || "Jl. Melawai Raya 18, Kebayoran"
    };
    this.data.jobs.unshift(job);
    this.save();
    return job;
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
