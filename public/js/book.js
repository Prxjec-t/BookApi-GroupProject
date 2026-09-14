// Specific-book page (Ansvarsområde 3).
// The book to show is passed in the URL as ?id=<bookId>, e.g.
//   book.html?id=6650f0c1a2b3c4d5e6f70000
// We use that id both to load the book and to load/create its reviews.

renderNavbar("books");

const bookId = new URLSearchParams(window.location.search).get("id");

// --- Load and render the book itself -------------------------------------
// GET /api/books/:id is Ansvarsområde 2's endpoint. If it is not available yet
// we still show the review section, so this page keeps working on its own.
async function loadBook() {
  if (!bookId) {
    document.getElementById("book-message").className = "alert alert-danger";
    document.getElementById("book-message").textContent = "No book id was provided in the URL.";
    return;
  }

  try {
    const response = await fetch(API_URL + "/books/" + bookId, { credentials: "include" });
    if (!response.ok) {
      document.getElementById("book-message").className = "alert alert-warning";
      document.getElementById("book-message").textContent = "Could not load the book details.";
      return;
    }

    const book = await response.json();
    const genres = Array.isArray(book.genres) ? book.genres.join(", ") : (book.genres || "");

    document.getElementById("book").innerHTML = `
      <div class="col-md-4">
        <img src="${escapeHtml(book.image)}" alt="${escapeHtml(book.title)}" class="img-fluid rounded">
      </div>
      <div class="col-md-8">
        <h1>${escapeHtml(book.title)}</h1>
        <p class="text-muted mb-1">by ${escapeHtml(book.author)}</p>
        <p class="mb-1"><strong>Published:</strong> ${escapeHtml(book.published_year)}</p>
        <p class="mb-1"><strong>Genres:</strong> ${escapeHtml(genres)}</p>
        <p class="mt-3">${escapeHtml(book.description)}</p>
      </div>
    `;
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("book-message").className = "alert alert-warning";
    document.getElementById("book-message").textContent = "Could not load the book details.";
  }
}

// --- Load and render the reviews for this book ---------------------------
async function loadReviews() {
  try {
    const response = await fetch(API_URL + "/reviews?book_id=" + bookId, { credentials: "include" });
    const reviews = await response.json();

    if (!Array.isArray(reviews) || reviews.length === 0) {
      document.getElementById("reviews").innerHTML = `<p class="text-muted">No reviews yet. Be the first!</p>`;
      return;
    }

    // Each review shows content, rating, name and created_at (per the spec).
    document.getElementById("reviews").innerHTML = reviews.map(review => `
      <div class="card mb-3">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <h3 class="h6 mb-1">${escapeHtml(review.name)}</h3>
            <span>${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</span>
          </div>
          <p class="mb-1">${escapeHtml(review.content)}</p>
          <small class="text-muted">${new Date(review.created_at).toLocaleString()}</small>
        </div>
      </div>
    `).join("");
  } catch (error) {
    console.error("Error:", error);
  }
}

// --- Create a new review -------------------------------------------------
document.getElementById("review-form").addEventListener("submit", async function (event) {
  event.preventDefault();
  const messageEl = document.getElementById("review-form-message");

  const newReview = {
    name: document.getElementById("review-name").value,
    rating: Number(document.getElementById("review-rating").value),
    content: document.getElementById("review-content").value,
    book_id: bookId
  };

  try {
    const response = await fetch(API_URL + "/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
      credentials: "include"
    });

    if (response.ok) {
      messageEl.className = "alert alert-success";
      messageEl.textContent = "Thanks for your review!";
      document.getElementById("review-form").reset();
      loadReviews(); // refresh the list so the new review shows up
    } else {
      const data = await response.json();
      messageEl.className = "alert alert-danger";
      messageEl.textContent = data.message || "Could not submit review.";
    }
  } catch (error) {
    console.error("Error:", error);
    messageEl.className = "alert alert-danger";
    messageEl.textContent = "Could not submit review.";
  }
});

loadBook();
loadReviews();
