# Status — started 2026-11-18

Local preview: http://localhost:3022. GitHub: github.com/plvn-code/line-energy (main). No Vercel yet.

## Done
Full redesign in Ukrainian: home (video hero, manifest, «Один день вашого дому» scroll scene, station types, objects stack, calculator, blackout planner, process, why, generator vs station, guarantees, credit, FAQ, request band), 9 object pages, objects list with filters, services, calculator, credit, about, FAQ (12 questions + FAQPage schema), contacts, 404, sitemap, robots. Checked at 1440 and 390 px; no horizontal scroll; lint + tsc clean.

## Sources used
- lineenergysolar.com (UA): services, advantages, guarantees (12 / 3 / 25 years), FAQ, phones, email.
- Instagram @lineenergy.solar (31 posts, 2026-11-18): objects with equipment and prices, Oschadbank credit, «3 сценарії: економ / оптимум / комфорт», generator vs station, blackout critical lines, ECOENERGY EXPO 2026.

## Questions for the client
1. **Where should leads go?** Telegram bot (token + chat id) or another channel. Until then the form shows phones/Direct.
2. **Calculator prices** (`src/lib/calc.ts`): $550 per kW + $220 per kWh battery + $600 base, ±12%, fitted to their own cases ($4 500 / 5 кВт, $9 500 / 12 кВт, $15 000 / 15 кВт). Confirm or give their own numbers. Also confirm the Odesa yield (1300 kWh per kW per year) and 620 W panels.
3. **Object details** taken from reel narration, please confirm: Prylymanske — 30 × Tongwei 620 W; budget 5 kW — location (shown as «Одеська область»); 30 kW grid station (Huawei) — location and owner type; Deye 15 kW + 2×Dyness 16 kWh and 16 kW / 32 kWh — locations.
4. **Region:** site says «Одеса та Одеська область», one caption says «Працюємо по всій Україні». Which is right?
5. **Credit page «Як це працює»** (4 steps) is our reasonable description of the Oschadbank process — confirm it matches how they actually do it.
6. **Logo:** wordmark rebuilt in Montserrat from their PNG (260 px). Send the vector logo if they have it.
7. **Photos/video:** project photos are frames from 720p reels. Original photos or drone footage of their objects would raise quality; hero is licensed stock (Pexels), not their object.
8. **Reviews:** none found on the site or Instagram. Add a block when they send reviews with permission.
9. **Team:** reels show the people (consultant and sales), but names on photos are not confirmed — not labeled. Team photos + names would make «Про нас» stronger.
10. **Russian version:** old site has /ru. The redesign is UA only.
11. Old site footer links to generic facebook.com / youtube.com — do they have real Facebook / YouTube pages?

## Launch checklist
- `npm install` (node_modules is a symlink to aluabri), GitHub repo, Vercel project.
- Env: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `NEXT_PUBLIC_SITE_URL`, then `NEXT_PUBLIC_SITE_LIVE=1`.
- Send one test lead from production.
