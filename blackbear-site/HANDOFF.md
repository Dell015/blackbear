# HANDOFF: Black Bear Kitchen + Coffee prototype

For the next builder (GPT-6.1 Sol). Read this whole file before changing anything.
Claude acts as **QA**: build, then hand over using the checklist in section 9.

---

## 0. Ground rules (non-negotiable)

1. **Never commit or push to git.** The owner does git. Don't create a repo.
2. **Never invent facts.** That covers prices, hours, addresses, phone numbers, awards, reviews and menu items. Anything unknown stays `null` / `confirmed: false` and shows **"to confirm"** in the UI.
3. **The menu data is the source of truth.** `lib/data.ts` was copied by hand from their current boards (`Assets/02-menu-boards/illustrated/*`). Don't change a price unless the owner gives you a new board.
4. **Photos are Black Bear's own public posts and are for the preview only.** Don't add stock photos or AI images of food, and never trace or redraw their logo or illustrations.
5. **Keep `robots: { index: false }`** in `app/layout.tsx` until the owner approves going live.
6. **No emoji in the UI.** Use the inline SVG icons in `components/Icons.tsx`.
7. **The automatic time-of-day theme is postponed.** Don't build it unless asked.

---

## 1. Stack (don't swap)

| Choice | Why | Don't |
|---|---|---|
| Next.js 16 App Router, one route `/` | Static and fast, one-click Vercel | Don't add Tailwind, a UI kit or CSS-in-JS |
| **One handwritten `app/globals.css`** | Full control, easy to theme | Don't split into modules. Add new blocks at the **end** under a comment header. |
| `@fontsource` fonts (no Google fetch) | Offline-safe, no layout shift | Don't use `next/font/google` |
| GSAP 3.15 (ScrollTrigger, DrawSVG) + Lenis | Premium motion | Don't add Framer Motion or AOS |
| `localStorage` only | Demo works without a server | Don't add a backend unless asked (phase 2 = Supabase) |
| Plain `<img>` via `components/Img.tsx` + `lib/images.json` | Pre-built WebP at 480/960/1600 | Don't use `next/image`; don't hotlink Facebook images |
| `typescript.ignoreBuildErrors: true` | Prototype speed | Still run `npx tsc --noEmit` before handing to QA |

Note: Next 16 has breaking changes. Read `node_modules/next/dist/docs/` before using a new API. `cacheComponents` was turned off on purpose.

---

## 2. Brand tokens (sampled from their banners, don't "improve")

```
--orange #CD6128  sky, hero, price stamps, events band
--forest #43553D  hills, buttons, cakes/fuel/footer sections
--tan    #C5A781  tent, menu section bg, secondary fills
--cream  #FEF6CF  page bg, text on dark, doodles
--ink    #12120F  wordmark, line art, borders
--indigo #3B3A9E  accent ONLY (ribbons, active map pin), use sparingly
--sage   #7A8576  secondary buttons, neutral status
```

- Use at most **two strong colors per screen**. Everything else is neutral.
- Section rhythm, top to bottom: orange hero, forest ticker, cream story, forest fuel, orange series, tan menu, forest cakes, paper campsites, orange events, ink gallery, cream notes, forest footer. **Keep the alternation.**

## 3. Typography (matches their print work)

| Role | Font | Rule |
|---|---|---|
| Wordmark / display | **Archivo Variable**, `font-stretch: 118–125%`, weight 800, UPPERCASE | Never set a display heading in another font |
| Body, labels, menu lists | **IBM Plex Mono** | Menu items are UPPERCASE mono with dotted leaders to the price |
| Retro titles | **Yellowtail** + stacked shadow (`.retro`) | Only for section titles like "Cake Story" and "Your Daily Dose of Good Fuel" |
| Doodle labels | **Caveat** | Only next to hand-drawn arrows and doodles |

- Small uppercase labels with letter-spacing 0.16–0.3em (`.eyebrow`, buttons, pills) are the house signal.
- Body text is never under 12.5px on mobile.

## 4. Signature design elements (keep them)

- **Camp scene hero:** their banner art, cut out with a transparent sky (`public/img/camp-scene-cutout-*.webp`). On top of it: an animated sun, steam over the cups and twinkle stars (SVG, coordinates in the 1448×819 image space). On phones the scene is 150% wide and cropped, which is intentional.
- **Diamond tile row** (`DiamondRow`): their menu-board border motif.
- **Starburst ₱ price stamps** (`Stamp`), rotated −12°.
- **Doodle kit** (`components/Doodles.tsx`): cream single-line strokes with `data-draw`. Originals in their post style. Add new doodles in the same style.
- **Trail map** (`Campsites.tsx`): a schematic map of the Maharlika Highway, styled after their Tuguegarao map post (cream ground, forest road, orange/sage blocks, orange mono speech-bubble pins). It's labelled "not to scale". **Don't replace it with Google Maps embeds.** A real MapLibre map is phase 2.
- **Bottom sheet:** on phones it slides up; at 760px and wider it's a right-side panel. The actions are Directions, Favorite, Call and Share, in that order.
- **Hard-shadow hover:** buttons and cards move `translate(-2px,-2px)` with an ink offset shadow. Two sibling buttons must never look the same on hover.

