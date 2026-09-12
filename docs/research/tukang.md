# Tukang.com research (Indonesia)

**Product:** Tukang.com  
**Publisher:** PT Tukang Teknologi Indonesia  
**Play Store:** [com.tukang.app](https://play.google.com/store/apps/details?id=com.tukang.app)  
**Web:** [tukang.com](https://tukang.com)  
**Coverage (as of listing):** JABODETABEK only  
**Scale signals:** 100K+ Play Store downloads; LinkedIn lists ~80 employees, founded 2015  
**Primary sources reviewed:** Play Store listing (EN/ID, updated 27 Jun 2025, v4.3.1), official FAQ pages 1–2 and 4–6, Terms of Service, LinkedIn company profile.

This note reconstructs the **customer-facing marketplace** (not the craftsman back-office). BataTukang’s installer module is inspired by these mechanics, not a clone of Tukang.com branding.

---

## 1. Positioning

Tukang.com is an **app-only booking platform** for home maintenance, build/renovate, and design. The Play listing (2025) packages three pillars:

| Pillar | What the customer books | Typical duration |
|---|---|---|
| **Home Maintenance** | 100+ SKUs of repair, install, upkeep | One-day / “harian” |
| **Build and Renovate** | Tell a plan; consultants + contractors execute | Multi-day project |
| **Design Inspiration** | Interior / architectural consult + working drawings | Consult + RAB |

Official FAQ: “Tukang.com adalah platform pemesanan tukang… berdasarkan bidang keahlian kerja (spesialisasi).” Orders **cannot** be placed on the marketing website — only via iOS/Android app.

---

## 2. Roles

### 2.1 Demand side

- **Customer (end user):** posts a job by specialization, uploads address + photos + scope, picks a Mitra, pays, rates after completion.
- **Customer Service:** WhatsApp `+62-812-1224-4334`, call center `021.84975464`, in-app “Kirim Pesan ke Tukang.com”, email `cs@tukang.com`. Required for refunds, unreachable Mitra, mid-job vendor swap.

### 2.2 Supply side — three Mitra classes

Official FAQ distinguishes **capability and legal form**, not just a skill tag:

| Class | Who | Examples | Best fit |
|---|---|---|---|
| **Tukang** | Individual tradesperson | Tukang batu, besi, cat, gypsum, ledeng, listrik, kayu, kebun | Single-skill daily jobs |
| **Spesialis** | Sole proprietor / firm with a standard + crew | AC, CCTV, aluminium, plumbing, furniture, interior design | Branded category work |
| **Kontraktor** | Firm that **orchestrates multiple trades** on one project | Kontraktor bangunan, M/E, interior | Renovate / build |

Implication for IA: a job must carry a **partner class filter**. A curtain install should not surface a general contractor; a full house gut-reno should not surface a solo electrician.

### 2.3 Platform

- Matching + 2-hour interest window
- Analyst review of RAB (bill of quantities) so “harga terbaik” is not raw Mitra list price
- Escrow-like **Deposit Borongan** for projects
- **Retensi** (retention / defect window) after completion

---

## 3. Specializations (23 + bundled reno)

From FAQ (2021–current copy):

**MEP / appliances:** AC, CCTV, Elektronik, Elektrikal/Listrik, Mekanikal  
**Building fabric:** Aluminium & Kaca, Atap, Batu & Keramik, Cat, Kusen, Las, Ledeng, Plafon  
**Interior finish:** Furniture, Gordyn/Curtain, Parquet, Sofa, Vinyl & Karpet, Wallpaper  
**Outdoor:** Kolam Renang, Taman  
**Design:** Desain Arsitek, Desain Interior  

Plus a **renovation SKU** that can span several specializations in one order. For mixed small jobs (e.g. kusen + ledeng) FAQ still recommends **two bookings** because tools and Mitra differ.

---

## 4. Booking funnel (home maintenance)

Reconstructed from FAQ/2:

1. **Discover** — home search or specialization tile.
2. **Read service card** — scope, duration, base tariff → *Lanjut*.
3. **Job form** — address, work description, photos. Completeness is framed as helping Mitra price/prepare.
4. **Broadcast** — wait **up to 2 hours** for Mitras who “berminat” (interested).
5. **Select Mitra** — customer chooses among interested partners. If **no choice within 60 minutes**, the order **auto-cancels**.
6. **Pay** within the stated window (see §6).
7. **Confirm** — Mitra visits on the booked slot and typically **calls to confirm arrival**.

No-interest causes cited by Tukang: slot too soon, or address outside Mitra radius.

**BataTukang takeaway:** interest → compare → pay is the core “quote marketplace” loop. We expose it as an explicit **Compare quotes** screen rather than burying it in chat.

---

## 5. Job lifecycle

Two clocks, two commercial objects.

### 5.1 Harian (one-day service)

- Clean working time: **6 hours** (not 8). Tukang argues 8h usually includes lunch; their 6h is net of rest and of travel.
- Scope: small installs / small repairs finishable in one day.
- Price covers **jasa only** — materials extra.
- Done when work matches the in-app description **or** the on-site agreement, even if under 6 hours.
- Base call-out: **from Rp 150.000 / day** (repair & install). Survey/consult: **from Rp 100.000**. Neither includes materials or extras.

**On-site change order:** if the job cannot finish that day, the arrived Mitra submits an **offer** (materials + jasa). Work continues only after the customer accepts and **project payment is settled to Tukang.com**.

### 5.2 Proyek / borongan (multi-day)

1. Mitra visits as **surveyor** (measure / inspect).
2. Produces **RAB** (Rencana Anggaran Biaya): sizes, material prices, labor.
3. RAB is submitted **in-app only** (no side-channel price) and reviewed by Tukang analysts.
4. Duration follows the approved RAB.
5. Customer pays **100% upfront** into **Deposit Borongan**.
6. Platform **releases funds in stages** as work progresses.

v4.3.1 added **downloadable Project Documentation Report** — evidence pack for the progress/release loop.

---

## 6. Payments

| Mode | Methods | When money moves |
|---|---|---|
| **Harian** | Tunai (cash to Mitra **after** done), bank transfer, credit card | Cash is post-service; transfer/CC per payment page |
| **Proyek / renovasi** | Bank transfer, credit card, **kredit renovasi** (installment / financing) | 100% into Deposit Borongan, then staged release |
| **Inspection add-on (v4.3.1)** | Cash option added for home-maintenance inspection | Listing changelog |

Also in Terms: Virtual Account, e-wallet, financing institutions. Wallet residual (“Saldo Tukang”) is refunded via CS; interbank switching fee may be charged to the customer.

**Trust model:** project money is **platform-held**, not paid in full to the Mitra on day one. Daily cash is the exception — higher convenience, weaker escrow.

Refund path: cancel with CS + Order ID + destination account.

---

## 7. Ratings, complaints, retensi (trust)

- Rating UI appears only when job status is **Completed**.
- **Harian complaint window:** 1×24 hours after Mitra taps complete. Channel: call center **or** the rating page.
- **Borongan complaint window:** 7×24 hours after completion (FAQ/6). Mid-job, CS can **swap vendor at no extra fee** if the Mitra cannot finish.
- **Retensi:** Tukang’s name for the defect-liability window. Platform **mediates complaints during retensi only**.
  - Harian: 1×24h
  - Project: **7–90 days** scaled to job size
- Terms are more conservative: Tukang.com **does not warrant** Mitra quality; service is “as is”; residual risk sits with the customer. Product implication: the app must still **feel** protective (deposit, retensi, CS, ratings) even if legal warranty is thin.

Trust signals the listing/FAQ emphasize: verified Mitra classes, contractual RAB, analyst price check, deposit staging, documentation report, CS WhatsApp.

---

## 8. Data / ops notes (Play listing)

- Collects location, personal info, and three other types; encrypted in transit; deletion request supported; “no data shared with third parties” (developer declaration).
- Location is load-bearing: radius matching + JABODETABEK geofence.

---

## 9. What we adopt vs. drop

| Adopt | Adapt | Drop / do not copy |
|---|---|---|
| Specialization-first booking | Attach **SKU from the mall** so install is not a blank form | Tukang.com brand, copy, or assets |
| Interest window + customer pick | Surface 2–3 quotes side-by-side with ETA and rating | 60-minute auto-cancel as the only recovery (we keep “rebook”) |
| Dual clock: harian vs. RAB project | Map harian → Wanshifu-style fixed price; project → escrow | Cash-only mental model for mall goods |
| Deposit + staged release | Same pattern for install jobs ≥ 1 day | Legal “as-is” framing in the happy-path UI |
| Retensi + post-complete rating | 24h (daily) / 7–30d (project) in prototype | Separate apps for customer vs. marketing site as a hard rule (we are App-only by brief) |

---

## Sources

1. Google Play — Tukang.com (`com.tukang.app`), EN & ID, observed Sep 2026 (listing updated 27 Jun 2025).  
2. [FAQ /1 — product, specializations, roles, tariffs](https://tukang.com/home/faq/1)  
3. [FAQ /2 — booking steps, 2h interest, 60m cancel](https://tukang.com/home/faq/2)  
4. [FAQ /4 — payment methods, Deposit Borongan, refunds](https://tukang.com/home/faq/4)  
5. [FAQ /5 — harian cash vs. project deposit](https://tukang.com/home/faq/5)  
6. [FAQ /6 — ratings, complaints, retensi](https://tukang.com/faq/6)  
7. [Terms of Service](https://www.tukang.com/terms)  
8. [LinkedIn — TUKANG.COM / PT Tukang Teknologi Indonesia](https://www.linkedin.com/company/tukang.com)
