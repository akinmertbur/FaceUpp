"use strict";

function validateAddContentForm() {
  let isValid = true;

  const photo = document.getElementById("photo").files[0];
  const caption = document.getElementById("caption").value.trim();

  // Photo validation
  if (!photo) {
    document.getElementById("photoError").innerText = "Photo is required";
    document.getElementById("photo").classList.add("is-invalid");
    isValid = false;
  } else {
    document.getElementById("photoError").innerText = "";
    document.getElementById("photo").classList.remove("is-invalid");
  }

  // Caption validation
  if (caption === "") {
    document.getElementById("captionError").innerText =
      "Caption cannot be empty";
    document.getElementById("caption").classList.add("is-invalid");
    isValid = false;
  } else {
    document.getElementById("captionError").innerText = "";
    document.getElementById("caption").classList.remove("is-invalid");
  }

  return isValid;
}