## 5. Motion rules

- **One easing family:** expo-out (`--ease`, GSAP `expo.out`). Animate transform and opacity only.
- Use the declarative hooks in `components/Motion.tsx`: `data-reveal`, `data-delay`, `data-stagger`, `data-draw`, `data-pop`, `data-parallax`. Use them rather than writing one-off ScrollTriggers.
- The preloader runs **once per session** (sessionStorage `bb-intro`) and fires `bb:ready`. The hero intro waits for it (`onReady`).
- **Reduced motion:** `html.rm` and an early return in every effect, so content must be fully visible with no JS animation. Test it.
- Lenis is the scroll engine. Lock scroll **only** with `lockScroll(true/false)` (it counts nested locks). Scrollable overlays need `data-lenis-prevent`.
- No scroll-jacking or pinned sections in the menu or sheets. Keep app-like screens calm.

## 6. Content and data model (`lib/data.ts`)

- **Drinks:** `prices[]` follows the `sizes` columns: Black Bear (hot), Grizzly 16oz, Polar 22oz. `null` means "not offered" and renders as "–".
- **Tags:** `fav` (flag) = Fan's Favorite, `sig` (bear) = Signature, `veg` (leaf) = Vegetarian. These come from their boards, so don't add tags of your own.
- **Branches:** 7 ids: `tuguegarao, ilagan, roxas, cauayan-d1, cauayan-sf, alicia, santiago`. `hours` is `"24/7"`, a list of slots (close can be past 24:00, e.g. `"26:00"`), or `null`. Only Santiago's hours are confirmed.
- **Cake Story** = sample day from Nov 17, 2026. Cakes without a photo show the drawn cake with "photo coming soon". **Don't** put a different cake's photo on them.
- **Open/closed** is always computed in `Asia/Manila` (`lib/hours.ts`), client-side after mount, to avoid hydration mismatch.

## 7. Images

- Sources are in `../Assets` (sorted and documented in `Assets/README.md`).
- Rebuild with `python3 scripts/build-images.py "../Assets"`. That regenerates `public/img` and `lib/images.json`.
- Most photos have their text baked in (they're finished social posts). Use **clean** photos for full-bleed areas and text posts only as cards. See the `type` column in `Assets/assets-inventory.csv`.
- New images must go through the pipeline. No raw multi-MB JPEGs in `public/`.

## 8. Don't change without asking the owner

- Section order, the hero wordmark composition (Est. 2020 pill, "ISABELA, PH", BLACK BEAR, KITCHEN+COFFEE, script tagline)
- Palette, fonts, menu prices/names, branch facts
- "Find your campsite" stays the primary CTA. The mobile bar keeps Menu / Camps / Call.
- The honest footer note ("Website concept preview…")

### Safe to work on next (priority order)
1. **Staff admin demo** (`/admin`, localStorage): today's cakes per branch, sold-out toggles, hours editor, promos. Follow the playbook: phase-derived UI, confirm destructive actions, mandatory reasons with placeholder text, undo, red-dot rule, seed data relative to today, custom selects/date pickers (no native ones).
2. "Post everywhere" mock in the admin (simulated success, labelled phase 2).
3. Cake pre-order / pickup request form, saved locally with a reference code.
4. Later: time-of-day theme, real MapLibre map, Supabase.

---

## 9. Handing work to QA (Claude)

Before you hand over, do all of this:
- [ ] `npx tsc --noEmit` is clean
- [ ] `npm run build` succeeds (paste the last 15 lines)
- [ ] `npm start` (production) runs with no console errors
- [ ] Screenshots at **390×844** and **1440×900** of every section you touched, plus any opened sheet or modal
- [ ] The same with reduced motion on, so content is visible
- [ ] There's no horizontal scroll (`document.documentElement.scrollWidth === innerWidth`)
- [ ] A list of every changed file and **why**
- [ ] Any new placeholder you introduced, listed explicitly

QA will check: the rules above, contrast, tap targets of at least 44px, sticky bars not covering content, every link and button doing something, empty and long-text states, that price and branch data are unchanged unless requested, and that motion matches section 5.

To keep handovers small, send only the changed files plus the screenshots, not the whole repo.
