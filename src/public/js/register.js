"use strict";

function validateForm() {
  let isValid = true;

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Username validation
  if (username === "") {
    document.getElementById("usernameError").innerText = "Username is required";
    document.getElementById("username").classList.add("is-invalid");
    isValid = false;
  } else {
    document.getElementById("usernameError").innerText = "";
    document.getElementById("username").classList.remove("is-invalid");
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById("emailError").innerText = "Valid email is required";
    document.getElementById("email").classList.add("is-invalid");
    isValid = false;
  } else {
    document.getElementById("emailError").innerText = "";
    document.getElementById("email").classList.remove("is-invalid");
  }

  // Password validation
  if (password.length < 8) {
    document.getElementById("passwordError").innerText =
      "Password must be at least 8 characters long";
    document.getElementById("password").classList.add("is-invalid");
    isValid = false;
  } else {
    document.getElementById("passwordError").innerText = "";
    document.getElementById("password").classList.remove("is-invalid");
  }

  return isValid;
}
