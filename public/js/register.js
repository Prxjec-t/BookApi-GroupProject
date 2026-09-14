// Register page (Ansvarsområde 1).
// A simple form with the two required fields - username and password - that
// POSTs to /api/auth/register. On success the user is sent to the login page.

renderNavbar("register");

document.getElementById("register-form").addEventListener("submit", async function (event) {
  event.preventDefault();
  const messageEl = document.getElementById("register-message");

  const newUser = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };

  try {
    const response = await fetch(API_URL + "/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      messageEl.className = "alert alert-success";
      messageEl.textContent = "Account created! Redirecting to login...";
      setTimeout(() => (window.location.href = "login.html"), 1200);
    } else {
      messageEl.className = "alert alert-danger";
      messageEl.textContent = data.message || "Could not register. Please try again.";
    }
  } catch (error) {
    console.error("Error:", error);
    messageEl.className = "alert alert-danger";
    messageEl.textContent = "Could not reach the server.";
  }
});
