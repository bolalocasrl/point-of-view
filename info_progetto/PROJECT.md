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
| `*` | `client/src/pages/not-found.tsx` | Pagina 404 custom |

---

## Componenti Chiave

### Layout
| Componente | File | Descrizione |
|---|---|---|
| **Navbar** | `components/layout/Navbar.tsx` | Fixed top, logo + menu (Events, Vision, Products, Contacts), scroll-hide animato, mix-blend-difference |
| **Footer** | `components/layout/Footer.tsx` | Video background (`loopsitofinale.mp4`), Instagram + email, copyright dinamico |

### Sezioni Homepage (ordine visivo)
| Componente | File | Descrizione |
|---|---|---|
| **Hero** | `components/sections/Hero.tsx` | 3D model interattivo, parallax mouse/gyroscope, scroll indicator |
| **About** | `components/sections/About.tsx` | Vision statement, storia (fondato 2016), città europee |
| **Upcoming** | `components/sections/Upcoming.tsx` | Prossimo evento — Barcelona 5 giugno 2025 (Vraba Restaurant), dropdown tickets |
| **Events** | `components/sections/Events.tsx` | Agenda europea: 3 eventi (Bologna, Lisbon, Barcelona) con video cards |
| **Archive** | `components/sections/Archive.tsx` | Carousel 3D con 7 poster di eventi passati |
| **SocialHub** | `components/sections/SocialHub.tsx` | Partnership The Social Hub (Bologna, Barcelona) |
| **Merch** | `components/sections/Merch.tsx` | Carousel vortex 3D con 6 t-shirt, link Fourthwall store |
| **Logopovattina** | `components/sections/Logopovattina.tsx` | Modello 3D `.glb` auto-rotante (Three.js), materiale metallo bianco |

---

## Stato Attuale

### Funzionalità attive
- Landing page completa e responsiva (mobile-first)
- Hero 3D interattivo con parallax mouse e giroscopio mobile
- Sezione prossimo evento con bottone ticket
- Agenda europea con video cards
- Archive eventi passati (carousel 3D)
- Sezione merchandise con link a store esterno
- Footer con video loop e link social

### Funzionalità pronte ma non attive
- **Database PostgreSQL**: schema Drizzle pronto (`shared/schema.ts`), `storage.ts` usa ancora MemStorage
- **Autenticazione**: Passport.js installato ma non wired
- **API routes**: `server/routes.ts` preparato ma vuoto

### Contatti & Social
| Canale | Dettaglio |
|---|---|
| Email | POINTOFVIEW.MILAN@GMAIL.COM |
| Instagram | @pointofview.events |
| Store | point-of-view-txk-shop.fourthwall.com |

---

## Asset Principali
| Asset | Path | Uso |
|---|---|---|
| Logo | `/assets/logo-v2.png` | Navbar |
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
