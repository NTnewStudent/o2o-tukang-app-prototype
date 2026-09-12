function storeLabel(s) { return locName(s); }

function tierBadge(id) {
  const map = { regular: "badge-reg", silver: "badge-silver", gold: "badge-gold", platinum: "badge-plat" };
  return `<span class="badge ${map[id] || "badge-reg"}">${t("membership." + id)}</span>`;
}

function classLabel(cls) {
  return t("cls." + cls);
}

function topbar(title, backTo) {
  return `<div class="topbar">
    ${backTo ? `<button class="icon-btn" data-go="${backTo}">←</button>` : `<div class="icon-btn" style="opacity:.3">◆</div>`}
    <h1>${title}</h1>
  </div>`;
}

function productCard(p) {
  const price = AppState.memberPrice(p.price);
  const store = AppState.store();
  return `<button class="prod-card" data-go="product/${p.id}">
    <div class="swatch" style="background:${p.tint}">${p.icon}</div>
    <h4>${locName(p)}</h4>
    <div class="price-old">${formatIDR(p.price)}</div>
    <div class="price-now">${formatIDR(price)}</div>
    <div class="store-hint">${p.stock[store.id]} ${t("common.stock")} · ${storeLabel(store)}</div>
  </button>`;
}

function Screens() {}

Screens.home = function () {
  const store = AppState.store();
  const installable = PRODUCTS.filter((p) => p.install).slice(0, 5);
  return `
    <div class="search-bar" data-go="mall"><span>⌕</span><input readonly placeholder="${t("common.search")}"></div>
    <div class="hero">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <small>${t("home.greet")}</small>${tierBadge(AppState.data.tier)}
      </div>
      <h2>${t("home.heroTitle").replace("\n", "<br>")}</h2>
      <p>${t("home.heroSub")}</p>
      <div class="hero-actions">
        <button class="btn btn-ghost" data-go="mall">${t("home.shop")}</button>
        <button class="btn btn-primary" data-go="tukang">${t("home.bookTukang")}</button>
      </div>
    </div>
    <div class="card member-strip" data-go="membership">
      <div>
        <strong>${t("home.memberHint")}</strong>
        <div class="meta">${t("home.nextTier")}</div>
        <div class="progress"><span style="width:62%"></span></div>
      </div>
      ${tierBadge(AppState.data.tier)}
    </div>
    <div class="section-title"><h3>${t("home.nearStore")}</h3><button class="linkish" data-go="mall">${t("home.openMall")}</button></div>
    <div class="card" style="padding:12px;display:flex;justify-content:space-between;align-items:center">
      <div>
        <strong>${storeLabel(store)}</strong>
        <div class="meta" style="font-size:12px;color:var(--muted)">${store.area} · ${store.km} km</div>
      </div>
      <span class="badge badge-teal">${t("common.delivery")}</span>
    </div>
    <div class="section-title"><h3>${t("home.cats")}</h3></div>
    <div class="quick-grid">
      ${CATS.map((c) => `<button class="quick" data-go="mall">
        <div class="ic" style="background:${c.bg}">${c.icon}</div><small>${locName(c)}</small>
      </button>`).join("")}
      <button class="quick" data-go="tukang"><div class="ic" style="background:linear-gradient(135deg,#1c1917,#44403c)">🛠️</div><small>Tukang</small></button>
      <button class="quick" data-go="membership"><div class="ic" style="background:linear-gradient(135deg,#f59e0b,#c2410c)">★</div><small>${t("membership.title")}</small></button>
    </div>
    <div class="section-title"><h3>${t("home.hot")}</h3><button class="linkish" data-go="mall">${t("common.seeAll")}</button></div>
    <div class="prod-row">${installable.map(productCard).join("")}</div>
    <div class="section-title"><h3>${t("home.mitra")}</h3><button class="linkish" data-go="tukang">${t("home.openTukang")}</button></div>
    <div class="prod-row">
      ${CRAFTSMEN.slice(0, 4).map((c) => `<button class="prod-card" data-go="craftsman/${c.id}">
        <div class="swatch" style="background:${c.color};color:#fff;font-weight:800">${c.initials}</div>
        <h4>${c.name}</h4>
        <div class="stars">★★★★★ ${c.rating}</div>
        <div class="store-hint">${classLabel(c.cls)} · ${c.jobs} ${t("quotes.jobs")}</div>
      </button>`).join("")}
    </div>
  `;
};

