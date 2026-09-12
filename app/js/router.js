const Router = {
  route: { name: "home", params: {} },
  listeners: [],

  parse(hash) {
    const raw = (hash || "#/home").replace(/^#\/?/, "");
    const [name, a, b] = raw.split("/");
    const known = new Set([
      "home", "mall", "product", "cart", "checkout", "pay", "membership",
      "orders", "order", "tukang", "book", "quotes", "craftsman", "job", "rate", "account"
    ]);
    if (!known.has(name)) return { name: "home", params: {} };
    if (name === "product") return { name, params: { id: a } };
    if (name === "order") return { name, params: { id: a } };
    if (name === "book") return { name, params: { service: a, sku: b } };
    if (name === "craftsman") return { name, params: { id: a } };
    if (name === "job" || name === "rate") return { name, params: { id: a } };
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
  if (["mall", "product", "cart", "checkout", "pay", "membership"].includes(name)) return "mall";
  if (["tukang", "book", "quotes", "craftsman", "job", "rate"].includes(name)) return "tukang";
  if (["orders", "order"].includes(name)) return "orders";
  if (name === "account") return "account";
  return "home";
}
