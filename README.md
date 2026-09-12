# BataTukang — O2O mall + tukang App prototype

Bilingual **English / Bahasa Indonesia** interactive **App-only** HTML prototype for a building-materials chain: offline supermarket + online mall + payments + membership tier pricing + delivery status + Tukang.com / 万师傅-inspired installer marketplace. Mall-side objects follow **CRMEB multi-store** (member price first, multi-warehouse pickup, city delivery).

Not affiliated with Tukang.com, 万师傅, or CRMEB.

## Public URLs

| Surface | URL |
|---|---|
| **Hub** | https://ntnewstudent.github.io/o2o-tukang-app-prototype/ |
| **App prototype** | https://ntnewstudent.github.io/o2o-tukang-app-prototype/app/ |
| **Mind map** | https://ntnewstudent.github.io/o2o-tukang-app-prototype/mindmap/mindmap.html |

Local: open `index.html` or `app/index.html` (hash router, no build step).

## Coverage checklist

- [x] Research: [Tukang.com](docs/research/tukang.md) — roles, booking, quotes, job lifecycle, ratings, payments, retensi/trust
- [x] Research: [万师傅](docs/research/wanshifu.md) — categories, 报价/一口价/总包 dispatch, escrow, after-sales
- [x] Research: [CRMEB multi-store](docs/research/crmeb-multistore.md) — store model, member levels, pricing, pickup/delivery
- [x] Synthesis: [product-blueprint.md](docs/product-blueprint.md) + [ia-map.md](docs/ia-map.md)
- [x] App screens: home, mall, product, cart, checkout/pay, membership, orders + delivery timeline, tukang home, book, quote compare, craftsman profile, job tracking, ratings, account
- [x] EN + ID toggle (`app/js/i18n.js`) on primary flows
- [x] Interactive mind map: member purchase → pay → tier price → delivery feedback → tukang install/repair
- [x] Public GitHub Pages URLs verified live (no login): hub, `/app/`, mind map. Project-repo Actions workflow is in `.github/workflows/pages.yml`; the live site is also published at the same paths via the user Pages repo `NTnewStudent.github.io`.

## How to click the happy path

1. **Home** → Mall → granite tile PDP (list vs Gold price) → Add to cart → Checkout (delivery/pickup) → Pay QRIS → delivery timeline → **Book tukang**.
2. Or **Tukang** → Plumbing → quote compare → craftsman profile → hire/escrow → job timeline → accept → rate.
3. **Account** → switch Silver/Platinum and watch mall prices move.
4. Toggle **EN / ID** in the phone status bar.
