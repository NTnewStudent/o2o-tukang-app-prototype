# 万师傅 (Wanshifu) research

**Product:** 万师傅 — national home-furnishings after-sales network (配送 / 安装 / 维修 / 保养 / 测量)  
**Web:** [wanshifu.com](https://www.wanshifu.com) · [m.wanshifu.com](https://m.wanshifu.com)  
**Consumer / merchant apps:** 万师傅家居服务 (App Store id `6449211492`); craftsman app “万师傅师傅版”  
**Scale claims (vendor marketing, treat as directional):** 370–450万+ craftsmen, 3,200+ districts, 1.7亿+ historical jobs, 99.5% on-time appointment rate, 180万+ merchant brands.

Wanshifu is the **closest Chinese analogue** to “buy furniture online → someone shows up to install it.” That is exactly the hinge between a building-materials mall and a tukang marketplace.

---

## 1. Positioning

Unlike Tukang.com (consumer home-repair marketplace in one metro), Wanshifu is primarily an **after-sales fulfillment network for furniture / sanitary / lighting brands and ecommerce sellers**. Households can order via mini-program; enterprises order via SaaS + App.

Tagline pattern: “你想要的师傅都在万师傅” — delivery, install, repair, maintenance, measure.

This is why it maps so well onto a **materials supermarket**: the SKU already exists; the missing piece is a dispatched, escrowed tradesperson.

---

## 2. Roles

| Role | Surface | Job |
|---|---|---|
| **Household / C-end** | WeChat mini-program | Post a single-home job, pick quote or fixed price, accept work, pay |
| **Merchant / brand / 3PL** | PC SaaS + App | Bulk after-sales, API/work-order push, monthly settlement |
| **Individual 师傅** | 师傅版 App | KYC → exam → quote / grab orders → upload completion photos |
| **总包服务商 (general contractor / MSP)** | SaaS | Takes the merchant SLA, finds local 师傅, handles exceptions |
| **Platform ops / QC** | Internal | Vetting, training, escrow bank account, 先行赔付, insurance |

Craftsman onboarding (public recruit pages + third-party how-tos):

1. Download 师傅版  
2. Register + **real-name KYC** (ID front/back + handheld)  
3. Category skill exam / phone interview  
4. Go online and quote / grab  

Public copy: “具备相关技能均可申请” across furniture, smart lock, lighting, sanitary, drying rack, appliances, doors/windows. Deposit/bond amounts are **not stably published** on marketing pages (forum figures ~¥500 + ~15% take-rate — **do not treat as official**).

---

## 3. Categories (what gets dispatched)

Marketing + App Store description cluster into **verb × SKU**:

### Verbs

- **上门安装** — furniture, sanitary, smart lock, drying rack, lighting, appliances, TV wall-mount, water purifier, kitchen/bath fixtures, doors/hardware, CCTV, floor/wall, office kit, gym kit, EV charger, signage, custom cabinets, smart devices  
- **上门维修** — AC, water heater, TV, washer, fridge, dishwasher, gas hob, range hood, furniture / leather / paint / marble / glass repair  
- **同城配送** — to-home, to-downstairs, deliver+install, return/pickup (返货), bulk move  
- **精准量尺** — rooms, drying racks, doors/windows, curtains, walls, floors, signage  
- **拆旧搬运** — tear-out + labor haul  

### 13 install verticals (consumer site)

Furniture, lighting, sanitary, drying racks, curtains, smart locks, plus adjacent custom/door/fit-out SKUs. Repair is a second taxonomy (furniture, leather, paint, marble, glass…).

**BataTukang mapping:** every mall SKU should declare `installCategory` + `needsMeasure`. Checkout can append “Book installer” without leaving the goods order.

---

## 4. Dispatch modes (three commercial products)

Documented on Wanshifu family mini-program Q&A and on partner-integration writeups (Apifox “万师傅业务流程”):

### 4.1 报价招标 — quote auction (C and B)

1. Customer/merchant posts category + address + photos.  
2. Nearby 师傅 receive the job and **quote**. Consumer copy: “3 minutes, 5 quotes.”  
3. Customer **picks** a 师傅 (price, rating, ETA — not automatic cheapest).  
4. Customer pays **担保金 / escrow** into Wanshifu’s **bank-supervised account**.  
5. Phone-confirm visit time (reschedule is peer-to-peer).  
6. 师傅 arrives; must find someone home.  
7. 师傅 uploads **completion photos**.  
8. Customer **验收** (accept). Unhappy → request re-service.  
9. Only then is money released to the 师傅.

### 4.2 一口价 — platform list price

No bargaining. First qualified 师傅 to grab wins.

- **支付前置 (pay first):** pay → grab → serve → accept → release.  
- **支付后置 (pay after grab):** grab → customer pays → serve → accept → release.

Used for standardized SKUs (e.g. install one commode, hang one chandelier) where quote variance is waste.

### 4.3 总包 — managed service provider

Merchant sends the order to a **总包**, not to the crowd. 总包 finds the 师傅, talks to the homeowner, accepts, and invoices the merchant. Settlement: **per-order or monthly (月结)**. API can push merchant OMS / work-order systems so CS does not retype tickets.

This is the B2B pattern a **building-materials chain** wants for “we sold 40 vanities this week — install them.”

---

## 5. Escrow / payment / after-sales

Guarantee page ([m.wanshifu.com/mobileWebsite/guarantee](https://m.wanshifu.com/mobileWebsite/guarantee)) states four pillars:

| Pillar | Mechanic |
|---|---|
| **担保交易** | Pay after accept; funds sit on platform; “家居行业首创” claim |
| **服务质检** | Vetting + standard SOP + periodic online/offline training |
| **先行赔付** | **Enterprise** users: if complaint + loss evidence checks out, platform **pays first**, then disciplines 师傅 |
| **商业保险** | 师傅 accident cover + third-party liability |

Happy-path copy on the homepage is a three-step strip: **托管费用至平台 → 上门服务 → 验收通过付款**.

After-sales loops:

- Re-service if accept fails  
- 24h dedicated CS for 总包 merchants  
- Complaint + evidence for 先行赔付  
- Photo proof as the atomic “job done” event (same idea as Tukang’s documentation report)

---

## 6. Job lifecycle (canonical C-end)

```
Post → (Quotes | Grab) → Select → Escrow pay
  → Schedule (phone) → On the way / arrived
  → Work → Completion photos → Accept / rework
  → Release → Rate
```

Visibility (“服务过程清晰可见”) is a selling point versus informal WeChat hiring.

---

## 7. What we adopt vs. drop

| Adopt | Adapt for Indonesia materials O2O | Drop |
|---|---|---|
| SKU-tied verbs: deliver / measure / install / repair / tear-out | Bind to CRMEB-style goods order + store inventory | China-only WeChat mini-program as the only C-end |
| Three modes: fixed price, quote auction, 总包 | Fixed = Tukang harian; quote = Tukang interest; 总包 = chain-owned crew | ¥ pricing, WeChat pay |
| Escrow until photo accept | Align with Tukang Deposit Borongan + QRIS/VA | Unpublished bond amounts as product truth |
| 先行赔付 for enterprise | Platinum members / store-sold installs get priority remedy | Claim 450万 mitra |
| Completion photos as release trigger | Same artifact as Tukang project report | Separate consumer vs. merchant apps in v1 prototype (App-only brief) |

---

## Sources

1. [万师傅 mobile home](https://m.wanshifu.com/) — categories, escrow strip, coverage claims.  
2. [Guarantee / 担保交易](https://m.wanshifu.com/mobileWebsite/guarantee) — escrow, QC, 先行赔付, insurance.  
3. [家庭小程序下单流程](https://www.wanshifu.com/zhidao/620e0094cf0190000721b1ea.html) — 一口价 / 报价单 / 预付款 steps.  
4. [师傅招募](https://mobile-www.wanshifu.com/) — KYC + exam.  
5. [总包 intro](https://worker.wanshifu.com/intro) — MSP, monthly settle, OMS hook.  
6. Apple App Store — 万师傅家居服务 (`id6449211492`) — category list, 3-min/5-quotes, 一口价, 总包.  
7. Partner flow digest “万师傅业务流程” (quote / 总包 / pay-first / pay-later).