Screens.mall = function () {
  const sid = AppState.data.storeId;
  return `
    ${topbar(t("mall.title"))}
    <div class="search-bar"><span>⌕</span><input readonly placeholder="${t("common.search")}"></div>
    <div class="form-label">${t("mall.switch")}</div>
    <div class="store-switch">
      ${STORES.map((s) => `<button class="chip ${s.id === sid ? "active" : ""}" data-store="${s.id}">${locName(s)}</button>`).join("")}
    </div>
    <p class="notice">${t("mall.fence")}</p>
    <div class="section-title"><h3>${t("mall.aisles")}</h3></div>
    <div class="cat-grid">
      ${CATS.map((c) => `<button class="cat-tile" style="background:${c.bg}" data-cat="${c.id}">
        <span>${c.icon}</span><strong>${locName(c)}</strong>
      </button>`).join("")}
    </div>
    <div class="section-title"><h3>${t("home.hot")}</h3></div>
    <div class="cat-grid" style="grid-template-columns:1fr">
      ${PRODUCTS.map((p) => `<div class="card line-item" style="padding:10px;margin:0">
        <div class="thumb" style="background:${p.tint}">${p.icon}</div>
        <div style="flex:1">
          <strong>${locName(p)}</strong>
          <div class="price-old">${formatIDR(p.price)}</div>
          <div class="price-now">${formatIDR(AppState.memberPrice(p.price))}</div>
        </div>
        <button class="btn btn-ghost" data-go="product/${p.id}">${t("common.view")}</button>
      </div>`).join("")}
    </div>
  `;
};

Screens.product = function (params) {
  const p = productById(params.id) || PRODUCTS[0];
  const store = AppState.store();
  const price = AppState.memberPrice(p.price);
  const svc = p.install ? serviceById(p.install) : null;
  return `
    ${topbar(t("product.title"), "mall")}
    <div class="pdp">
      <div class="pdp-swatch" style="background:${p.tint}">${p.icon}</div>
      <div class="row">
        <div>
          <h2>${locName(p)}</h2>
          <div class="price-old">${t("common.list")} ${formatIDR(p.price)} / ${AppState.lang() === "id" ? p.unitId : p.unitEn}</div>
          <div class="price-now">${formatIDR(price)} · ${t("product.memberPrice")}</div>
        </div>
        ${tierBadge(AppState.data.tier)}
      </div>
      <p style="font-size:13px;color:#44403c;line-height:1.5">${AppState.lang() === "id" ? p.descId : p.descEn}</p>
      <p class="notice">${t("product.stockAt")} ${storeLabel(store)}: <b>${p.stock[store.id]}</b> · ${t("product.o2o")}</p>
      ${svc ? `<div class="card install-banner">
        <div><strong>${t("common.install")}</strong><div style="font-size:12px;color:var(--muted)">${locName(svc)}</div></div>
        <button class="btn btn-teal" data-go="book/${svc.id}/${p.id}">${t("common.book")}</button>
      </div>` : ""}
      <div class="sticky-cta">
        <button class="btn btn-ghost" data-add="${p.id}">${t("common.addCart")}</button>
        <button class="btn btn-primary" data-buy="${p.id}">${t("common.buy")}</button>
      </div>
    </div>
  `;
};

