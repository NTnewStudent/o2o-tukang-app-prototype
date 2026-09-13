# Information architecture — merging mall + tukang

How CRMEB multi-store navigation and Tukang/Wanshifu service navigation become **one App** without a Frankenstein tab bar.

---

## 1. Why a merge (not two mini-apps)

| If we shipped two tabs that never meet | What users actually do |
|---|---|
| Mall checkout ends at “Delivered” | They still need a person with a grinder |
| Tukang form starts from a blank specialization | They already know the SKU (60×60 tile, 12 m²) |
| Two wallets, two addresses, two languages | Same human, same house |

**Merge rule:** a GoodsOrder may *spawn* a ServiceOrder with `skuLines[]` prefilled. A ServiceOrder may *deep-link* into Mall when the Mitra’s RAB lists materials the chain sells.

```
[Mall PDP] --"Need install?"--> [Book service (SKU pinned)]
[Delivery delivered] --"Book tukang"--> [Quote compare]
[Job RAB] --"Buy these materials"--> [Cart with SKUs]
```

---

## 2. Tab bar (always)

```
🏠 Home     🛒 Mall     🛠️ Tukang     📦 Orders     👤 Account
```

Five tabs, not six. **Orders** is the shared inbox (goods + jobs). **Membership** is not a tab — it is a card on Home + a screen from Account + a price chip on PDP.

Language toggle lives in the **phone chrome** (global), not inside one tab.

---

## 3. Screen inventory

### Home

- Location + nearest superstore (CRMEB LBS).  
- Member badge + progress to next tier.  
- Dual hero: Shop materials | Book a tukang.  
- Promo rail, installable SKUs, top-rated Mitra.  
- Service chips (AC, ledeng, listrik, keramik…).

### Mall (CRMEB-shaped)

| Screen | CRMEB analogue | Notes |
|---|---|---|
| `#/mall` | Shop / category home | Store switcher (Kebayoran / Bekasi / Tangerang) |
| `#/mall/:cat` | Category | Cement, tile, paint, MEP, hardware |
| `#/product/:id` | PDP | List vs member price; stock@store; install CTA |
| `#/cart` | Cart | Fulfillment method chips |
| `#/checkout` | Order confirm | Tier math, fence, pickup QR hint |
| `#/pay` | Cashier | QRIS / VA / card / wallet / COD |
| `#/membership` | Shop member center | 4 tiers, benefits, fake upgrade |

### Tukang (Tukang.com + 万师傅)

| Screen | Source | Notes |
|---|---|---|
| `#/tukang` | Tukang home + Wanshifu verbs | 23-style specializations, collapsed to 10 for proto |
| `#/book/:service` | Job form | Address, photos, mode = fixed/quote/project, SKU pin |
| `#/quotes/:job` | Interest list / 报价 | 2–3 cards, 2h window copy, 60m pick reminder |
| `#/craftsman/:id` | Mitra profile | Class, skills, rating, sample jobs |
| `#/job/:id` | Lifecycle | Timeline + photo accept |
| `#/rate/:id` | Rating + retensi | Stars + tags + complaint hint |

### Orders (shared)

- `#/orders` segmented: Delivery | Pickup | Tukang jobs.  
- `#/order/:id` goods timeline (store-named).  
- Jobs reuse `#/job/:id`.

### Account

- Profile, tier, points, language (duplicate of chrome), addresses, legal links to research docs (prototype).

---

## 4. Object graph (IA, not ERD)

```
Member
 ├─ GoodsOrder ── Store ── RiderEvent[]
 │     └─ (optional) ServiceOrder
 └─ ServiceOrder ── Mitra
       ├─ Quote[]
       ├─ EscrowLedger
       └─ EvidencePhoto[]
```

Orders tab is a **union query** over GoodsOrder ∪ ServiceOrder sorted by `updatedAt`.

---

## 5. Navigation rules

1. Bottom tabs reset their own stack; they do not wipe the other stack (SPA hash + memory).  
2. Cross-domain CTAs **push** onto the target stack (Mall → Book keeps `from=order:BT-1042`).  
3. Back on a pushed Book screen returns to the PDP or timeline, not to Tukang home.  
4. Pay success always lands on the matching timeline (goods or job).  
5. Language switch re-renders the current screen; it does not navigate.

---

## 6. What we refused to copy

- CRMEB “店铺街” as a second home — we have three owned superstores, not 200 settled food stalls. Store switcher is enough.  
- Tukang’s marketing website as an order channel — brief is App-only.  
- Wanshifu’s separate 师傅 / merchant / household apps — one consumer App.  
- A sixth “Membership” tab — it is a state, not a destination.

---

## 7. Prototype route list

```
#/home #/search #/mall #/category/:id #/store/:id #/product/:id
#/cart #/freight #/checkout #/pay #/membership
#/orders #/order/:id
#/tukang #/service/:id #/book/:service/:sku? #/quotes #/rab
#/craftsman/:id #/job/:id #/rate/:id #/report/:id #/aftersales/:id
#/inspiration #/inspire/:id
#/account #/wallet #/messages #/chat/:id
```

All of the above are implemented in `app/` with EN/ID strings in `app/js/i18n.js`.
