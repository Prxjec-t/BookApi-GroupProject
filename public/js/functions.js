// Shared client helpers used by every page.

// All API calls are same-origin, so a relative "/api" prefix is enough.
const API_URL = "/api";

// --- Shared navigation bar ------------------------------------------------
// Every page calls renderNavbar("<active page>") to draw the same top menu,
// so the links (and the logout button) live in one place instead of being
// copied into each HTML file. `active` just highlights the current page.
function renderNavbar(active) {
  const container = document.getElementById("navbar");
  if (!container) return;

  const link = (href, label, key) =>
    `<a class="nav-link ${active === key ? "active fw-bold" : ""}" href="${href}">${label}</a>`;

  container.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div class="container">
        <a class="navbar-brand" href="index.html">📚 Book API</a>
        <div class="navbar-nav me-auto">
          ${link("index.html", "Books", "books")}
          ${link("admin.html", "Admin", "admin")}
          ${link("login.html", "Login", "login")}
          ${link("register.html", "Register", "register")}
        </div>
        <button id="logout-btn" class="btn btn-outline-light btn-sm">Logout</button>
      </div>
    </nav>
  `;

  // The logout button belongs to no single page (per the spec), so it is wired
  // here for whichever page shows the navbar.
  document.getElementById("logout-btn").addEventListener("click", doLogout);
}

// --- Logout ---------------------------------------------------------------
// POST /api/auth/logout clears the accessToken cookie on the server. Whatever
// the result, we send the user back to the public book list.
async function doLogout() {
  try {
    await fetch(API_URL + "/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Error:", error);
  }
  window.location.href = "index.html";
}

// --- Small helper so user-supplied text can't inject HTML -----------------
function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value == null ? "" : String(value);
  return div.innerHTML;
}