Screens.cart = function () {
  const lines = AppState.cartLines();
  const tot = AppState.cartTotals();
  if (!lines.length) {
    return `${topbar(t("cart.title"))}<div class="empty"><div class="ic">🛒</div><p>${t("cart.empty")}</p>
      <button class="btn btn-primary" data-go="mall">${t("home.shop")}</button></div>`;
  }
  return `
    ${topbar(t("cart.title"))}
    ${lines.map((l) => `<div class="line-item">
      <div class="thumb" style="background:${l.product.tint}">${l.product.icon}</div>
      <div style="flex:1">
        <strong>${locName(l.product)}</strong>
        <div class="price-now">${formatIDR(AppState.memberPrice(l.product.price))}</div>
        <div class="qty">
          <button data-qty="${l.id}:${l.qty - 1}">−</button>
          <span>${l.qty}</span>
          <button data-qty="${l.id}:${l.qty + 1}">+</button>
        </div>
      </div>
    </div>`).join("")}
    <div class="form-label">${t("cart.fulfill")}</div>
    <div class="mode-pills">
      <button class="chip ${AppState.data.fulfill === "delivery" ? "active" : ""}" data-fulfill="delivery">${t("common.delivery")}</button>
      <button class="chip ${AppState.data.fulfill === "pickup" ? "active" : ""}" data-fulfill="pickup">${t("common.pickup")}</button>
    </div>
    <div class="card" style="padding:12px" class="totals">
      <div class="totals">
        <div class="row"><span>${t("cart.listSum")}</span><span class="price-old">${formatIDR(tot.list)}</span></div>
        <div class="row"><span>${t("cart.goods")}</span><span>${formatIDR(tot.member)}</span></div>
        <div class="row"><span>${t("common.save")}</span><span style="color:var(--ok)">${formatIDR(tot.savings)}</span></div>
        <div class="row"><span>${t("cart.deliveryFee")}</span><span>${tot.delivery ? formatIDR(tot.delivery) : "—"}</span></div>
        <div class="row"><span>${t("cart.points")}</span><span>+${tot.points}</span></div>
        <div class="row grand"><span>Total</span><span>${formatIDR(tot.grand)}</span></div>
      </div>
    </div>
    <div style="margin-top:12px"><button class="btn btn-primary btn-block" data-go="checkout">${t("common.checkout")}</button></div>
  `;
};

Screens.checkout = function () {
  const tot = AppState.cartTotals();
  const store = AppState.store();
  const delivery = AppState.data.fulfill === "delivery";
  return `
    ${topbar(t("checkout.title"), "cart")}
    <div class="card" style="padding:12px">
      <div class="form-label">${delivery ? t("checkout.shipTo") : t("checkout.pickAt")}</div>
      <strong>${delivery ? t("checkout.addr") : storeLabel(store)}</strong>
      <div style="font-size:12px;color:var(--muted)">${t("checkout.hours")}</div>
    </div>
    <p class="notice" style="margin-top:10px">${t("checkout.tierNote")}</p>
    <div class="card" style="padding:12px;margin-top:10px">
      <div class="totals">
        <div class="row"><span>${t("cart.goods")}</span><span>${formatIDR(tot.member)}</span></div>
        <div class="row"><span>${t("cart.deliveryFee")}</span><span>${tot.delivery ? formatIDR(tot.delivery) : "—"}</span></div>
        <div class="row grand"><span>Total</span><span>${formatIDR(tot.grand)}</span></div>
      </div>
    </div>
    <div style="margin-top:12px"><button class="btn btn-primary btn-block" data-go="pay">${t("checkout.payCta")}</button></div>
  `;
};

Screens.pay = function () {
  const tot = AppState.cartTotals();
  const methods = [
    ["qris", "pay.qris", "▣"],
    ["va", "pay.va", "🏦"],
    ["card", "pay.card", "💳"],
    ["wallet", "pay.wallet", "◎"],
    ["cod", "pay.cod", "💵"]
  ];
  const m = AppState.data.payMethod;
  return `
    ${topbar(t("pay.title"), "checkout")}
    <div class="pay-list">
      ${methods.map(([id, key, ic]) => `<button class="card pay-opt ${m === id ? "active" : ""}" data-pay="${id}">
        <span class="radio"></span><span style="font-size:18px">${ic}</span>
        <span style="flex:1;font-weight:700">${t(key)}</span>
      </button>`).join("")}
    </div>
    <p class="notice" style="margin-top:10px">${t("pay.secure")}</p>
    <div style="margin-top:12px"><button class="btn btn-primary btn-block" data-action="pay-goods">${t("common.pay")} · ${formatIDR(tot.grand || 0)}</button></div>
  `;
};

Screens.membership = function () {
  const cur = AppState.data.tier;
  const rows = [
    ["regular", ["r0", "r1"]],
    ["silver", ["s0", "s1", "s2"]],
    ["gold", ["g0", "g1", "g2"]],
    ["platinum", ["p0", "p1", "p2"]]
  ];
  return `
    ${topbar(t("membership.title"), "account")}
    <p class="notice">${t("membership.lead")}</p>
    ${rows.map(([id, keys]) => `<div class="card tier-card ${cur === id ? "current" : ""}">
      <div style="display:flex;justify-content:space-between;align-items:center">
        ${tierBadge(id)}
        <strong>${Math.round((tierById(id).discount || 0) * 100)}%</strong>
      </div>
      <ul>${keys.map((k) => `<li>${t("membership." + k)}</li>`).join("")}</ul>
      ${cur === id
        ? `<div style="margin-top:8px;font-size:12px;font-weight:700">${t("common.current")}</div>`
        : `<button class="btn btn-ghost" style="margin-top:10px" data-tier="${id}">${t("common.upgrade")}</button>`}
    </div>`).join("")}
  `;
};

