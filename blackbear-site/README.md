# Black Bear Kitchen + Coffee: website prototype

A one-page concept site for Black Bear (7 campsites, Isabela + Cagayan).
Next.js App Router, one handwritten `app/globals.css`, GSAP (ScrollTrigger + DrawSVG) and Lenis.
There's no server or database: favorites are saved in the visitor's browser.

## Run it

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start   # production check (use this for QA)
```

## Where things live

| What | File |
|---|---|
| Menu, prices, branches, cakes, series, gallery | `lib/data.ts` |
| Open/closed logic (Philippine time) | `lib/hours.ts` |
| Styles and design tokens | `app/globals.css` |
| Global scroll + reveal/draw animations | `components/Motion.tsx` |
| Sections | `components/*.tsx` (Hero, Story, Fuel, Series, Menu, Cakes, Campsites, Events, Gallery, Footer) |
| Image pipeline | `scripts/build-images.py`, which writes `public/img/*.webp` and `lib/images.json` |

To re-process images after Black Bear sends originals, run `python3 scripts/build-images.py "E:/Coding-Projects/blackbear/Assets"`.

### Motion hooks (add to any element)
- `data-reveal` (with optional `data-delay="0.1"`): fades and rises in
- `data-stagger`: its children reveal one after another
- `data-draw` (on SVG strokes): pen-draws when its SVG scrolls in
- `data-pop`: the price stamp pops with a twist
- `data-parallax="0.15"`: drifts on scroll

All of these are disabled under `prefers-reduced-motion`.

## Deploy (Vercel)
1. Push to GitHub yourself (the assistant does not do git).
2. In Vercel, use Add New Project and import the repo. The framework is auto-detected.
3. Set `NEXT_PUBLIC_SITE_URL` to the live URL.
4. The site is already `noindex` (`app/layout.tsx` → `robots`). Remove that only after Black Bear approves.

## Placeholders / to confirm with Black Bear
- **Hours:** only Santiago (24/7) is confirmed. Cauayan D1 (Waze) and Cauayan SF (Foodpanda) come from third-party listings. Tuguegarao, Ilagan, Roxas and Alicia are unknown.
- **Addresses:** Roxas and Alicia are unknown. Cauayan SF is from Foodpanda. A branch card says "SM Cauayan Branch, 46 Burgos St." Check whether that's San Fermin or a different branch.
- **Phones:** Roxas and Tuguegarao are unknown.
- **Map:** the trail map is schematic (not to scale). Directions use Google Maps search queries until real pins are supplied.
- **Cakes:** the Cake Story is sample data from Nov 17, 2026. Prices are unknown. Blueberry Cheesecake, Sans Rival, Belgian Cookie Cheesecake and Carrot Walnut have no photos yet.
- **Story copy:** written from their branding. Confirm the tone and facts with the owner.
- **Events copy:** based on their conference room poster. Confirm the rental details.
- **Photos:** taken from their public Facebook/Instagram posts, for the preview only. Replace them with originals.
- **Logo:** the preloader and favicon use the badge from Facebook. Ask for vector files.

## Next phases (not built)
- Admin: staff update today's cakes, sold-out items, hours and promos, with optional posting to Facebook/Instagram.
- Pickup / cake pre-order requests.
- Time-of-day theme (morning / day / golden hour / night).
