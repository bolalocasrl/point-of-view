# Point of View — PROJECT.md

## URL

| Ambiente | Link |
|---|---|
| **Vercel (prod)** | https://point-of-view-nine.vercel.app/ |
| **GitHub** | https://github.com/bolalocasrl/point-of-view |

---

## Stack Tecnologico

### Frontend
| Tecnologia | Versione | Uso |
|---|---|---|
| React | 19.2.0 | UI framework |
| TypeScript | 5.6.3 | Type safety |
| Vite | 7.1.9 | Build tool / dev server |
| Tailwind CSS | 4.1.14 | Styling |
| Framer Motion | 12.23.24 | Animazioni avanzate |
| React Three Fiber | 9.5.0 | 3D nel browser |
| Three.js | 0.183.2 | Engine 3D |
| shadcn/ui + Radix UI | — | Componenti UI (60+) |
| Wouter | 3.3.5 | Client-side routing |
| TanStack React Query | 5.60.5 | Server state management |
| React Hook Form + Zod | 7.66.0 | Form e validazione |
| next-themes | 0.4.6 | Gestione tema |
| Sonner | 2.0.7 | Toast notifications |

### Backend
| Tecnologia | Versione | Uso |
|---|---|---|
| Express | 5.0.1 | Server HTTP |
| Node.js | 20 | Runtime |
| PostgreSQL | 16 | Database (non ancora attivo) |
| Drizzle ORM | 0.39.3 | ORM + migrazioni |
| Passport.js | 0.7.0 | Autenticazione (non ancora attiva) |
| express-session | — | Session management |
| ws | 8.18.0 | WebSocket |

### Font
- **Display / Titoli**: Unbounded
- **Body**: Space Grotesk

### Hosting & Deploy
- **Vercel** (configurato via `vercel.json`)
- **Replit** (configurato via `.replit`)

---

## Struttura del Progetto

```
point-of-view/
├── client/                  # Frontend React/Vite
│   ├── src/
│   │   ├── App.tsx          # Router principale (Wouter)
│   │   ├── main.tsx         # Entry point
│   │   ├── index.css        # Tailwind + custom styles + keyframes
│   │   ├── pages/           # Pagine
│   │   ├── components/      # Componenti
│   │   │   ├── layout/      # Navbar, Footer
│   │   │   ├── sections/    # Sezioni della homepage
│   │   │   └── ui/          # shadcn/ui (60+ componenti)
│   │   ├── hooks/           # Custom hooks
│   │   └── lib/             # Utilities (cn, queryClient)
│   └── index.html
├── server/                  # Backend Express
│   ├── index.ts             # Server principale (porta 5000)
│   ├── routes.ts            # API routes (vuote, pronte)
│   ├── static.ts            # Serve static files
│   ├── storage.ts           # MemStorage (placeholder per DB)
│   └── vite.ts              # Vite dev server integration
├── shared/
│   └── schema.ts            # Drizzle schema (tabella users)
├── script/
│   └── build.ts             # Build script (esbuild + vite)
├── info_progetto/           # Documentazione progetto
├── vercel.json
├── drizzle.config.ts
├── vite.config.ts
└── package.json
```

---

## Pagine Esistenti

| Route | File | Descrizione |
|---|---|---|
| `/` | `client/src/pages/Home.tsx` | Pagina principale (landing one-page) |
| `/shop` | `client/src/pages/Shop.tsx` | Vetrina prodotti, dati dalla Storefront API Fourthwall |
| `/story` | `client/src/pages/Story.tsx` | Linea del tempo POV 2016-2026 con foto dal Drive (pubblica, nel menù "Story" e nella sezione Vision) |
| `/privacy` | `client/src/pages/Privacy.tsx` | Privacy policy |
| `/terms` | `client/src/pages/Terms.tsx` | Termini d'uso |
| `*` | `client/src/pages/not-found.tsx` | Pagina 404 custom |

---

## Componenti Chiave

### Layout
| Componente | File | Descrizione |
|---|---|---|
| **Navbar** | `components/layout/Navbar.tsx` | Fixed top, logo + menu (Events, Vision, **Shop**, Contacts), scroll-hide animato, mix-blend-difference |
| **Footer** | `components/layout/Footer.tsx` | Video background (`loopsitofinale.mp4`), Instagram + email, link Privacy/Terms |
| **LegalPage** | `components/layout/LegalPage.tsx` | Impaginazione condivisa di `/privacy` e `/terms` |
| **SectionTitle** | `components/SectionTitle.tsx` | Titolo grande su due righe: prima piena, seconda in solo contorno |
| **NewsletterPopup** | `components/NewsletterPopup.tsx` | Popup iscrizione dopo lo scroll, manda a `/api/subscribe` |