function orderTitle(o) {
  if (o.type === "job" || o.service) {
    const s = serviceById(o.service);
    return locName(s);
  }
  const first = productById(o.items[0].id);
  const extra = o.items.length > 1 ? ` +${o.items.length - 1}` : "";
  return locName(first) + extra;
}

Screens.orders = function () {
  const filter = Screens._orderFilter || "all";
  const goods = AppState.data.orders;
  const jobs = AppState.data.jobs;
  let rows = [];
  if (filter === "all" || filter === "goods") rows = rows.concat(goods.filter((o) => filter !== "goods" || o.fulfill === "delivery"));
  if (filter === "pickup") rows = rows.concat(goods.filter((o) => o.fulfill === "pickup"));
  if (filter === "all" || filter === "jobs") rows = rows.concat(jobs);
  rows.sort((a, b) => (b.created || "").localeCompare(a.created || ""));
  return `
    ${topbar(t("orders.title"))}
    <div class="order-seg">
      ${[["all", "orders.all"], ["goods", "orders.goods"], ["pickup", "orders.pickup"], ["jobs", "orders.jobs"]].map(([id, k]) =>
        `<button class="chip ${filter === id ? "active" : ""}" data-of="${id}">${t(k)}</button>`).join("")}
    </div>
    ${rows.length ? rows.map((o) => {
      const isJob = !!o.service;
      return `<button class="card job-card" style="margin-bottom:8px" data-go="${isJob ? "job/" + o.id : "order/" + o.id}">
        <div class="quote-top">
          <div>
            <strong>${orderTitle(o)}</strong>
            <div style="font-size:11px;color:var(--muted)">${o.id} · ${o.created}</div>
          </div>
          <span class="badge badge-info">${t("status." + o.status)}</span>
        </div>
      </button>`;
    }).join("") : `<div class="empty">${t("orders.empty")}</div>`}
  `;
};

function goodsTimeline(order) {
  const store = storeById(order.storeId) || AppState.store();
  const seq = order.fulfill === "pickup"
    ? ["paid", "packed", "delivered"]
    : ["paid", "packed", "rider", "out", "delivered"];
  const rank = { paid: 0, packed: 1, rider: 2, out: 3, delivered: 4 };
  const cur = rank[order.status] ?? 0;
  return seq.map((key, i) => {
    const cls = i < cur ? "done" : i === cur ? "now" : "";
    const desc = t("order." + key + "D").replace("{store}", storeLabel(store));
    return `<div class="tl-item ${cls}"><div class="dot"></div><div><h4>${t("order." + key)}</h4><p>${desc}</p></div></div>`;
  }).join("");
}

Screens.order = function (params) {
  const order = AppState.data.orders.find((o) => o.id === params.id) || AppState.data.orders[0];
  const installable = (order.items || []).map((i) => productById(i.id)).find((p) => p && p.install);
  return `
    ${topbar(t("order.title"), "orders")}
    <div class="card" style="padding:12px;margin-bottom:10px">
      <strong>${order.id}</strong>
      <div style="font-size:12px;color:var(--muted)">${order.created} · ${t("status." + order.status)}</div>
    </div>
    <div class="timeline">${goodsTimeline(order)}</div>
    ${order.fulfill === "pickup" ? `<p class="notice">${t("order.pickupReady")}</p>` : ""}
    ${installable ? `<button class="btn btn-teal btn-block" data-go="book/${installable.install}/${installable.id}">${t("order.bookNow")}</button>` : ""}
  `;
};

Screens.tukang = function () {
  return `
    ${topbar(t("tukang.title"))}
    <p class="notice">${t("tukang.lead")}</p>
    <div class="form-label">${t("tukang.modes")}</div>
    <div class="mode-pills">
      <span class="chip active">${t("tukang.fixed")}</span>
      <span class="chip">${t("tukang.quote")}</span>
      <span class="chip">${t("tukang.project")}</span>
    </div>
    <p style="font-size:12px;color:var(--muted)">${t("tukang.window")}<br>${t("tukang.from")}</p>
    <div class="svc-grid">
      ${SERVICES.map((s) => `<button class="card svc" data-go="book/${s.id}">
        <div class="ic">${s.icon}</div>
        <strong>${locName(s)}</strong>
        <span>${AppState.lang() === "id" ? s.blurbId : s.blurbEn} · ${t("common.from")} ${formatIDR(s.from)}</span>
      </button>`).join("")}
    </div>
  `;
};

