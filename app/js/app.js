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

  const hideTabs = ["checkout", "pay", "book", "quotes", "craftsman", "rate"].includes(route.name);
  document.getElementById("tabbar").style.display = hideTabs ? "none" : "grid";
  body.classList.toggle("no-tabs", hideTabs);
}

function bind() {
  document.body.addEventListener("click", (e) => {
    const go = e.target.closest("[data-go]");
    if (go) {
      e.preventDefault();
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
        if (addr && AppState.data.draftJob) AppState.data.draftJob.address = addr.value;
        AppState.save();
        Router.go("quotes");
        return;
      }
      if (action.dataset.action === "submit-rate") {
        toast(t("rate.thanks"));
        Router.go("orders");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  AppState.load();
  bind();
  Router.on(render);
  Router.start();
});
