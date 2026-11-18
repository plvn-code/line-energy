# Line Energy — redesign of lineenergysolar.com

Client site for **Line Energy / «ЛАЙН-ЕНЕРДЖИ»** — turnkey solar power stations for homes and business, Odesa and Odesa oblast (Instagram @lineenergy.solar). Dark navy (#09314a from their site) + the logo's sun yellow (#efea00). Style references: `~/Desktop/aluabri` (this project started as a copy of its skeleton) and `~/Desktop/superio`.

**Talk to the user in Russian.** Site copy is **Ukrainian only** (`lang="uk"`, ’ apostrophes, «» quotes). Read `docs/STATUS.md` first (open client questions, launch checklist).

## Commands
```bash
npm run dev                                   # port 3022
npm run build && npm start                    # production on :3022
kill $(lsof -ti tcp:3022 -sTCP:LISTEN)        # restart (the LISTEN filter keeps Chrome alive)
npm run lint && npx tsc --noEmit              # must stay clean
open -a "Google Chrome" http://localhost:3022
```
`node_modules` is a symlink to `../aluabri/node_modules` (same package.json deps). Run a real `npm install` before deploying elsewhere.

## Stack
Next.js 15 App Router · React 19 · TypeScript strict · plain CSS (`src/app/globals.css`, tokens in `:root`) · next/font (Geologica display, Manrope body, JetBrains Mono labels, Montserrat 600 for the wordmark) · no animation libraries (IntersectionObserver + rAF: `src/lib/motion.ts`, `src/components/Effects.tsx`). All motion respects `prefers-reduced-motion`.

## Layout
```
src/app/            / · /obiekty[/slug] · /posluhy · /kalkuliator · /kredyt · /pro-nas · /faq · /kontakty · api/lead · sitemap · robots
src/components/     Header, Footer, Intro (CSS curtain: the "E" lights up), Logo (text wordmark), LeadForm, LeadModal (LeadButton opens it, can carry `details`),
                    Calculator (3 scenarios), ObjectsFilter, Gallery (lightbox), Shared (PageHero, ObjectCard, Marquee, ContactBand, MoreObjects), Effects, CursorLabel, MobileBar
src/components/home Hero (video), Manifest (word scrub + facts), EnergyDay (signature sticky SVG: day → noon → evening → blackout, clickable),
                    StationTypes (tabs), ObjectsStack (stacking cards), Blackout (appliance planner), Sections (Process, Why, VsGenerator, Guarantees, CreditBand, Faq)
src/lib/            site.ts (contacts, nav, facts, brands) · objects.ts (9 real objects) · copy.ts (services, types, steps, why, guarantees, credit, FAQ) · calc.ts (price model) · media.json (image sizes, generated)
```
Every fact on the site comes from lineenergysolar.com or the client's Instagram captions / reel narration. Don't invent numbers; add open points to `docs/STATUS.md`.

## Media (`scripts/build_media.py`, raw material in `research/raw`, gitignored)
`~/Desktop/aluabri/research/.venv/bin/python -I scripts/build_media.py . [stills|video|sizes|all]`
- Project photos = frames from the client's reels, cropped above the burned-in subtitles → `public/images/objects/<slug>/NN.webp` (01 = cover).
- Hero video = Pexels 7038597 (licensed, free), graded navy with a golden glare; montage band = Pexels 8853517.
- `sizes` regenerates `src/lib/media.json`. Raw downloads were deleted after the build (low disk); re-fetch from Instagram via Playwright if needed (see STATUS).

## Leads
`/api/lead` → Telegram bot when `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` are set; otherwise 503 and the form shows both phones + Instagram Direct. Nothing is stored. Search indexing stays off until `NEXT_PUBLIC_SITE_LIVE=1`.