Screens.book = function (params) {
  const svc = serviceById(params.service) || SERVICES[0];
  const sku = params.sku ? productById(params.sku) : null;
  const mode = (AppState.data.draftJob && AppState.data.draftJob.mode) || "quote";
  AppState.data.draftJob = {
    service: svc.id,
    mode,
    skuId: sku ? sku.id : null,
    address: (AppState.data.draftJob && AppState.data.draftJob.address) || t("checkout.addr")
  };
  return `
    ${topbar(t("book.title"), "tukang")}
    <h2 style="margin:0 0 8px;font-size:20px">${svc.icon} ${locName(svc)}</h2>
    <div class="form-label">${t("book.mode")}</div>
    <div class="mode-pills">
      ${[["fixed", "tukang.fixed"], ["quote", "tukang.quote"], ["project", "tukang.project"]].map(([id, k]) =>
        `<button class="chip ${mode === id ? "active" : ""}" data-mode="${id}">${t(k)}</button>`).join("")}
    </div>
    ${sku ? `<div class="card" style="padding:10px;margin-bottom:8px"><div class="form-label">${t("book.skuPin")}</div>
      <strong>${locName(sku)}</strong></div>` : ""}
    <div class="form-label">${t("common.address")}</div>
    <input class="field" id="job-addr" value="${t("checkout.addr")}">
    <div class="form-label">${t("common.notes")}</div>
    <textarea class="field" id="job-notes" placeholder="${t("book.notesPh")}"></textarea>
    <div class="form-label">${t("common.photos")}</div>
    <div class="photo-slots"><span>📷</span><span>📷</span><span>+</span></div>
    <p class="notice" style="margin-top:10px">${t("book.cashNote")}</p>
    <div style="margin-top:12px"><button class="btn btn-primary btn-block" data-action="find-quotes">${t("book.find")}</button></div>
  `;
};

Screens.quotes = function () {
  const d = AppState.data.draftJob || { service: "plumb" };
  const list = craftsmenFor(d.service);
  AppState.data.lastQuotes = list.map((c) => c.id);
  return `
    ${topbar(t("quotes.title"), "book/" + d.service + (d.skuId ? "/" + d.skuId : ""))}
    <p class="notice">${t("quotes.wait")}</p>
    ${list.map((c) => `<button class="card quote-card" data-go="craftsman/${c.id}">
      <div class="quote-top">
        <div style="display:flex;gap:10px">
          <div class="avatar" style="background:${c.color}">${c.initials}</div>
          <div>
            <strong>${c.name}</strong>
            <div class="stars">★★★★★ ${c.rating}</div>
            <div style="font-size:11px;color:var(--muted)">${classLabel(c.cls)} · ${c.jobs} ${t("quotes.jobs")} · ${c.years} ${t("quotes.yrs")}</div>
          </div>
        </div>
        <div style="text-align:right">
          <div class="price-now">${formatIDR(c.quote)}</div>
          <div style="font-size:11px">${t("quotes.eta")} ${c.eta}m</div>
        </div>
      </div>
    </button>`).join("")}
  `;
};

Screens.craftsman = function (params) {
  const c = craftsmanById(params.id) || CRAFTSMEN[0];
  const clsKey = c.cls === "tukang" ? "classTukang" : c.cls === "contractor" ? "classContractor" : "classSpecialist";
  return `
    ${topbar(t("craftsman.title"), "quotes")}
    <div class="card" style="padding:14px">
      <div style="display:flex;gap:12px;align-items:center">
        <div class="avatar" style="width:64px;height:64px;background:${c.color};font-size:20px">${c.initials}</div>
        <div>
          <h2 style="margin:0;font-size:20px">${c.name}</h2>
          <div class="stars">★★★★★ ${c.rating}</div>
          <span class="badge badge-teal">${t("craftsman." + clsKey)}</span>
        </div>
      </div>
      <div class="kpis">
        <div class="card kpi"><b>${c.jobs}</b><span>${t("quotes.jobs")}</span></div>
        <div class="card kpi"><b>${c.years}</b><span>${t("quotes.yrs")}</span></div>
        <div class="card kpi"><b>${c.eta}m</b><span>${t("quotes.eta")}</span></div>
      </div>
      <div class="form-label">${t("craftsman.about")}</div>
      <p style="font-size:13px;line-height:1.5">${AppState.lang() === "id" ? c.bioId : c.bioEn}</p>
      <p class="notice">${t("craftsman.trust")}</p>
      <div class="sticky-cta">
        <button class="btn btn-ghost" data-go="quotes">${t("common.compare")}</button>
        <button class="btn btn-primary" data-hire="${c.id}">${t("common.hire")}</button>
      </div>
    </div>
  `;
};

