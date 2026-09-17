# Worklog — Book API (client part)

My area of responsibility (clarified in group chat): **Ansvarsområde 3 = reviews**, the full vertical
across all 3 categories (table + endpoints + client). Division is VERTICAL:

- Amanda = område 2 (books), Kimi = område 1 (users), me = område 3 (reviews).
  I also built the client pages for områden 1 & 2 as help for the group (bonus, not my grading area).
  Branch: `Klientens_olika_sidor`.

---

## 🟢 SESSION 2026-09-15 — DB inspection + integration understanding

### DONE (this session)

- Confirmed division with group: VERTICAL. I own **reviews (område 3)** — done in all 3 categories
  (`src/models/Review.ts`, `src/routes/reviews.ts` + `src/controllers/reviewController.ts`, `public/book.html` + `book.js`).
- Inspected the shared MongoDB Atlas (`book-api` db). Current data:
  - `books`: 1 doc ("The Shining" – Stephen King, 1977)
  - `users`: 4 docs
  - `reviews`: 0 docs (empty)
- Key insight: DATA exists but **books/users API code is NOT on main yet** — Amanda's `/api/books`
  CRUD (område 2) is unpushed; main only has empty `Book.ts` + Vercel config.
- Created helper `check-db.mjs` (project root) — connects with `MONGODB_URL` and prints collections
  - document contents. Run: `npx tsx check-db.mjs`. Personal tool, no secrets, safe to delete.
- Sent Amanda a message asking her to merge her books endpoints into main.
- Learned/covered: express.Router() has no URL/domain; prefix set by `app.use('/api/reviews', ...)`,
  port by `app.listen(3000)`, host (localhost) is implicit. Direct-DB vs through-API access paths.

### 🔜 NEXT STEPS (continue here)

1. **Merge my branch to main** — still NOT done. Told Amanda I would ("Jag kan pusha allt... merga in i main").
   Do via PR or `git checkout main && git merge Klientens_olika_sidor && git push`.
2. **Wait for Amanda to push books API (område 2)** to main → then `git pull` → my book pages light up.
   Watch for `GET /api/books` and `GET /api/books/:id` (the latter must return book + its reviews —
   this is the books↔reviews "koppling" Amanda wants to do together).
3. **Wait for Kimi to push users API + real register (område 1)** → admin user table + register will work.
4. Optional NOW: spin up a TEMPORARY local `/api/books` to preview "The Shining" on my own page and
   test my review flow end-to-end (POST review → lands in the empty reviews collection). Offered, not done.
5. Add README.md (still missing) + make sure everyone's git contributions are visible (OBS 1) + Dagbok.

### ⚠️ Open questions / waiting on

- Books API (Amanda) and Users API + persistent register (Kimi) not on main yet.
- `src/models/Book.ts` is EMPTY on main.
- Backend login still only works for hardcoded `admin/123`; register does not persist (område 1).

---

## 🟢 SESSION 2026-09-14 — Client pages + project architecture walkthrough

### DONE (this session)

- Built ALL client pages of my part (commit `2a766f0`):
  - `public/index.html` + `public/js/books-list.js` — visitor book list (image, title, author, year, genres, link to book page)
  - `public/login.html` + `public/js/login.js` — login with real input fields (was hardcoded `admin/123`)
  - `public/register.html` + `public/js/register.js` — register → POST `/api/auth/register`
  - `public/admin.html` + `public/js/admin.js` — protected admin panel: users table, books table, create-book form, redirect to login if not authorized
  - `public/book.html` + `public/js/book.js` — book detail page + reviews (already done before session, navbar added)
  - `public/js/functions.js` — shared navbar + logout button + `escapeHtml`
- Removed starter template files: `public/protected.html`, `public/js/protected.js`
- Verified: server boots (`npm run dev`), all 5 pages return HTTP 200, no Cyrillic in code
- Verified: `.env` is in `.gitignore` and NOT tracked in git (Mongo password did not leak)

### 🔜 NEXT STEPS (continue here)

1. **Wait for colleague's backend (section 2)**: book/admin pages are empty until endpoints `GET /api/books` and `/api/users` exist — that is her area. Once wired, my pages come alive with NO changes.
2. **Add README.md** (missing): how to run (`npm run dev`), required env (`MONGODB_URL`, `JWT_SECRET`), + space for the Dagbok. Important for the teacher's check (OBS 2: "download and run with my own MongoDB").
3. **Check git contributions** — assignment requires it to be visible who coded what (OBS 1). Make sure my commits are under my name.
4. **Minor package.json cleanup** (optional): `name` = `book-api` instead of `01-getting-started`, fix/remove `main: index.js`.

