let loginForm = document.getElementById("loginForm");
let isLocked = false;
let isLoggedIn = false;
let logginAttempts = 0;

function login() {
  if (isLocked) {
    alert("El sistema ha sido bloqueado");
    return;
  }

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  const username = usernameInput.value;
  const password = passwordInput.value;

  if (username.trim() === "" || password.trim() === "") {
    alert("Username y Password son obligatorios");
    return;
  }

  if (username === "admin" && password === "123") {
    alert("Inicio de sesion exitoso");
    showMenu();
  } else {
    logginAttempts++;
    alert(`Intentos incorrectos: ${logginAttempts}`);
    usernameInput.value = "";
    passwordInput.value = "";
    if (logginAttempts >= 3) {
      alert("Demasiados intentos, el sistema ha sido bloqueado.");
      isLocked = true;
      loginForm.style.display = "none";
      document.getElementById("blocked").style.display = "block";
    }
  }
}

function showMenu() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("menu").style.display = "block";
}

function logout() {
  isLoggedIn = false;
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("username").disabled = false;
  document.getElementById("password").disabled = false;
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("menu").style.display = "none";
  document.getElementById("packageForm").style.display = "none";
  resetPackageForm();
}

function sendPackage() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("packageForm").style.display = "block";
}

function resetPackageForm() {
  document.getElementById("senderName").value = "";
  document.getElementById("recipientName").value = "";
  document.getElementById("packageWeight").value = "";
  document.getElementById("shippingPrice").style.display = none;
}

function calculateShipping() {
  const senderName = document.getElementById("senderName").value;
  const recipientName = document.getElementById("recipientName").value;

  if (senderName === "" || recipientName === "" || packageWeight === "") {
    alert("Por favor, complete todos los campos.");
    return;
  } else {
    const packageWeight = parseFloat(
      document.getElementById("packageWeight").value
    );
    const shippingPrice = packageWeight * 2;
    document.getElementById(
      "shippingPrice"
    ).innerHTML = `El importe a pagar es: $${shippingPrice.toFixed(2)}`;
    document.getElementById("shippingPrice").style.display = "block";
  }

  setTimeout(() => {
    const decision = confirm("¿Desea realizar otra operación?");
    if (decision) {
      document.getElementById("menu").style.display = "block";
      document.getElementById("packageForm").style.display = "none";
      resetPackageForm();
    } else {
      alert("Sistema cerrado.");
      logout();
    }
  }, 1000);
}
