// Visitor book list (Ansvarsområde 2 - client part).
// Public page, no login needed. Each card shows a small image, title, author,
// year and genres, and links to the specific-book page (book.html?id=...).

renderNavbar("books");

async function loadBooks() {
  const messageEl = document.getElementById("books-message");

  try {
    const response = await fetch(API_URL + "/books", { credentials: "include" });
    if (!response.ok) {
      messageEl.className = "alert alert-warning";
      messageEl.textContent = "Could not load the books.";
      return;
    }

    const books = await response.json();

    if (!Array.isArray(books) || books.length === 0) {
      messageEl.className = "alert alert-info";
      messageEl.textContent = "No books yet.";
      return;
    }

    document.getElementById("books").innerHTML = books.map(book => {
      const genres = Array.isArray(book.genres) ? book.genres.join(", ") : (book.genres || "");
      return `
        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card h-100">
            <a href="book.html?id=${encodeURIComponent(book._id)}">
              <img src="${escapeHtml(book.image)}" alt="${escapeHtml(book.title)}" class="card-img-top" style="height: 220px; object-fit: cover;">
            </a>
            <div class="card-body">
              <h2 class="h6 card-title">
                <a href="book.html?id=${encodeURIComponent(book._id)}" class="text-decoration-none">${escapeHtml(book.title)}</a>
              </h2>
              <p class="card-text text-muted mb-1">${escapeHtml(book.author)}</p>
              <p class="card-text mb-1"><small>${escapeHtml(book.published_year)}</small></p>
              <p class="card-text"><small class="text-muted">${escapeHtml(genres)}</small></p>
            </div>
          </div>
        </div>
      `;
    }).join("");
  } catch (error) {
    console.error("Error:", error);
    messageEl.className = "alert alert-warning";
    messageEl.textContent = "Could not reach the server.";
  }
}

loadBooks();
