"use strict";

export function validateBioForm() {
  const bioText = document.getElementById("editBioInputField").value;
  if (bioText.trim() === "") {
    alert("Bio cannot be empty");
    return false;
  }
  return true;
}

export function validateUsernameForm() {
  const username = document.getElementById("editUsernameInputField").value;
  if (username.trim() === "") {
    alert("Username cannot be empty");
    return false;
  }
  return true;
}

export function validateEmailForm() {
  const email = document.getElementById("editEmailInputField").value;
  if (email.trim() === "") {
    alert("Email cannot be empty");
    return false;
  }
  if (!validateEmail(email)) {
    alert("Invalid email format");
    return false;
  }
  return true;
}

export function validatePasswordForm() {
  const password = document.getElementById("editPasswordInputField").value;
  if (password.trim() === "") {
    alert("Password cannot be empty");
    return false;
  }
  if (password.length < 8) {
    alert("Password must be at least 8 characters long");
    return false;
  }
  return true;
}

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export function validateAddProfilePictureForm() {
  let isValid = true;

  const photo = document.getElementById("photo").files[0];

  // Photo validation
  if (!photo) {
    document.getElementById("photoError").innerText = "Photo is required";
    document.getElementById("photo").classList.add("is-invalid");
    isValid = false;
  } else {
    document.getElementById("photoError").innerText = "";
    document.getElementById("photo").classList.remove("is-invalid");
  }
  return isValid;
}

export function validateAddCommentForm(i) {
  const comment = document.getElementById(`comment-text${i}`).value;
  if (comment.trim() === "") {
    alert("Comment cannot be empty");
    return false;
  }
  return true;
}

export function validateEditCaptionForm(i) {
  const newCaption = document.getElementById(`photo-bio-caption${i}`).value;
  if (newCaption.trim() === "") {
    alert("Caption cannot be empty");
    return false;
  }
  return true;
}