### Sezioni Homepage (ordine visivo)
| Componente | File | Descrizione |
|---|---|---|
| **Hero** | `components/sections/Hero.tsx` | 3D model interattivo, parallax mouse/gyroscope, scroll indicator |
| **About** | `components/sections/About.tsx` | Vision statement, storia (fondato 2016), città europee |
| **Upcoming** | `components/sections/Upcoming.tsx` | Prossimo evento — ESC, Barcelona 2 ottobre 2026 (Albura Rooftop), flyer, line-up, dropdown tickets (RA + Shotgun) |
| **Events** | `components/sections/Events.tsx` | Agenda europea: 3 eventi (Bologna, Lisbon, Barcelona) con video cards |
| **Archive** | `components/sections/Archive.tsx` | Carousel 3D con 7 poster di eventi passati |
| **SocialHub** | `components/sections/SocialHub.tsx` | Partnership The Social Hub (Bologna, Barcelona) |
| **Merch** | `components/sections/Merch.tsx` | Carousel vortex 3D, i pulsanti portano a `/shop` |
| **Logopovattina** | `components/sections/Logopovattina.tsx` | Modello 3D `.glb` auto-rotante (Three.js), materiale metallo bianco |

---

## Stato Attuale

### Funzionalità attive
- Landing page completa e responsiva (mobile-first)
- Hero 3D interattivo con parallax mouse e giroscopio mobile
- Prossimo evento: ESC — End. Shift. Connect., 2 ottobre 2026, Albura Rooftop Barcelona
- Agenda europea con video cards, archive eventi passati (carousel 3D)
- **Pagina `/shop`**: carte collezionabili con foto del retro, statistiche, storia e ricompense
- **Pagine `/privacy` e `/terms`**
- **Popup newsletter** collegato a Brevo
- Titoli di sezione nello stile "prima riga piena / seconda in contorno" (`SectionTitle`)

### Funzionalità pronte ma non attive
- **Database PostgreSQL**: schema Drizzle pronto (`shared/schema.ts`), `storage.ts` usa ancora MemStorage
- **Autenticazione**: Passport.js installato ma non wired
- **API routes**: `server/routes.ts` preparato ma vuoto

### Contatti & Social
| Canale | Dettaglio |
|---|---|
| Email | POINTOFVIEW.MILAN@GMAIL.COM |
| Instagram | @pointofview.events |
| Store (nuovo) | point-of-view-tge-shop.fourthwall.com |
| Store (vecchio, altro account) | e-commercewth-shop.fourthwall.com |

---

## Asset Principali
| Asset | Path | Uso |
|---|---|---|
| Logo | `/assets/logo-v2.png` | Navbar, email |
| Flyer ESC | `/assets/flyeresc.webp` (sito), `/assets/flyeresc.jpg` (email) | Evento 2 ottobre |
| Logo ESC | `/assets/esc-key.png` | Email campagna ESC |
| Video Footer | `/assets/loopsitofinale.mp4` | Footer background |
| Modello 3D | `/3DFinito.glb` | Logopovattina (Three.js) |

---

## Script di Build

```bash
npm run dev       # Dev server (Express + Vite HMR)
npm run build     # Build production (esbuild server + vite client)
npm run start     # Avvia server production
npm run db:push   # Applica schema Drizzle al DB
```

---

## Note per lo Sviluppo

- Il progetto è un monorepo full-stack con client e server nella stessa repo
- Il routing lato client usa **Wouter** (non React Router)
- Gli stili custom più importanti sono in `client/src/index.css` (grain overlay, text-stroke, 3D utilities, vortex keyframe)
- La build output va in `dist/public` (Vite) e `dist/server.js` (esbuild)
- Le API sono servite su porta `5000` in dev


---

## Shop Fourthwall (nuovo account)

- **URL**: https://point-of-view-tge-shop.fourthwall.com — stato *Coming soon* finché non lo apriamo.
- **7 magliette** Bella+Canvas 3001 nere (XS–5XL): logo a rombo sul petto sinistro davanti, grafica grande dietro.
  HEADQUARTER LISBOA 35 $; le altre sei 30 $. Fourthwall lavora in dollari e converte in euro, quindi i prezzi
  mostrati hanno i centesimi (€26,65 / €31,09).
- **Grafiche di stampa**: `info_progetto/e_commerce/Magliette/Grafichemagliette/pulite/` (ripulite dai segni di
  scarto). I fogli di stampa 15"x18" a 150 dpi vengono generati da quelle.
- **Striscia in alto** con conto alla rovescia all'evento del 2 ottobre; **sezione newsletter** in home
  (iscritti in Settings → Email marketing).

### Collegamento sito ↔ shop

La pagina `/shop` legge i prodotti da `/api/products`, che interroga la Storefront API:

```
GET https://storefront-api.fourthwall.com/v1/collections/all/products?storefront_token=<TOKEN>&currency=EUR
```

Il token sta nella variabile **`FOURTHWALL_TOKEN`** su Vercel (protetta, letta solo da `api/products.js`).
Se manca o l'API non risponde, la pagina usa la lista di riserva in `client/src/lib/shop.ts`.

### Newsletter sul sito

`client/src/components/NewsletterPopup.tsx` si apre dopo lo scroll. Con la variabile **`VITE_BREVO_FORM_URL`**
manda le iscrizioni a Brevo; senza, apre una mail precompilata verso POV (soluzione provvisoria).

