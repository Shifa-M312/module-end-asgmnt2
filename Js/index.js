let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = null;

function updateStorage() {
  localStorage.setItem("users", JSON.stringify(users));
}

function togglePassword(id, btn) {
  let field = document.getElementById(id);
  if (field.type === "password") {
    field.type = "text";
    if (btn) btn.textContent = "Hide";
  } else {
    field.type = "password";
    if (btn) btn.textContent = "Show";
  }
}

function showError(id, message, isSuccess = false) {
  let errorId = id + "Error";
  let errorElement = document.getElementById(errorId);

  if (!errorElement) {
    errorElement = document.createElement("div");
    errorElement.id = errorId;
    errorElement.className = "error";
    document.getElementById(id).insertAdjacentElement("afterend", errorElement);
  }

  errorElement.innerText = message;
  errorElement.style.color = isSuccess ? "green" : "red";
  document.getElementById(id).style.borderColor = isSuccess ? "green" : "red";
}

function clearError(id) {
  let errorId = id + "Error";
  let errorElement = document.getElementById(errorId);
  if (errorElement) errorElement.innerText = "";
  document.getElementById(id).style.borderColor = "";
}

function register() {
  let name = document.getElementById("fullname").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let location = document.getElementById("location").value.trim();
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  let valid = true;

  if (!name) {
    showError("fullname", "Full name is required");
    valid = false;
  } else clearError("fullname");
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!email.match(emailPattern)) {
    showError("email", "Invalid email format");
    valid = false;
  } else clearError("email");
  if (!/^\d{10}$/.test(phone)) {
    showError("phone", "Phone number must be exactly 10 digits");
    valid = false;
  } else clearError("phone");
  if (!/^[A-Za-z\s]+$/.test(location)) {
    showError("location", "Location must contain only alphabets");
    valid = false;
  } else clearError("location");
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
    showError("password", "Password must be ≥8 chars with letters & numbers");
    valid = false;
  } else clearError("password");
  if (password !== confirmPassword) {
    showError("confirmPassword", "Passwords do not match");
    valid = false;
  } else clearError("confirmPassword");

  if (!valid) return;

  if (users.find((u) => u.email === email)) {
    showError("email", "Email already registered");
    return;
  }

  let newUser = { name, email, phone, location, password };
  users.push(newUser);
  updateStorage();

  showError("fullname", "Registered successfully!", true);
  setTimeout(() => {
    window.location.href = "SignIn.html";
  }, 1000);
}

function login() {
  let email = document.getElementById("signinEmail").value.trim();
  let password = document.getElementById("signinPassword").value;

  let valid = true;
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!email.match(emailPattern)) {
    showError("signinEmail", "Invalid email format");
    valid = false;
  } else clearError("signinEmail");
  if (!password) {
    showError("signinPassword", "Password is required");
    valid = false;
  } else clearError("signinPassword");

  if (!valid) return;

  let user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    showError("signinEmail", "Invalid credentials or user not registered");
    showError("signinPassword", "Invalid credentials or user not registered");
    return;
  }

  currentUser = user;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  showError("signinEmail", "Login successful!", true);
  setTimeout(() => {
    window.location.href = "travelapp.html";
  }, 1000);
}

function check() {
  let isLogged = JSON.parse(localStorage.getItem("currentUser"));
  if (!isLogged) window.location.href = "SignIn.html";
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "SignIn.html";
}
