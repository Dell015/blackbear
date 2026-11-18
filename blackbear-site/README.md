# Black Bear Kitchen + Coffee

A local, frontend-only concept for Black Bear. Built with Next.js 16, React, TypeScript, GSAP, MapLibre, local fonts, and responsive WebP images.

## Start

Run npm install, then npm run dev. Use npm run dev -- --port 3001 when another project occupies port 3000. The current Black Bear preview uses http://localhost:3001.

Run npm run build for the production build and TypeScript validation. npm start serves that build.

## Customer experience

| Route | Purpose |
| --- | --- |
| / | Illustrated camp welcome, short menu preview, campsite selection, Club and gatherings previews |
| /menu | Coffee first; a plain category index on desktop and a category drawer on phones; search across drinks, food and cakes; photo quick views, listed sizes, and saved picks |
| /campsites | Real themed street map, automatic map movement when selecting a branch, nearest-area lookup, directions, calls, and branch-specific example specials/events |
| /cakes | Redirects to the cakes category inside the menu |
| /club | Demo loyalty passport, crew preferences, and community moments |
| /story | Black Bear's story and people |
| /events | Private-gathering information and conference-room contact |
| /gallery | Paginated brand gallery and social links |
| /admin | Owner overview, branch updates, specials/events examples, cake cases, item availability, shared media and crew profiles |
| /pitch | Audience walkthrough, live frontend feature links, connected workflow, motion showcase and production roadmap |

## Demo walkthrough

1. Open the menu. Coffee appears first. Open an item, inspect the supplied sizes/prices, and save a pick. Search also finds food and cakes.
2. Choose a campsite with the searchable branch picker. The selection carries between customer pages on this device.
3. On Campsites, change branches to move the real map and see a different example special/event. The optional location button selects the closest area center; no location request happens automatically.
4. In Workspace -> Campsite desk, update the note, cake selection, special and event examples. Publish locally. The public campsite page and menu reflect those changes in the same browser.
5. In Workspace -> Menu, flag food, drinks or cakes unavailable. The customer menu identifies the local demo flag for that camp.
6. In the Club, simulate visits, try the proposed reward, and submit a local photo. Approve it in Workspace -> Media, then reuse it in a branch update.
7. Edit the illustrative crew profiles and duty flags; the Club reflects them.
8. Use Pitch to show the value for guests, regulars, employees and the owner.

## Map accuracy and services

The street map is real and can be panned and zoomed. It uses MapLibre GL JS and OpenFreeMap / OpenMapTiles / OpenStreetMap, with the original provider attribution retained. The local style at public/maps/blackbear.json uses Black Bear's cream, sage, tan and forest colors.

The seven pins are explicitly labeled AREA PREVIEWS. They use sourced town or district centers, not verified shop coordinates. Directions opens the supplied branch business query in Google Maps. Nearest-area distances are straight-line estimates to those centers, not route distances or a guarantee of the nearest storefront. Verify every shop pin with the owner before launch. Sources are recorded beside coordinates in lib/camp-experiences.ts.

The map needs an internet connection and WebGL. If loading fails, a retry and external Maps link remain available. The map library loads only on the campsite route. No API key or backend is required for this prototype.

## Data and content boundaries

lib/data.ts remains the supplied source of menu names, prices, tags, sizes, cake samples and branch facts. No cake prices were invented. Only confirmed hours are described as open/closed. The original QR reference is https://blackbearcoffee.my.canva.site/big-stores.

Branch specials and events are illustrative examples, labeled on the customer page. Their photos come from the supplied brand library and do not prove an actual event or offer at that branch. lib/camp-experiences.ts owns these examples. The workspace can edit the example text locally.

Brief menu descriptions are browsing guides, not ingredient or allergen specifications. Exact supplied item photos are used where available; absent photos are stated honestly.

Workspace, Club, availability, photos and preferences use browser localStorage. They persist on this origin and can synchronize across tabs, but do not sync to another device or the business. No real order, booking, voucher, upload, staff authentication or active contest is created. The owner and staff views demonstrate the intended product.

Storage keys: bb-workspace-v1, bb-fav-camp, bb-reduced-motion and the session flag bb-intro. Photo limits remain 12 submissions, 8 MB per selected source file, and 20 illustrative crew profiles. Photos are resized and stored locally.

## Artwork, motion and responsive layouts

The original badge is preserved and animated. The new camp landscape and three-pose bear layer are generated adaptations of the supplied engraved illustration, saved as project assets. The short sequence shows Bernie following a firefly and sitting to watch it; it plays once and has an optional replay button.

Brief cream outlines draw over selected food/coffee imagery and disappear. Page navigation uses progressive cross-document View Transitions where supported. Menu category changes, product sheets, the branch picker, map camera, buttons and selected scroll moments use restrained motion. System reduced motion and the site's Motion control are respected. Scrolling remains native.

Phone layouts use a compact header, a slim safe-area-aware bottom tab bar, stacked previews, category sheets and a map above branch details. Tablet portrait uses wider stacked map/details and a narrow contents index. Tablet landscape and desktop use split compositions and persistent side navigation. These rules are in app/refinement.css, loaded after the legacy base styles.

## Verification and maintenance

Production build and TypeScript passed. All nine active routes returned HTTP 200, the legacy cakes route returned the intended 307 redirect, and referenced route scripts/styles/images returned HTTP 200. The map style passed the MapLibre style validator; a live vector tile request returned HTTP 200. Browser automation was unavailable for this revision, so actual device rendering, touch gestures, geolocation prompts, focus behavior and visual animation timing still need a browser pass. Do not present these as device-tested.

Main files: components/HomeEditorial.tsx, CampScene.tsx, MenuCatalog.tsx, CampExplorer.tsx, CampMap.tsx and CampPicker.tsx; lib/camp-selection.ts and camp-experiences.ts; app/refinement.css. Existing local workflow state is in lib/demo-store.ts. Focus containment is in lib/useDialog.ts.

The Windows build wrapper remains in scripts/build.mjs and windows-build-compat.cjs. It addresses transient recursive directory creation errors only during a build. Production runtime and installed dependencies are not patched.

Robots remain noindex, nofollow. No Git commit, push or deployment was performed.

## Technique references

- OpenFreeMap setup and style customization: https://openfreemap.org/quick_start/
- MapLibre animated camera and reduced-motion behavior: https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/
- GSAP drawn strokes: https://www.gsap.com/docs/v3/Plugins/DrawSVGPlugin/
- Native cross-document transitions: https://webkit.org/blog/16967/two-lines-of-cross-document-view-transitions-code-you-can-use-on-every-website-today/
- Progressive View Transitions: https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using
