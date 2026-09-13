# BataTukang product blueprint

**Working name:** BataTukang  
**One-liner (EN):** Offline building-materials supermarket + online mall + membership pricing + live delivery + Tukang-style installer marketplace — one App.  
**One-liner (ID):** Supermarket bahan bangunan offline + mal daring + harga member bertingkat + lacak kiriman + pasar tukang pasang/perbaiki — satu aplikasi.

This document synthesizes [Tukang.com](research/tukang.md), [万师傅](research/wanshifu.md), and [CRMEB multi-store](research/crmeb-multistore.md) into a single App-only IA. Visual map: [ia-map.md](ia-map.md). Interactive flow: [`../mindmap/mindmap.html`](../mindmap/mindmap.html).

---

## 1. Problem

A Jabodetabek contractor or homeowner today splits the journey across:

1. A physical supermarket (stock, pickup, contractor account).  
2. A marketplace / WhatsApp for leftover SKUs.  
3. Informal tukang (price opacity, no escrow, no status).  
4. A separate “install after delivery” chase when tiles or a vanity arrive.

China already fused (2)+(4) for furniture via Wanshifu. Indonesia already has a specialized tukang marketplace (Tukang.com) but **not** fused to a materials chain. CRMEB already solved multi-store member price + pickup + city delivery — but has **no** craftsman aggregate.

BataTukang is that fusion.

---

## 2. Design principles

1. **One member, two order types.** GoodsOrder (CRMEB) and ServiceOrder (Tukang/Wanshifu) share wallet, address, language, and tier.  
2. **Member price is visible before pay.** List → tier price → coupons → points (CRMEB 多店 member-price-first; combo pay is v4.1).  
3. **Fulfillment is a timeline, not a status noun.** Paid → packed at *named store* → rider → delivered → *installable*.  
4. **Every installable SKU carries a verb.** Deliver / pickup / measure / install / repair / tear-out (Wanshifu).  
5. **Three hire modes, not one.** Fixed daily (一口价 / harian), quote compare (报价 / minat), project RAB + escrow (borongan / 总包-like).  
6. **Escrow until evidence.** Photos or documentation report unlock release (both sources).  
7. **App-only.** No merchant desktop in this prototype (brief).  
8. **Bilingual EN + Bahasa Indonesia** with an in-app toggle; no missing keys on primary flows.

---

## 3. Actors (App-visible)

| Actor | Needs |
|---|---|
| **DIY member** | Browse mall, see Gold price, pickup or same-day, optional installer |
| **Small contractor** | Repeat SKUs, pickup queue, multi-bag delivery, book a crew |
| **Homeowner (service-first)** | Leak / AC / tile repair without buying goods |
| **Mitra tukang** (profile only in v1 prototype) | Rating, skills, radius, quotes — customer sees this card |
| **Store** (as a place, not a login) | Kebayoran / Bekasi / Tangerang superstores as 提货点 |

HQ, rider, and 总包 consoles are out of App scope but exist on the mind map.

---

## 4. Domain objects

```
Member { tier, points, addresses, lang }
Store { geo, hours, stock[], fence }
Sku { priceList, memberPrice[tier], o2oFlag, installCategory? }
Cart { lines, storeId, fulfillMethod }
GoodsOrder { pay, timeline[], serviceOrderId? }
ServiceOrder {
  mode: fixed | quote | project,
  quotes[], mitraId, escrow, photos[], retensiUntil
}
Mitra { class: tukang|specialist|contractor, skills[], rating, jobs }
```

---

## 5. End-to-end happy path (must be clickable)

```
Home (tier badge, nearest store, dual entry: Mall | Tukang)
  → Mall category → PDP (list vs member price, “Need install?”)
  → Cart → Checkout (pickup | city delivery, geofence, tier math)
  → Pay (QRIS / VA / card / wallet / COD-pickup)
  → Orders → Delivery timeline (store-named events)
  → CTA “Book installer for these SKUs”
  → Tukang home → specialization → job form (SKU prefilled)
  → Quote compare (2–3 Mitra)
  → Craftsman profile
  → Escrow pay → Job tracking (on the way / photos)
  → Accept → Rate (retensi clock)
  → Account (tier ladder, language, orders)
```

This is also the spine of the mind map.

---

## 6. Information architecture (summary)

**Bottom tabs (5):** Home · Mall · Tukang · Orders · Account  

**Mall stack:** store switcher, category grid, PDP, cart, checkout, pay, membership paywall.  
**Tukang stack:** service grid, book form, quotes, profile, job track, rating.  
**Shared:** language toggle, member badge, address, wallet.

Full screen list and merge rationale: [ia-map.md](ia-map.md).

---

## 7. Pricing & membership

Inspired by CRMEB shop-member (≤10 levels, 专享价, 购物金) but **chain-global** so cement is not four Gold prices:

| Tier | Goods off | Delivery | Install perk |
|---|---|---|---|
| Regular | 0% | Standard fee | Standard quotes |
| Silver | 5% | Pickup priority | Highlighted on quote list |
| Gold | 10% | Same-day fee waive ≤ Rp 150k cart | 1 free measure / quarter |
| Platinum | 15% | Dedicated slot | Priority re-service (先行赔付-style) |

Prototype lets the user **switch tier** on Account / Membership to feel the price delta immediately (no real payment backend).

---

## 8. Payments

| Rail | Goods | Harian service | Project service |
|---|---|---|---|
| QRIS / VA / card | Yes | Yes | Yes (into escrow) |
| Wallet (Saldo Bata) | Yes | Yes | Yes |
| Cash / COD | Pickup or post-service harian only | After complete (Tukang pattern) | No — escrow required |
| Staged release | — | — | Deposit Borongan analogue |

---

## 9. Trust

- Mitra class + job count + rating (Tukang).  
- Escrow until accept + photos (Wanshifu).  
- Retensi 24h daily / 7–30d project (Tukang).  
- Store name on every logistics event (CRMEB multi-warehouse).  
- Platinum-style 先行赔付 copy on membership.

---

## 10. Out of scope (v1 prototype)

- Real payments, real GPS, real inventory API.  
- Merchant / rider / 师傅 login.  
- Live / group-buy / promoter (CRMEB marketing suite).  
- Legal entity cloning of Tukang.com or 万师傅.  
- Admin / desktop.

---

## 11. Success metrics (product, not this HTML)

- % of installable GMV that attaches a ServiceOrder before D+1.  
- Quote-select rate within 2 hours (Tukang SLA).  
- Delivery timeline view rate vs. CS WhatsApp contacts.  
- Member-price attach rate (Silver+).  
- Re-service rate inside retensi.
