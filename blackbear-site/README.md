# Black Bear Kitchen + Coffee — connected frontend concept

A client-pitch prototype built with Next.js App Router, React, local Fontsource fonts, GSAP, responsive WebP images, and one handwritten stylesheet.

## Start

```sh
npm install
npm run dev
```

The default preview is http://localhost:3000. The mobile bar always offers Home, Menu, Camps, and Call. For a production check:

```sh
npx tsc --noEmit
npm run build
npm start
```

## One shortcut hub, focused pages

| Route | Purpose |
| --- | --- |
| `/` | Compact shortcut hub with eight destinations and a saved campsite |
| `/menu` | One menu category at a time, kitchen favorites, search, quick views, sizes, and saved picks |
| `/cakes` | Cake Story by campsite |
| `/campsites` | Searchable campsite list, optional trail map, details and calls |
| `/story` | The brand and its people |
| `/events` | Conference-room and private-gathering information |
| `/gallery` | A paginated gallery and links to the social feed |
| `/club` | Separate Passport, Crew, and Moments tabs for the proposed customer club |
| `/admin` | Owner overview and staff workspace: branch cakes and notes, menu availability, shared media, photo moderation, crew profiles |
| `/pitch` | Audience walkthrough, working feature demos, connected workflow, animated logo showcase, production roadmap, printable pitch |

## Demo walkthrough

1. On the customer site, browse menu categories, open a dish, choose a listed size, and save a pick.
2. In Workspace → Camps, choose a campsite, change its cake lineup, write a note, and publish locally.
3. Return to the public Cake Story or campsite detail to see that update.
4. In Workspace → Menu, flag an item unavailable. Choose that campsite in the customer menu to see its demo availability label.
5. In the Club, simulate visits and try the proposed reward redemption after six stamps.
6. Submit a JPG, PNG, or WebP photo in the Club. In Workspace → Media → Review queue, approve it. It appears on the Club wall and can be reused in a branch update.
7. Edit an illustrative crew profile or its duty status; see the result in the Club for that campsite.
8. Open Pitch to explain these workflows and the next phase.

## Local data and boundaries

`lib/demo-store.ts` connects the frontend views through localStorage. Updates persist in this browser and synchronize between same-origin tabs. Different hosts or ports have separate data. This is not a shared server, secure admin, ordering system, real loyalty program, or active photo contest.

- Workspace state: `bb-workspace-v1`
- Favorite campsite: `bb-fav-camp`
- Motion preference: `bb-reduced-motion`
- Intro session flag: `bb-intro`

Photos are resized in the browser, stored locally, and never uploaded. The demo allows up to 12 photo submissions, 8 MB per selected source file, and 20 illustrative crew profiles. Browser storage quotas still apply; failed saves show a message. No private records or credentials should be entered.

## Sources and presentation

`lib/data.ts` remains unchanged: menu names, source prices, tags, cup sizes, branch facts, and the dated Cake Story stay tied to the supplied assets. Only confirmed hours are described as open/closed. The QR menu reference is https://blackbearcoffee.my.canva.site/big-stores.

`lib/menu-details.ts` adds brief editorial browsing guides and exact photo mappings where supplied. Missing item photos are stated honestly; no replacement food photos are invented. Descriptions are not ingredient/allergen specifications.

The logo animation uses the existing badge artwork with an entrance, outer-ring draw, sparkle, and hover nod. No logo was redrawn. Motion can be reduced from the footer or app view strip and respects the operating-system setting. Scrolling uses native browser behavior; GSAP handles reveal, doodle, and parallax effects.

Robots remain `noindex, nofollow`. Photos and artwork are concept-preview material pending the owner's usage approval. The rewards policy, photo spotlight, and crew profiles are illustrative. See the Pitch roadmap before a real launch.

## Maintenance

- Content: `lib/data.ts`
- Photo/description map and item identity: `lib/menu-details.ts`
- Local workflow state: `lib/demo-store.ts`
- Accessibility focus trap: `lib/useDialog.ts`
- Motion setting: `lib/motion-preference.ts`
- Styles: `app/globals.css` (new refinement sections are appended)
- Production type checking is enabled.
- On Windows, `scripts/build.mjs` loads a build-only compatibility helper that serializes generated `.next` directory creation and briefly retries transient filesystem errors. Dependencies and production runtime behavior are unchanged. Recheck this helper when upgrading Next.js.

No Git commit, push, deployment, or external message was performed.




