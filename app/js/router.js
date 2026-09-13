const Router = {
  route: { name: "home", params: {} },
  listeners: [],

  parse(hash) {
    const raw = (hash || "#/home").replace(/^#\/?/, "");
    const [name, a, b] = raw.split("/");
    const known = new Set([
      "home", "mall", "product", "cart", "checkout", "pay", "membership",
      "orders", "order", "tukang", "book", "quotes", "craftsman", "job", "rate", "account",
      "search", "category", "store", "service", "inspiration", "inspire",
      "messages", "chat", "aftersales", "rab", "freight", "wallet", "report"
    ]);
    if (!known.has(name)) return { name: "home", params: {} };
    if (name === "product" || name === "category" || name === "store" || name === "service" || name === "inspire") {
      return { name, params: { id: a } };
    }
    if (name === "order" || name === "craftsman" || name === "job" || name === "rate" || name === "chat" || name === "aftersales" || name === "rab" || name === "report") {
      return { name, params: { id: a } };
    }
    if (name === "book") return { name, params: { service: a, sku: b } };
    return { name, params: {} };
  },

  current() { return this.route; },

  go(path) {
    const hash = path.startsWith("#") ? path : "#/" + path.replace(/^\//, "");
    if (location.hash === hash) {
      this.route = this.parse(hash);
      this.emit();
    } else {
      location.hash = hash;
    }
  },

  on(fn) { this.listeners.push(fn); },
  emit() { this.listeners.forEach((fn) => fn(this.route)); },

  start() {
    const apply = () => {
      this.route = this.parse(location.hash);
      this.emit();
    };
    window.addEventListener("hashchange", apply);
    if (!location.hash) location.hash = "#/home";
    else apply();
  }
};

function tabFor(name) {
  if (["mall", "product", "cart", "checkout", "pay", "membership", "category", "store", "search", "freight"].includes(name)) return "mall";
  if (["tukang", "book", "quotes", "craftsman", "job", "rate", "service", "inspiration", "inspire", "rab", "aftersales", "report"].includes(name)) return "tukang";
  if (["orders", "order"].includes(name)) return "orders";
  if (["account", "messages", "chat", "wallet"].includes(name)) return "account";
  return "home";
}
