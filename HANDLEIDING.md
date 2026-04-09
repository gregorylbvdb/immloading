# Handleiding — Immediate Loading leveringstermijnen

Handleiding voor het onderhoud en deployen van de leveringstermijn tool van Dental Labo Vanderbeken.

---

## De twee omgevingen

| Omgeving | Gebruik | URL |
|----------|---------|-----|
| **Test** | Wijzigingen testen vóór ze live gaan | https://immloading-git-dev-gregorylbvdbs-projects.vercel.app/ *(vereist geen login na uitschakelen Deployment Protection in Vercel dashboard → Settings → Deployment Protection)* |
| **Live** | Zichtbaar voor tandartspraktijken | https://immloading.vercel.app |

Elke keer je een wijziging pusht naar de **dev** branch, wordt de testomgeving automatisch bijgewerkt.
Elke keer je naar de **main** branch pusht, gaat het live.

---

## Wat heb je nodig?

- [Visual Studio Code](https://code.visualstudio.com/) (teksteditor)
- Toegang tot de GitHub repository: https://github.com/gregorylbvdb/immloading
- De projectmap open in VS Code

---

## Welk bestand aanpassen?

Alle leveringsdata zit in één bestand:

**`lib/deliveryData.ts`**

Dit is het enige bestand dat je normaal hoeft aan te passen. Het bevat:

- **COLS** — de 20 mogelijke leveringsmomenten (dag + tijdstip)
- **DATA** — per aanlevermethode, per dag, per product: welke leveringen beschikbaar zijn

### De DATA matrix begrijpen

De matrix is opgebouwd als: `DATA[methode][dag][product]`

**Methodes:**
- `nachtophaling` — Afdruk via nachtophaling
- `voor11` — Fotogrammetrie verstuurd vóór 11u00
- `na11` — Fotogrammetrie verstuurd na 11u00

**Producten:**
- `titan` — Gefreesde brug PMMA / Titanium temp cilinders
- `tempbridge` — Gefreesde brug PMMA / Tempbridge titanium versterking
- `geprint` — Geprinte brug Nobel Biocare Fastmap (alleen bij fotogrammetrie)

**De 20 waarden per rij:**

Elke rij is een reeks van 20 `true`/`false` waarden, één per leveringsslot:

| Index | Dag | Tijdstip | Type |
|-------|-----|----------|------|
| 0 | Maandag | 17u00 | Spoedlevering |
| 1 | Maandag | nacht | Nachtlevering |
| 2 | Dinsdag | 12u00 | Spoedlevering |
| 3 | Dinsdag | 17u00 | Spoedlevering |
| 4 | Dinsdag | nacht | Nachtlevering |
| 5 | Woensdag | 12u00 | Spoedlevering |
| 6 | Woensdag | 17u00 | Spoedlevering |
| 7 | Woensdag | nacht | Nachtlevering |
| 8 | Donderdag | 12u00 | Spoedlevering |
| 9 | Donderdag | 17u00 | Spoedlevering |
| 10 | Donderdag | nacht | Nachtlevering |
| 11 | Vrijdag | 12u00 | Spoedlevering |
| 12 | Vrijdag | 17u00 | Spoedlevering |
| 13 | Vrijdag | nacht | Nachtlevering |
| 14 | Maandag (volg. week) | 12u00 | Spoedlevering |
| 15 | Maandag (volg. week) | 17u00 | Spoedlevering |
| 16 | Maandag (volg. week) | nacht | Nachtlevering |
| 17 | Dinsdag (volg. week) | 12u00 | Spoedlevering |
| 18 | Dinsdag (volg. week) | 17u00 | Spoedlevering |
| 19 | Dinsdag (volg. week) | nacht | Nachtlevering |

**Voorbeeld:** Als je wil dat bij nachtophaling op maandag voor titan ook een levering op dinsdag 12u00 beschikbaar is, zet je index 2 op `true`:
```
titan: [false,false,true,true,true,...]
```

> `null` betekent dat het product niet beschikbaar is voor die methode (bv. `geprint` bij nachtophaling).

---

## Stap-voor-stap: wijziging doorvoeren

### Stap 1 — Zorg dat je op de **dev** branch zit

Kijk linksonder in VS Code. Staat er `main`? Klik erop en kies `dev`.

### Stap 2 — Pas het bestand aan

Open `lib/deliveryData.ts` en pas de gewenste `true`/`false` waarden aan.

### Stap 3 — Opslaan en committen

1. Sla het bestand op (`Ctrl+S`)
2. Ga naar **Source Control** (`Ctrl+Shift+G`)
3. Je ziet `deliveryData.ts` onder "Changes"
4. Klik op het **+** icoontje naast het bestand (stage)
5. Typ een kort bericht in het tekstveld, bv. `update: leveringsdata aangepast`
6. Klik op **Commit**
7. Klik op **Sync Changes** (of **Push**)

### Stap 4 — Testen

Wacht 1-2 minuten en open de testomgeving:
**https://immloading-git-dev-gregorylbvdbs-projects.vercel.app/**

Controleer of de wijziging correct is.

### Stap 5 — Live zetten

Als alles klopt:

1. Klik linksonder op `dev` → kies `main`
2. Open **Source Control** → klik op de drie puntjes `···` → **Branch** → **Merge Branch** → kies `dev`
3. Klik op **Sync Changes** (Push)

Na 1-2 minuten is de wijziging live op **https://immloading.vercel.app**

---

## Iets fout gegaan?

- Controleer de [Vercel dashboard](https://vercel.com/dashboard) voor foutmeldingen onder "Deployments"
- Zorg dat je altijd eerst op `dev` werkt en test, nooit rechtstreeks op `main`
- Bij twijfel: neem contact op met Gregory

---

## Bestanden — overzicht

| Bestand | Wat | Aanpassen? |
|---------|-----|------------|
| `lib/deliveryData.ts` | Leveringsdata | **Ja, dit is het enige bestand** |
| `components/DeliveryCalculator.tsx` | Interface & logica | Nee (tenzij UI-wijziging) |
| `components/DeliveryCalculator.module.css` | Stijl & kleuren | Nee |
| `public/logovdbwit.svg` | Wit logo (topbar) | Nee |
| `public/logovdbkleur.svg` | Kleur logo (rechtsonder) | Nee |
