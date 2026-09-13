function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), 2200);
}

function render() {
  const route = Router.current();
  const fn = Screens[route.name] || Screens.home;
  const body = document.getElementById("app-body");
  body.innerHTML = fn(route.params || {});
  body.scrollTop = 0;

  const tab = tabFor(route.name);
  document.querySelectorAll(".tab").forEach((b) => {
    b.classList.toggle("active", b.dataset.tab === tab);
    const label = b.querySelector("[data-i18n]");
    if (label) label.textContent = t(label.getAttribute("data-i18n"));
  });
  document.querySelectorAll(".lang-toggle button").forEach((b) => {
    b.classList.toggle("active", b.dataset.lang === AppState.lang());
  });
  document.getElementById("clock").textContent = t("time");
  const badge = document.getElementById("cart-badge");
  if (badge) {
    const n = AppState.cartCount();
    badge.textContent = n;
    badge.style.display = n ? "grid" : "none";
  }

  const hideTabs = ["checkout", "pay", "book", "quotes", "craftsman", "rate", "service", "rab", "freight", "chat", "aftersales", "report", "inspire"].includes(route.name);
  document.getElementById("tabbar").style.display = hideTabs ? "none" : "grid";
  body.classList.toggle("no-tabs", hideTabs);

  const q = document.getElementById("search-q");
  if (q) {
    q.focus();
    q.addEventListener("input", () => {
      AppState.set({ searchQ: q.value });
      const { products, services } = searchCatalog(q.value);
      const keep = q.value;
      render();
      const nq = document.getElementById("search-q");
      if (nq) {
        nq.value = keep;
        nq.focus();
        nq.setSelectionRange(keep.length, keep.length);
      }
      void products; void services;
    });
  }
}

