# immloading — Projectcontext

## Wat is dit?
Leveringstermijn tool voor **Dental Labo Vanderbeken** — Immediate Loading planning.
Tandartspraktijken kunnen berekenen wanneer hun werk geleverd wordt op basis van aanlevermethode, dag en product.

## Stack
- **Framework:** Next.js 14 (App Router)
- **Taal:** TypeScript
- **Styling:** CSS Modules (`components/DeliveryCalculator.module.css`)
- **Deploy:** Vercel — [immloading.vercel.app](https://immloading.vercel.app)
- **Repo:** GitHub — publiek (vereist voor Vercel Hobby plan)

## Structuur
- `app/` — Next.js layout en pagina
- `components/DeliveryCalculator.tsx` — hoofdcomponent (alle UI + logica)
- `components/DeliveryCalculator.module.css` — alle styling
- `lib/deliveryData.ts` — leveringsdata (methodes, dagen, producten, tijdslots)
- `public/` — statische bestanden

## Logo's
- `public/logovdbwit.svg` — wit logo → topbar (navy achtergrond)
- `public/logovdbkleur.svg` — kleur logo → rechtsonder (grijze achtergrond)
- `public/logo.png` — oud PNG logo, niet meer in gebruik

## Deployment
- Push naar `main` → automatische Vercel productie deploy
- Andere branches krijgen automatisch een preview-URL van Vercel

## Kleurenpalet
- Navy: `#274172`
- Rood: `#B31E39`
- Lichtgrijs: `#ECEFEF`
