// Login page (Ansvarsområde 1).
// Reads the username and password from the form (no longer hardcoded) and
// POSTs them to /api/auth/login. The server sets an httpOnly accessToken
// cookie on success, then we send the user to the admin panel.

renderNavbar("login");

// If we were redirected here by a protected page, show why (e.g. "You must be
// logged in..."). The message is passed as a ?message= query parameter.
const loginMessageParam = new URLSearchParams(window.location.search).get("message");
if (loginMessageParam) {
  const el = document.getElementById("login-message");
  el.className = "alert alert-warning";
  el.textContent = loginMessageParam;
}

document.getElementById("login-form").addEventListener("submit", async function (event) {
  event.preventDefault();
  const messageEl = document.getElementById("login-message");

  const credentials = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };

  try {
    const response = await fetch(API_URL + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = "admin.html";
    } else {
      messageEl.className = "alert alert-danger";
      messageEl.textContent = data.message || "Login failed. Please check your credentials.";
    }
  } catch (error) {
    console.error("Error:", error);
    messageEl.className = "alert alert-danger";
    messageEl.textContent = "Could not reach the server.";
  }
});
