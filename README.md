# BataTukang — O2O mall + tukang App prototype

Bilingual **English / Bahasa Indonesia** interactive **App-only** HTML prototype for a building-materials chain: offline supermarket + online mall + payments + membership tier pricing + delivery status + Tukang.com / 万师傅-inspired installer marketplace.

Mall-side objects follow **CRMEB 连锁多门店 v4.1** (member price first, combo pay, city / express / pickup, freight detail, delivery slots). Craftsman-side IA follows public Tukang.com + 万师傅 patterns.

Not affiliated with Tukang.com, 万师傅, or CRMEB. **No private API access** — research is from public listings, FAQs, and vendor release posts.

## Workspace artifacts (primary)

These HTML files are what a Cloud Codex Gateway / Docker CLI session would also produce:

| File | What |
|---|---|
| `index.html` | Hub (EN/ID) |
| `app/index.html` | Interactive mobile SPA (hash router, no build) |
| `mindmap/mindmap.html` | Interactive business-process mind map |
| `docs/` | Research + IA + blueprint |

## Public URLs (secondary — GitHub Pages)

Pages is a convenient preview, **not** the primary E2E path. The coordinator’s Gateway Web + Docker Codex CLI run is the primary E2E.

| Surface | URL |
|---|---|
| **Hub** | https://ntnewstudent.github.io/o2o-tukang-app-prototype/ |
| **App prototype** | https://ntnewstudent.github.io/o2o-tukang-app-prototype/app/ |
| **Mind map** | https://ntnewstudent.github.io/o2o-tukang-app-prototype/mindmap/mindmap.html |
| **Research** | https://ntnewstudent.github.io/o2o-tukang-app-prototype/docs/ |

Local: open `index.html` or `app/index.html` (hash router, no build step).

## Research takeaways (short)

- **Tukang.com:** app-only booking; 23 specializations + reno bundle; tukang / spesialis / kontraktor; 2h minat + 60m pick; harian 6h jasa-only from Rp 150k vs survey+RAB + Deposit Borongan staged release; cash after daily jobs; retensi 24h / 7–30d; v4.3.1 documentation report. Sources: [Play listing](https://play.google.com/store/apps/details?id=com.tukang.app), [FAQ/1](https://tukang.com/home/faq/1), [FAQ/2](https://tukang.com/home/faq/2), [FAQ/4](https://tukang.com/home/faq/4). Notes: [docs/research/tukang.md](docs/research/tukang.md).
- **万师傅:** SKU verbs (install/repair/measure/deliver/tear-out); 报价招标 (~5 quotes / 3 min) vs 一口价 vs 总包; escrow until 验收; 先行赔付 for enterprise. Notes: [docs/research/wanshifu.md](docs/research/wanshifu.md).
- **CRMEB 连锁多门店 v4.1:** HQ–store member card; member-price-first; 同城 / 快递 / 自提; combo pay; freight popup; slot (after hours → tomorrow). Demo: http://multi-store.crmeb.net. Notes: [docs/research/crmeb-multistore.md](docs/research/crmeb-multistore.md).

## How to click the happy path

1. **Home** → search or Mall aisle → granite tile PDP (list vs member price, multi-store stock) → Add to cart → city/express/pickup → freight breakdown → slot → combo pay → delivery timeline → **Book tukang**.
2. Or **Tukang** → filter 23+ categories → service card *Lanjut* → quote / fixed / project RAB → craftsman profile → hire/escrow → job timeline → chat / report / after-sales → accept → rate.
3. **Account** → switch Silver/Platinum and watch mall prices move; open Messages / Saldo.
4. Toggle **EN / ID** in the phone status bar (also on hub + mind map).
