"use strict";

const validateSearchForm = () => {
  let isValid = true;
  const username = document.getElementById("username").value;

  if (username.trim() === "") {
    alert("Username cannot be empty!");
    isValid = false;
  }

  return isValid;
};