### ⚠️ Open questions / waiting on

- **Books API and Users API missing** — sections 2 and 1 (colleagues). Without them the book list and admin tables are empty (they show a clean message, do not crash).
- Backend `/api/auth/register` does NOT yet save the user to the DB (just returns the hash) — section 1, not mine.
- Backend login only works for `admin/123` — also section 1.
- Undecided whether I build the colleague's books API myself just to see my pages working (~15 lines, mirrors reviews) — waiting on colleague for now.

### 📌 Project map (quick-start cheat sheet)

- Server entry point: `api/index.ts` (middleware + routes + static `public/` around line 74).
- Routes mounted around lines 81-83: `auth`, `greetings`, `reviews`. Books/users — NOT mounted.
- Home page flow: `GET /` → `express.static` → `index.html` → `books-list.js` → `fetch('/api/books')` → 404 (no endpoint).
- Working vertical slice example (reviews): `book.html` → `fetch('/api/reviews')` → `routes/reviews.ts` → `reviewController.ts` → `models/Review.ts`.
- Run: `npm run dev` (tsx watch), open http://localhost:3000.

---

## Amanda Andersson – Arbetsdagbok

### Projektstart och ansvarsfördelning

Jag skapade projektet utifrån vår starter template och satte upp det gemensamma GitHub-repot. Jag bjöd in gruppmedlemmarna så att vi kunde arbeta med våra respektive delar och sedan slå ihop koden i samma projekt.

Vi delade upp arbetet så att jag ansvarade för böckerna, Alexander för recensionerna och Kimi för användare och autentisering. Efter ett missförstånd kring ansvarsfördelningen tog Alexander även hand om klienten. Jag fortsatte därför att fokusera på bokdelen av API:et och testade senare dess funktioner i klienten som Alexander hade byggt.

### Min del – böcker

Jag skapade filerna `Book.ts`, `bookController.ts` och `books.ts`. I bokmodellen lade jag till fälten titel, beskrivning, författare, genrer, bild och utgivningsår.

Jag skrev funktionerna och routsen för att hämta alla böcker, hämta en enskild bok samt skapa, uppdatera och radera böcker. Jag använde projektets befintliga `verifyToken`-middleware för att skydda de bokfunktioner som kräver inloggning. Jag byggde alltså inte själva autentiseringen, utan använde den i min del av API:et.

Jag lade också till en koppling i bokmodellen som gör att recensionerna kan hämtas tillsammans med en bok. När en bok raderas ser min kod till att även dess tillhörande recensioner tas bort. Alexander ansvarade för själva recensionsmodellen och recensionernas endpoints och vi behövde därför samordna hur böcker och recensioner kopplades ihop.

### Testning och testdata

Jag testade bokdelens endpoints i Insomnia genom att hämta, skapa, uppdatera och radera böcker. Jag kontrollerade även att recensioner följde med när jag hämtade en enskild bok och att en tillhörande recension togs bort när jag raderade en bok.

När våra delar hade slagits ihop testade jag bokfunktionerna i klienten. Jag kontrollerade att boklistan visades, att det gick att öppna en boks detaljsida och att det gick att lägga till böcker via adminpanelen. Jag lade in böcker och recensioner som testdata och testade även att radera en recension via Insomnia.
Jag testade också registrering, inloggning och utloggning efter att Kimis del hade lagts till i projektet.

### Databasexport

Inför inlämningen exporterade jag MongoDB-samlingarna `users`, `books` och `reviews` så att testdatan kunde följa med projektet.

---

## Kimi Leminaho - Arbetsdagbok
### Min del - users
Jag ansvarde för att se till så man kan ha en tabell på alla users som existerar i databasen, jag ansvarde även för att skapa en register, login och logout. Jag arbetade inte bara med att fixa en databas för users utan fixade även funktioner för att fånga alla, en specifik, uppdatera och radera users. Efter ett missförstånd så gjordes min del av klienten av Alexander men vad jag kan se så stämmer det med uppgiftsbeskrivningen och körs som det ska så hittade ingen anledning att göra om osv. 
### Testning
För att testa endpointsen så använde jag Insomnia för att se till så man kan registrera, logga in och logga ut, men även så man faktiskt kan GET all users och en specifik user med id som funkade. Funktionen att uppdatera och radera users gick även. 