function jobTimeline(job) {
  const seq = ["posted", "hired", "enroute", "work", "photos", "done"];
  const rank = { posted: 0, paid: 1, hired: 1, enroute: 2, work: 3, photos: 4, done: 5 };
  const cur = rank[job.status] ?? 0;
  return seq.map((key, i) => {
    const cls = i < cur ? "done" : i === cur ? "now" : "";
    return `<div class="tl-item ${cls}"><div class="dot"></div><div><h4>${t("job." + key)}</h4><p>${t("job." + key + "D")}</p></div></div>`;
  }).join("");
}

Screens.job = function (params) {
  const job = AppState.data.jobs.find((j) => j.id === params.id) || AppState.data.jobs[0];
  const c = craftsmanById(job.mitraId);
  const svc = serviceById(job.service);
  return `
    ${topbar(t("job.title"), "orders")}
    <div class="card" style="padding:12px;margin-bottom:10px">
      <strong>${job.id} · ${locName(svc)}</strong>
      <div style="font-size:12px;color:var(--muted)">${c ? c.name : ""} · ${job.address}</div>
    </div>
    <div class="timeline">${jobTimeline(job)}</div>
    <div class="photo-slots" style="margin:8px 0 12px"><span>🖼️</span><span>🖼️</span><span>✅</span></div>
    <div class="sticky-cta">
      <button class="btn btn-ghost" data-accept="${job.id}">${t("common.accept")}</button>
      <button class="btn btn-primary" data-go="rate/${job.id}">${t("common.rate")}</button>
    </div>
  `;
};

Screens.rate = function (params) {
  const n = AppState.data.rateStars || 5;
  return `
    ${topbar(t("rate.title"), "job/" + (params.id || ""))}
    <p style="font-weight:700">${t("rate.q")}</p>
    <div class="rate-stars">
      ${[1, 2, 3, 4, 5].map((i) => `<button data-star="${i}">${i <= n ? "★" : "☆"}</button>`).join("")}
    </div>
    <div class="mode-pills" style="margin-top:12px">
      ${t("rate.tags").split(", ").map((tag) => `<span class="chip">${tag}</span>`).join("")}
    </div>
    <div style="margin-top:16px"><button class="btn btn-primary btn-block" data-action="submit-rate">${t("rate.submit")}</button></div>
  `;
};

Screens.account = function () {
  return `
    ${topbar(t("account.title"))}
    <div class="card account-head">
      <div class="avatar" style="background:#c2410c">AS</div>
      <div>
        <strong>${t("account.name")}</strong>
        <div style="font-size:12px;color:var(--muted)">${t("account.city")}</div>
        ${tierBadge(AppState.data.tier)}
      </div>
    </div>
    <div class="kpis">
      <div class="card kpi"><b>1.240</b><span>${t("account.points")}</span></div>
      <div class="card kpi"><b>${AppState.data.orders.length}</b><span>${t("account.orders")}</span></div>
      <div class="card kpi"><b>${AppState.data.jobs.length}</b><span>${t("account.jobs")}</span></div>
    </div>
    <button class="menu-row" data-go="membership"><span>${t("account.tier")}</span><span>›</span></button>
    <button class="menu-row" data-go="orders"><span>${t("tab.orders")}</span><span>›</span></button>
    <div class="menu-row"><span>${t("account.wallet")}</span></div>
    <div class="menu-row"><span>${t("account.addr")}</span><span>Melawai</span></div>
    <div class="menu-row"><span>${t("account.lang")}</span><span>${AppState.lang() === "id" ? "Indonesia" : "English"}</span></div>
    <a class="menu-row" href="../docs/product-blueprint.md"><span>${t("account.docs")}</span><span>›</span></a>
    <p class="notice">${t("account.legal")}</p>
  `;
};
