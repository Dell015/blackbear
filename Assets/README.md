# Black Bear Kitchen + Coffee: Asset Plan

All 155 images in this folder were renamed and sorted on 2026-11-18.

- `assets-inventory.csv` lists every file with its size, type, website use and original filename.
- `../_work/rename-log.csv` maps every old path to its new path, so any move can be undone.

Nothing was deleted. Duplicates were moved to `_duplicates/`. The old folders (`Logo/`, `Menu/…`, `people/…`, `the-place/`) are now empty and can be removed.

> Preview-only rule (from the playbook): these are Black Bear's public posts. Use them for the pitch demo only. When they say yes, replace them with their original files.

---

## 1. Folder structure

```
Assets/
├── 01-brand/            5   logo, key art, mascot
│   ├── logo/                badge logo (sage small, cream-on-forest)
│   ├── key-art/             camp scene banner (portrait + Santiago 24/7 version)
│   └── mascot/              Bernie the Bear
├── 02-menu-boards/      21  full menus = source for menu DATA, not for display
│   ├── legacy-landscape/    older landscape menu (5 pages)
│   ├── text-pages/          plain text menu pages (3)
│   ├── illustrated/         current illustrated boards: food + all drink categories (8)
│   └── food-posters/        brunch club, lunch & dinner, bear bites, salad & wrap (5)
├── 03-products/         66
│   ├── food/                7 signature dishes
│   ├── cakes/               8 cakes
│   └── drinks/
│       ├── coffee/          16
│       ├── matcha/          5
│       ├── protein/         17
│       ├── refreshers/      6 (summer + yogurt)
│       ├── decaf/           4
│       ├── frappes/         2
│       └── non-coffee/      1
├── 04-campaigns/        15  promos and themed posts (thankful series, payday, memes…)
├── 05-places/           20
│   ├── branches/            labelled branch cards (Ilagan, Santiago, SM Cauayan, Roxas, Tuguegarao, Cauayan SF)
│   ├── interior/            10 interior shots
│   └── exterior/            4 storefront/door/sign shots
├── 06-people/           15
│   ├── staff/               team + kitchen + barista
│   └── ghost-shoot/         Halloween ghost photoshoot (9)
├── 07-references/       2   reel screenshots (Regular/Decaf), design reference only
└── _duplicates/         11  lower-res or identical copies, do not use
```

**Naming:** `category-subject-detail.jpg`, all lowercase with hyphens. Series are numbered (`thankful-01-…`, `ghost-shoot-01-…`).

**Image types** (the `type` column in the CSV):

| Type | Count | What it means for the site |
|---|---|---|
| clean photo | 29 | Usable anywhere, including full-bleed and hero |
| photo + small label | 18 | Usable as-is; crop out the label pill if needed |
| graphic with text | 95 | Finished social posts with text baked in. Use as-is for promo cards, or crop the product area. Not good as plain menu photos. |
| reference / duplicate | 13 | Do not publish |

---

## 2. Site plan: where every folder goes

| Site section | Main assets | Notes |
|---|---|---|
| **Header / favicon / share image** | `01-brand/logo/*` | The small sage logo is only 150px. We need their vector/PNG logo. For the demo, redraw the wordmark as text. |
| **Hero ("The Campsite")** | `01-brand/key-art/camp-scene-portrait.jpg` | Layer it (sky, trees, hills, tent, bear, props) for parallax. |
| **Story / About** | `01-brand/mascot/bernie-the-bear-meet.jpg`, `05-places/interior/interior-bear-hugs-wall-sign.jpg`, `06-people/staff/*` | Est. 2020, Isabela. "Bear Hugs & Bold Brews". |
| **Daily Fuel spread (annotated)** | `04-campaigns/campaign-daily-dose-good-fuel.jpg` | Reference for the hand-drawn doodle animation. |
| **Menu: Food** | `03-products/food/*`, product areas cropped from `02-menu-boards/food-posters/*` | Menu text and prices come from `02-menu-boards/illustrated/` (current). |
| **Menu: Drinks** | `03-products/drinks/**` | Categories: Coffee, Matcha Series, Protein Series, Refreshers, Decaf, Frappes/Iced Blended, Non-coffee, Smoothies. |
| **Cakes of the Day** | `03-products/cakes/*` | Per-branch daily board (replaces the 24h IG story). |
| **Featured series** | `protein-series-*`, `matcha-series-lineup`, `refreshers-summer-lineup`, `decaf-*` | One banner per series. |
| **Promos / News** | `04-campaigns/**` | Payday, Thankful, New Year Reset. |
| **Branch locator + branch pages** | `05-places/branches/*`, `interior/*`, `exterior/*`, `01-brand/key-art/camp-scene-santiago-24-7.jpg` | Stylized map like `branch-tuguegarao-map-card.jpg`. Santiago = 24/7. |
| **Events / Conference room** | `05-places/branches/branch-cauayan-sf-conference-room.jpg` | Private events inquiry (0917 500 0324). |
| **Gallery** | `05-places/interior/*`, `06-people/ghost-shoot/*`, `coffee-latte-art-*`, `coffee-espresso-*` | |
| **Careers** | `06-people/staff/*` | Needs staff consent before publishing faces. |

Later (not in the first build): the automatic time-of-day theme. `07-references/ref-reel-*.png` is kept for that.

---

## 3. Branch photo coverage

| Branch | Phone | Assets we have |
|---|---|---|
| Cauayan District 1 (main) | 0917 558 2327 | none labelled |
| Cauayan San Fermin / SM Cauayan | 0917 500 0324 | `branch-sm-cauayan-card`, `branch-cauayan-sf-conference-room` |
| Santiago (24/7) | 0917 562 8884 | `branch-santiago-card`, `camp-scene-santiago-24-7`, `staff-team-santiago-table`. Likely also `interior-lounge-bear-window`, `exterior-green-door-entrance` (same lounge as the branch card). |
| Alicia | 0917 558 0004 | none |
| Ilagan | 0917 500 0384 | `branch-ilagan-card` |
| Roxas | ? | `branch-roxas-neon-sign` |
| Tuguegarao | ? | `branch-tuguegarao-map-card` |

Unlabelled interiors and exteriors are kept generic. Confirm which branch each one is.

---

## 4. Gaps: what to ask Black Bear for

**Brand files**
- [ ] Logo as SVG/AI/transparent PNG: badge, wordmark "BLACK BEAR / KITCHEN+COFFEE", bear icon
- [ ] Camp scene artwork as a layered file (AI/PSD/Canva) so it can be animated
- [ ] Doodle set (sun, heart, sparkles, plane, bear line art), Bear Scout pennant, "Bear Hugs & Bold Brews" badge, "Wild. Fresh. Blended." badge
- [ ] Font names: wordmark sans, mono, script/retro titles

**Photos**
- [ ] Clean product photos without text for main menu items (most current ones are finished posts)
- [ ] Branch photos for Cauayan D1, Alicia, Tuguegarao, Roxas
- [ ] Original full-resolution files (Facebook copies are compressed)

**Data**
- [ ] Current full menu with prices (the boards differ slightly between versions)
- [ ] Hours per branch, exact addresses, map pins, Roxas and Tuguegarao phone numbers
- [ ] Which branches carry which items (cakes, protein series, etc.)
- [ ] Permission for staff photos

---

## 5. Housekeeping
- `_duplicates/` (11 files) and the empty old folders can be deleted once you approve.
- `../_work/contact-sheets/` holds numbered preview sheets used to sort the images. It's safe to delete.
