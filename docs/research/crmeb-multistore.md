# CRMEB multi-store research

**Primary product for this brief:** CRMEB **连锁多门店** (chain multi-store) **v4.1** — HQ → region → store O2O.  
**Related but different line:** CRMEB **多商户** (multi-merchant marketplace). A building-materials supermarket chain maps to **连锁多门店**, not open 招商 settlement.  
**Vendor:** 西安众邦网络科技 / [crmeb.com](https://www.crmeb.com)  
**Docs:** [doc.crmeb.com/pro](https://doc.crmeb.com/pro) (多店 v4.1)  
**Public demo (H5):** [multi-store.crmeb.net](http://multi-store.crmeb.net)  
**Brief context:** “O2O mall side intended to be secondarily developed from **CRMEB multi-store latest**.” This note extracts **consumer-facing commerce patterns** from public release posts. **No private API access.**

CRMEB is a **productized mall**, not a tukang network. We treat it as the **goods + member + store + fulfillment** half of BataTukang.

## 0. v4.1 (2026-07) — what “latest” means on the App side

Public release ([crmeb.com/news/detail/1238](https://www.crmeb.com/news/detail/1238)):

| Pattern | Consumer / checkout implication |
|---|---|
| **组合支付 (combo pay)** | If wallet is short of payable, auto-offer balance + WeChat/Alipay/offline. Full wallet hides combo. |
| **Freight detail popup** | City-delivery orders show a fee breakdown after store freight is configured. |
| **Delivery slot** | Same-city date/time; after hours, default slot = tomorrow (v4.1 #12). |
| **三配送** | 同城配送 / 快递 / 到店自提, driven by store settings. |
| **Cross-store member** | One card, shared discounts/points; services can 跨店核销 (HQ–store story). |
| **Paid + level members** | 等级会员 / 付费会员 / 积分商城 (HQ marketing, May 2026). |

Store-mobile **代客下单**, stock-take, and occupied-inventory are **ops** — out of this App-only prototype, but they confirm the same member + fulfill objects.

---

## 1. Store / merchant model

From product pages and mer3.1 docs:

| Layer | Responsibility |
|---|---|
| **Platform** | Rules, categories, take-rate, platform coupons, (v4.2) platform courier pool, finance split |
| **Merchant / shop** | Own catalog, own (or platform) delivery, own (v4.2) shop-member program, merchant coupons |
| **Store / warehouse as pickup node** | Multiple “提货点”; default nearest by LBS; user can switch (e.g. pick up on the way) |
| **Self-operated vs. settled vs. joint-venture** | Chain HQ can run flagship stores; third-party brands can settle; fees configurable per merchant class |

Operating modes the marketing site lists:

1. **Platform self-operated mall** — unify member, SKU, order, finance across online + offline.  
2. **Multiple self-operated shops** — each shop owns a catalog, sold through one consumer app.  
3. **Open settlement (招商)** — third-party merchants join; platform takes commission on GMV.  
4. **Joint / 联营** — hybrid.

For a **building-materials supermarket chain**, the natural CRMEB mapping is:

- HQ = platform + self-operated flagship  
- Each physical supermarket = **merchant + 提货点 + 同城配送 origin**  
- Selected brands (paint, sanitary) = settled merchants sharing the same member wallet  
- Install/repair is **not** a CRMEB primitive — we fuse Tukang/Wanshifu as a second order type on the same member.

Merchant admin is **independent** (separate `/merchant` console on the demo). Prototype stays **App-only**, so this is backstage context only.

---

## 2. Member levels and pricing

CRMEB has historically had **platform growth-value members**, and v4.2 adds **shop-level members**. Both matter.

### 2.1 Platform 成长会员 (older mer line)

- Configurable **levels** driven by **growth value** (not only cash spend).  
- Each level has an **权益 (benefits) pack** with on/off switches.  
- Points: earn on order, deduct at pay, freeze window, expiry, invite bonus, check-in rules.  
- Admin can force a user’s level.

### 2.2 Shop member (v4.2 preview / current “latest” story)

- Up to **10 levels** per merchant.  
- Upgrade conditions + benefit mix per level.  
- Benefit types: **会员专享价**, stored-value **购物金**, member-only coupons, join/upgrade gifts.  
- Stored-value packs (e.g. top-up 100 get 20) land in the **merchant** account; platform still takes order commission when 购物金 is spent.  
- Checkout math (vendor description): **member price first**, then coupons, then points.

### 2.3 What we implement in the prototype

A single chain-wide ladder (simpler than 10 shop-specific ladders — a supermarket brand should not show four different Gold prices for the same bag of cement):

| Tier | Discount on goods | Extra |
|---|---|---|
| Regular | 0% | Earn 1× points |
| Silver | 5% | Free pickup queue, 1.2× points |
| Gold | 10% | Same-day delivery fee waive under threshold, 1.5× points |
| Platinum | 15% | Priority 先行赔付-style install remedy, 2× points |

Prices on PDP / cart / checkout always show **list → member**. That is the CRMEB “会员价优先” moment.

---

## 3. O2O pickup / delivery patterns

This is the part of CRMEB that is actually “multi-store latest,” not generic B2C.

### 3.1 同城配送 (same-city delivery) — v3.3+

- **SKU flag:** merchant must enable 同城配送 on the product, turning it into a local-instant SKU.  
- **Capacity modes:**  
  - Merchant self-fleet (add riders, peak staffing)  
  - Third-party: **UU跑腿 / 达达** (Indonesia analogue: GoSend / GrabExpress / in-house truk)  
  - **v4.2 platform fleet:** HQ owns riders, sets fees, night surge, commission; merchant chooses “平台配送”  
- **Multi-warehouse:** several stores as origins; **nearest default**; user override.  
- **Geofence:** radius from store, administrative region, or polygon. Outside fence → 同城配送 disabled at checkout.  
- **Ops:** dispatch (manual assign) or rider grab; rider app on/off-line.

### 3.2 到店核销 (in-store pickup / verify)

- Buy online, redeem offline — the classic CRMEB “online traffic → store” loop.  
- For materials: **B2B contractors** and **DIY members** both want pickup (avoid broken-bag last-mile).  
- Prototype: checkout method `Pickup at Kebayoran Superstore` + QR to show at timber counter.

### 3.3 LBS store street

Marketing: locate nearby 商圈/店铺. Prototype home shows **nearest superstore** + stock hint (“12 bags cement in-store”).

### 3.4 Order tracking

v3.3 narrative: 接单 → 配送 → 收款 with rider-side work orders. We expose a **timeline** (paid → packed at store → rider assigned → out for delivery → delivered → “book installer”).

---

## 4. Catalog / marketing primitives we keep thin

CRMEB is marketing-heavy (seckill, group-buy, bargain, live, community 种草, presale, bundles, platform+shop coupons, DIY home). For a materials + tukang App we **keep**:

- Product types: physical SKU, (later) virtual install voucher  
- Store coupons + member price  
- Nearby store + pickup  
- Order + after-sales  

We **do not prototype** live commerce, bargain, or promoter pyramids — they dilute the O2O + craftsman story.

---

## 5. After-sales on the mall side

CRMEB orders have refund / return flows and merchant handling. Combined with Wanshifu:

- **Goods defect** → mall refund / replace (CRMEB)  
- **Install defect** → retensi / re-service / 先行赔付 (Tukang + Wanshifu)  
- A delivered-but-uninstalled vanity is **two order objects** linked by `parentOrderId`.

---

## 6. Secondary-development stance (brief)

“Based on CRMEB multi-store latest secondary development” means:

- Reuse **domain objects**: platform, merchant, store node, member level, member price, points, 同城配送, 到店核销, coupons.  
- Do **not** ship CRMEB PHP in this repo (this deliverable is an App HTML prototype).  
- Fuse a **ServiceOrder** aggregate that CRMEB does not have: quote set, escrow, completion photos, retensi.

---

## Sources

1. [CRMEB 多商户 v3.1 系统简介](https://doc.crmeb.com/mer/mer3_1) — B2C+O2O, settlement, 到店核销, 同城配送.  
2. [crmeb.com/index/merchant](https://www.crmeb.com/index/merchant) — self-op / joint / settle, LBS, UU/Dada, pickup verify.  
3. [v3.3 release — 同城配送](https://www.crmeb.com/news/detail/1205) — SKU flag, self vs. 3P fleet, multi-warehouse, geofence, dispatch/grab.  
4. [v4.2 preview — 平台配送 + 店铺会员](https://www.crmeb.com/ask/thread/76572) — platform riders, 10 shop levels, 购物金, member-price-first checkout.  
5. [v2.0.3 platform feature list](https://www.crmeb.com/ask/thread/13254) — growth levels, points, merchant classes, city delivery config.  
6. [连锁多门店 v3.5 — 同城配送](https://www.crmeb.com/news/detail/1212) — self / UU / Dada, radius / admin / geofence, slot, store vs mall cart.  
7. [连锁多门店 v4.1](https://www.crmeb.com/news/detail/1238) — combo pay, freight popup, tomorrow default slot, H5 demo `multi-store.crmeb.net`.  
8. [多店 v4.1 docs preface](https://doc.crmeb.com/pro) — HQ chain, cross-store member, H5/App.
