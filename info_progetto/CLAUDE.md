# CLAUDE.md — Profilo operativo

Questo file descrive come lavoro e come devi aiutarmi. Leggilo sempre all'inizio di ogni chat.

---

## Chi sono

Non sono uno sviluppatore tecnico. Uso l'AI come copilota per costruire e gestire siti web. Ho un flusso di lavoro consolidato che funziona bene e voglio mantenerlo.

---

## Il mio setup

- **Editor:** Visual Studio Code (locale)
- **Repository:** GitHub (collegato a Claude)
- **Deploy:** Vercel (automatico — ogni push su `main` → deploy in ~1 minuto, collegato a Claude)
- **Database:** Supabase (solo per progetti che lo richiedono, collegato a Claude)
- **Package manager:** npm
- **Stack:** React, Vite, TypeScript, Tailwind CSS, shadcn/ui, framer-motion
- **AI in VS Code:** Claude Code (estensione)

---

## Il mio workflow

Lavoro quasi sempre direttamente dentro Claude Code in VS Code.
Claude Code può fare tutto in autonomia: modificare file, fare git push, eseguire query Supabase.

Flusso standard:
1. Apro il progetto in VS Code
2. Apro Claude Code e carico il contesto: "Leggi CLAUDE.md e PROJECT.md nella cartella info_progetto"
3. Do istruzioni in linguaggio normale
4. Claude Code modifica i file, committa e pusha da solo
5. Vercel deploya automaticamente in ~1 minuto
6. Verifico il risultato online

---

## Come devi aiutarmi

- **Istruzioni sempre passo per passo** — nessun passaggio dato per scontato
- **Dimmi sempre quale file aprire** e dove si trova
- **Un problema alla volta** — non fare più modifiche in parallelo senza dirmelo
- **Se ci sono più modi per fare una cosa, scegli il più semplice**
- **Avvisami sempre prima di fare modifiche che potrebbero rompere qualcosa**
- **Quando fai git push, dimmi sempre cosa hai committato e con quale messaggio**

---

## Regole per Supabase

Supabase contiene dati reali. Prima di qualsiasi operazione sul database:
- **Mostrami sempre la query prima di eseguirla** — non eseguire mai senza conferma
- **Non cancellare mai dati** senza conferma esplicita da parte mia
- **Non modificare la struttura delle tabelle** senza discuterne prima
- Per le letture (SELECT) puoi procedere liberamente

---

## Note importanti

- I miei progetti sono tutti **frontend puri**, tranne `safety_house` e `lifeos` che usano Supabase
- Ogni progetto ha la sua cartella dentro `PROGETTI/` sul mio Mac
- Ogni progetto ha una cartella `info_progetto/` con `CLAUDE.md` e `PROJECT.md`
- Il deploy avviene sempre da `main` — non usare altri branch salvo diversa indicazione

---

## Note specifiche del progetto point-of-view

### Deploy e build
- Push su `main` → Vercel pubblica in circa 1 minuto.
- Il file `.npmrc` con `legacy-peer-deps=true` è **necessario**: senza, l'installazione su Vercel
  fallisce per un conflitto tra le librerie 3D.
- `npx tsc --noEmit` segnala un errore preesistente in `Logopovattina.tsx`: non è una regressione.

### Variabili d'ambiente su Vercel
| Nome | A cosa serve |
|---|---|
| `VITE_FW_TOKEN` | Token pubblico Storefront API Fourthwall, usato da `/shop` |
| `BREVO_API_KEY` | Chiave Brevo, **solo lato server** in `api/subscribe.js` (protetta) |
| `BREVO_LIST_ID` | Lista Brevo di destinazione delle iscrizioni (3 = POV WEBSITE) |

### Pannelli esterni
Fourthwall e Brevo richiedono il **login manuale**: si apre una finestra di Chrome dedicata
(profilo separato, porta di controllo 9444), l'utente entra, e da lì si lavora.
Attenzione: nell'editor grafico di Fourthwall le schermate automatiche spesso vanno in timeout —
meglio verificare il risultato dai fotomontaggi del prodotto o dalla Storefront API.

### Cose che il sistema di sicurezza blocca
Generare credenziali (token, chiavi API) e alcune azioni sui prezzi: le fa l'utente e le passa a Claude,
che poi le salva su Vercel come variabili protette.

### Regole di contenuto
- Il sito e le email sono **in inglese**.
- Le email della campagna ESC seguono le linee guida del grafico riportate in `PROJECT.md`.
- Niente invii a tutta la lista senza conferma esplicita: le campagne restano bozze,
  si manda solo l'email di prova.
