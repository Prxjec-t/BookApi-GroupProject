// Password-protected admin panel (Ansvarsområde 1 & 2 - client part).
// Any logged-in user may view it. The page:
//   - lists all users in a table (username, is_admin, created_at)
//   - lists all books in a table (title, author, genres, published_year)
//   - lets you create a new book via a form
// The accessToken cookie is httpOnly, so we can't read it in JS. Instead we
// gate the page on the response of the token-protected GET /api/users call:
// a 401/403 means "not logged in" and we bounce back to the login page.

renderNavbar("admin");

// --- Load the users table (also acts as the login gate) ------------------
async function loadUsers() {
  const messageEl = document.getElementById("users-message");

  try {
    const response = await fetch(API_URL + "/users", { credentials: "include" });

    if (response.status === 401 || response.status === 403) {
      window.location.href = "login.html?message=You must be logged in to view the admin panel";
      return;
    }

    if (!response.ok) {
      messageEl.className = "alert alert-warning";
      messageEl.textContent = "Could not load users.";
      return;
    }

    const users = await response.json();

    if (!Array.isArray(users) || users.length === 0) {
      document.getElementById("users-body").innerHTML =
        `<tr><td colspan="3" class="text-muted">No users found.</td></tr>`;
      return;
    }

    document.getElementById("users-body").innerHTML = users.map(user => `
      <tr>
        <td>${escapeHtml(user.username)}</td>
        <td>${user.is_admin ? "Yes" : "No"}</td>
        <td>${user.created_at ? new Date(user.created_at).toLocaleString() : ""}</td>
      </tr>
    `).join("");
  } catch (error) {
    console.error("Error:", error);
    messageEl.className = "alert alert-warning";
    messageEl.textContent = "Could not reach the server.";
  }
}

// --- Load the books table ------------------------------------------------
async function loadBooks() {
  const messageEl = document.getElementById("books-message");

  try {
    const response = await fetch(API_URL + "/books", { credentials: "include" });
    if (!response.ok) {
      messageEl.className = "alert alert-warning";
      messageEl.textContent = "Could not load books.";
      return;
    }

    const books = await response.json();

    if (!Array.isArray(books) || books.length === 0) {
      document.getElementById("books-body").innerHTML =
        `<tr><td colspan="4" class="text-muted">No books found.</td></tr>`;
      return;
    }

    document.getElementById("books-body").innerHTML = books.map(book => {
      const genres = Array.isArray(book.genres) ? book.genres.join(", ") : (book.genres || "");
      return `
        <tr>
          <td>${escapeHtml(book.title)}</td>
          <td>${escapeHtml(book.author)}</td>
          <td>${escapeHtml(genres)}</td>
          <td>${escapeHtml(book.published_year)}</td>
        </tr>
      `;
    }).join("");
  } catch (error) {
    console.error("Error:", error);
    messageEl.className = "alert alert-warning";
    messageEl.textContent = "Could not reach the server.";
  }
}

// --- Create a new book ---------------------------------------------------
document.getElementById("book-form").addEventListener("submit", async function (event) {
  event.preventDefault();
  const messageEl = document.getElementById("book-form-message");

  // genres is stored as an array in MongoDB, so split the comma-separated text.
  const genres = document.getElementById("genres").value
    .split(",")
    .map(g => g.trim())
    .filter(g => g.length > 0);

  const newBook = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    description: document.getElementById("description").value,
    genres: genres,
    image: document.getElementById("image").value,
    published_year: Number(document.getElementById("published_year").value) || undefined,
  };

  try {
    const response = await fetch(API_URL + "/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
      credentials: "include",
    });

    if (response.ok) {
      messageEl.className = "alert alert-success";
      messageEl.textContent = "Book created!";
      document.getElementById("book-form").reset();
      loadBooks(); // refresh the table so the new book appears
    } else {
      const data = await response.json().catch(() => ({}));
      messageEl.className = "alert alert-danger";
      messageEl.textContent = data.message || "Could not create the book.";
    }
  } catch (error) {
    console.error("Error:", error);
    messageEl.className = "alert alert-danger";
    messageEl.textContent = "Could not reach the server.";
  }
});

loadUsers();
loadBooks();