> Newsletter: le iscrizioni dal sito finiscono nella lista Brevo **POV WEBSITE (#3)** tramite `api/subscribe.js`.
> Variabili su Vercel: `BREVO_API_KEY` (protetta) e `BREVO_LIST_ID`.


---

## Campagna ESC (evento 2 ottobre 2026)

Liste Brevo: **POV ALBURA (#2)** 276 contatti storici · **POV WEBSITE (#3)** iscritti dal sito.
Mittente verificato: `Point Of View <pointofview.milan@gmail.com>`. Piano gratuito: ~300 email al giorno.

| # | Data prevista | Contenuto | Stato |
|---|---|---|---|
| 1 | lun 21 set | Annuncio: cos'è ESC, il rooftop, biglietti | bozza pronta in Brevo |
| 2 | ven 25 set | I quattro collettivi + chi è POV + merch | da scrivere |
| 3 | mar 29 set | Line-up e atmosfera | da scrivere |
| 4 | gio 1 ott | Ultima chiamata | da scrivere |

Linee guida ESC (dai PDF del grafico): idea unica `WORK MODE → PRESS ESC → LIFE MODE`;
palette blu notte / crema / corallo / arancio tramonto, **mai nero**; tono breve e invitante;
**un solo pulsante biglietti** per email; niente estetica cyberpunk o techno industriale.

Line-up 2 ottobre: DAGZZ, E.DUE.S, MARCO G, Mario Chicoli, Massif, Mastro Sally, MATE, SALVIA.
Biglietti: [RA](https://it.ra.co/events/2538024) · [Shotgun](https://shotgun.live/en/events/esc-united-label-end-shift-conect).
Mappa locale: https://maps.app.goo.gl/notzBghJ7kNGoCrAA

---

## Shop: come si lavora

- Admin Fourthwall: `admin.fourthwall.com/store/point-of-view-tge` (login manuale nel browser).
- Ogni maglietta: **logo a rombo sul petto sinistro davanti** (≈10 cm) e **grafica grande dietro**.
- Le stampe si caricano come **fogli 15"x18" a 150 dpi** con la grafica già posizionata: è l'unico
  modo affidabile per ottenere sempre la stessa posizione ed evitare l'avviso di bassa risoluzione.
- Grafiche pulite: `info_progetto/e_commerce/Magliette/Grafichemagliette/pulite/`.
- Storie e statistiche delle carte: `client/src/lib/cards.ts` (testi da rivedere con POV).
- Prezzi: Fourthwall ragiona in dollari e converte, quindi in euro restano i centesimi.
  **Il prezzo arriva dalle varianti**, non dal prodotto: vedi `fetchProducts` in `client/src/lib/shop.ts`.


---

## Pagina /story (galleria)

- Testi e capitoli: `client/src/content/story.ts`. `STORY_DRAFT = false`: pagina pubblica. Rimettendolo a `true` torna in bozza (noindex + etichetta).
- Foto: `client/public/storia/<capitolo>/` in 800/1600/2400 px webp, create con `scripts/foto.mjs`
  (`npm i --no-save sharp`, poi `node scripts/foto.mjs ~/Desktop/PROGETTI/point-of-view-foto/storia storia`).
- Originali: `PROGETTI/point-of-view-foto/` (fuori da git). `originali/` = scaricati dal Drive, `storia/` = ordinati per capitolo.
- Drive POV condiviso con link: cartella `Brand POINT OF VIEW` (Flyer, FOTOS POV/with people, grafiche/loghi/photo vraba, VideoPromo/AfterMovie).
- Date delle serate ricavate dalla data di scatto delle foto confrontata con le date dei flyer;
  prime serate per città dalla presentazione ufficiale (Milano 22/12/2016, Formentera 17/08/2017,
  Lisbona 25/03/2022, Barcellona 12/04/2024, Bologna 28/09/2024).

---

## Eventi in calendario

- I prossimi eventi stanno in `client/src/content/events.ts` (data, locale, line-up, flyer, biglietti).
- Ogni evento ha `endsAt`: **dopo quell'ora sparisce da solo** dalla homepage e dal pulsante "Get tickets" del menù.
- Se non c'è nessun evento futuro, la sezione Upcoming mostra "Coming soon" con l'iscrizione alla newsletter.
- Per aggiungere il prossimo: copiare una voce, cambiare i campi, `endsAt` con il fuso del locale
  (Barcellona +02:00 d'estate, +01:00 d'inverno).

---

## Cookie e Meta Pixel

- Codice: `client/src/lib/tracking.ts` (consenso + pixel) e `client/src/components/CookieBanner.tsx`.
- **Si attiva solo impostando `VITE_META_PIXEL_ID` su Vercel** (l'ID numerico del pixel, da Meta Events Manager). Senza ID: niente banner e niente tracciamento.
- Il pixel parte **solo dopo "Accept"**; "Only necessary" non carica nulla. La scelta si cambia dal link "Cookies" nel footer.
- Eventi inviati: `PageView` a ogni pagina, `Lead` a ogni iscrizione newsletter (popup, footer, "Coming soon").
- La privacy policy (`/privacy`, sezione "Cookies and advertising") descrive già il pixel.