function bind() {
  document.body.addEventListener("click", (e) => {
    const go = e.target.closest("[data-go]");
    if (go) {
      e.preventDefault();
      if (go.dataset.store) AppState.set({ storeId: go.dataset.store });
      Router.go(go.getAttribute("data-go"));
      return;
    }
    const tab = e.target.closest("[data-tab]");
    if (tab) {
      const map = { home: "home", mall: "mall", tukang: "tukang", orders: "orders", account: "account" };
      Router.go(map[tab.dataset.tab]);
      return;
    }
    const lang = e.target.closest("[data-lang]");
    if (lang) {
      AppState.setLang(lang.dataset.lang);
      render();
      return;
    }
    const store = e.target.closest("[data-store]");
    if (store) {
      AppState.set({ storeId: store.dataset.store });
      render();
      return;
    }
    const fulfill = e.target.closest("[data-fulfill]");
    if (fulfill) {
      AppState.set({ fulfill: fulfill.dataset.fulfill });
      render();
      return;
    }
    const slot = e.target.closest("[data-slot]");
    if (slot) {
      AppState.set({ slotId: slot.dataset.slot });
      render();
      return;
    }
    const pillar = e.target.closest("[data-pillar]");
    if (pillar) {
      AppState.set({ tukangPillar: pillar.dataset.pillar });
      render();
      return;
    }
    const pay = e.target.closest("[data-pay]");
    if (pay) {
      AppState.set({ payMethod: pay.dataset.pay });
      render();
      return;
    }
    const tier = e.target.closest("[data-tier]");
    if (tier) {
      AppState.setTier(tier.dataset.tier);
      toast(t("common.selected") + " · " + t("membership." + tier.dataset.tier));
      render();
      return;
    }
    const add = e.target.closest("[data-add]");
    if (add) {
      AppState.addToCart(add.dataset.add, 1);
      toast(t("common.addCart"));
      render();
      return;
    }
    const buy = e.target.closest("[data-buy]");
    if (buy) {
      AppState.addToCart(buy.dataset.buy, 1);
      Router.go("cart");
      return;
    }
    const qty = e.target.closest("[data-qty]");
    if (qty) {
      const [id, n] = qty.dataset.qty.split(":");
      AppState.setQty(id, Number(n));
      render();
      return;
    }
    const of = e.target.closest("[data-of]");
    if (of) {
      Screens._orderFilter = of.dataset.of;
      render();
      return;
    }
    const mode = e.target.closest("[data-mode]");
    if (mode) {
      AppState.data.draftJob = AppState.data.draftJob || {};
      AppState.data.draftJob.mode = mode.dataset.mode;
      AppState.save();
      render();
      return;
    }
    const hire = e.target.closest("[data-hire]");
    if (hire) {
      const job = AppState.placeJob(hire.dataset.hire);
      toast(t("pay.success"));
      Router.go("job/" + job.id);
      return;
    }
    const accept = e.target.closest("[data-accept]");
    if (accept) {
      const job = AppState.data.jobs.find((j) => j.id === accept.dataset.accept);
      if (job) job.status = "done";
      AppState.save();
      toast(t("common.done"));
      render();
      return;
    }
    const star = e.target.closest("[data-star]");
    if (star) {
      AppState.set({ rateStars: Number(star.dataset.star) });
      render();
      return;
    }
    const action = e.target.closest("[data-action]");
    if (action) {
      if (action.dataset.action === "toggle-combo") {
        AppState.set({ comboPay: !AppState.data.comboPay });
        render();
        return;
      }
      if (action.dataset.action === "pay-goods") {
        if (!AppState.cartLines().length) {
          toast(t("cart.empty"));
          Router.go("mall");
          return;
        }
        const order = AppState.placeGoodsOrder();
        toast(t("pay.success"));
        Router.go("order/" + order.id);
        return;
      }
      if (action.dataset.action === "find-quotes") {
        const addr = document.getElementById("job-addr");
        const notes = document.getElementById("job-notes");
        if (AppState.data.draftJob) {
          if (addr) AppState.data.draftJob.address = addr.value;
          if (notes) AppState.data.draftJob.notes = notes.value;
        }
        AppState.save();
        Router.go("quotes");
        return;
      }
      if (action.dataset.action === "open-rab") {
        const addr = document.getElementById("job-addr");
        if (addr && AppState.data.draftJob) AppState.data.draftJob.address = addr.value;
        AppState.save();
        Router.go("rab");
        return;
      }
      if (action.dataset.action === "rab-cart") {
        RAB_LINES.filter((l) => l.skuId).forEach((l) => AppState.addToCart(l.skuId, 1));
        toast(t("rab.buy"));
        Router.go("cart");
        return;
      }
      if (action.dataset.action === "rab-accept") {
        const job = AppState.placeJob((craftsmenFor((AppState.data.draftJob || {}).service || "tile")[0] || CRAFTSMEN[0]).id);
        toast(t("pay.success"));
        Router.go("job/" + job.id);
        return;
      }
      if (action.dataset.action === "submit-rate") {
        toast(t("rate.thanks"));
        Router.go("orders");
        return;
      }
      if (action.dataset.action === "send-chat") {
        const input = document.getElementById("chat-in");
        const text = (input && input.value.trim()) || t("chat.auto");
        AppState.addChat(action.dataset.thread, text);
        const thread = action.dataset.thread;
        if (!AppState.data.chats[thread]) AppState.data.chats[thread] = [];
        AppState.data.chats[thread].push({ who: "cs", en: t("chat.auto"), idn: t("chat.auto") });
        AppState.save();
        render();
        return;
      }
      if (action.dataset.action === "complain" || action.dataset.action === "reservice") {
        toast(t("aftersales.thanks"));
        Router.go("messages");
        return;
      }
      if (action.dataset.action === "dl-report") {
        toast(t("report.download"));
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  AppState.load();
  const q = new URLSearchParams(location.search);
  if (q.get("lang") === "id" || q.get("lang") === "en") AppState.setLang(q.get("lang"));
  bind();
  Router.on(render);
  Router.start();
});
