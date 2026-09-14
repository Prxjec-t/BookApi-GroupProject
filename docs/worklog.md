# Worklog — Book API (client part)

My area of responsibility: **section "3 - Klientens olika sidor"** (all client pages).
Branch: `Klientens_olika_sidor`.

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
