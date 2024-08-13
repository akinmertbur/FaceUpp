"use strict";

function hideButtons() {
  const editBioButton = document.getElementById("editBioButton");
  const editUsernameButton = document.getElementById("editUsernameButton");
  const editEmailButton = document.getElementById("editEmailButton");
  const editPasswordButton = document.getElementById("editPasswordButton");
  const addProfilePictureButton = document.getElementById(
    "addProfilePictureButton"
  );

  editBioButton.classList.add("hide");
  editUsernameButton.classList.add("hide");
  editEmailButton.classList.add("hide");
  editPasswordButton.classList.add("hide");
  addProfilePictureButton.classList.add("hide");
}

function showButtons() {
  const editBioButton = document.getElementById("editBioButton");
  const editUsernameButton = document.getElementById("editUsernameButton");
  const editEmailButton = document.getElementById("editEmailButton");
  const editPasswordButton = document.getElementById("editPasswordButton");
  const addProfilePictureButton = document.getElementById(
    "addProfilePictureButton"
  );

  editBioButton.classList.remove("hide");
  editUsernameButton.classList.remove("hide");
  editEmailButton.classList.remove("hide");
  editPasswordButton.classList.remove("hide");
  addProfilePictureButton.classList.remove("hide");
}

function toggleHideBio() {
  const editBioInputField = document.getElementById("editBioInputField");
  const saveBioButton = document.getElementById("saveBioButton");

  if (editBioInputField.classList.contains("hide")) {
    editBioInputField.classList.remove("hide");
    saveBioButton.classList.remove("hide");
    hideButtons();
  } else {
    editBioInputField.classList.add("hide");
    saveBioButton.classList.add("hide");
    showButtons();
  }
}

function toggleHideUsername() {
  const editUsernameInputField = document.getElementById(
    "editUsernameInputField"
  );
  const saveUsernameButton = document.getElementById("saveUsernameButton");

  if (editUsernameInputField.classList.contains("hide")) {
    editUsernameInputField.classList.remove("hide");
    saveUsernameButton.classList.remove("hide");
    hideButtons();
  } else {
    editUsernameInputField.classList.add("hide");
    saveUsernameButton.classList.add("hide");
    showButtons();
  }
}

function toggleHideEmail() {
  const editEmailInputField = document.getElementById("editEmailInputField");
  const saveEmailButton = document.getElementById("saveEmailButton");

  if (editEmailInputField.classList.contains("hide")) {
    editEmailInputField.classList.remove("hide");
    saveEmailButton.classList.remove("hide");
    hideButtons();
  } else {
    editEmailInputField.classList.add("hide");
    saveEmailButton.classList.add("hide");
    showButtons();
  }
}

function toggleHidePassword() {
  const editPasswordInputField = document.getElementById(
    "editPasswordInputField"
  );
  const savePasswordButton = document.getElementById("savePasswordButton");

  if (editPasswordInputField.classList.contains("hide")) {
    editPasswordInputField.classList.remove("hide");
    savePasswordButton.classList.remove("hide");
    hideButtons();
  } else {
    editPasswordInputField.classList.add("hide");
    savePasswordButton.classList.add("hide");
    showButtons();
  }
}

function toggleHideProfilePicture() {
  const saveProfilePictureButton = document.getElementById(
    "saveProfilePictureButton"
  );
  const photo = document.getElementById("photo");

  if (photo.classList.contains("hide")) {
    photo.classList.remove("hide");
    saveProfilePictureButton.classList.remove("hide");
    hideButtons();
  } else {
    photo.classList.add("hide");
    saveProfilePictureButton.classList.add("hide");
    showButtons();
  }
}

document
  .getElementById("followings-button")
  .addEventListener("mouseover", function () {
    document.getElementById("followings-container").classList.remove("hide");
  });

document
  .getElementById("followings-button")
  .addEventListener("mouseout", function () {
    document.getElementById("followings-container").classList.add("hide");
  });

document
  .getElementById("followers-button")
  .addEventListener("mouseover", function () {
    document.getElementById("followers-container").classList.remove("hide");
  });

document
  .getElementById("followers-button")
  .addEventListener("mouseout", function () {
    document.getElementById("followers-container").classList.add("hide");
  });

/*
  function toggleFollowingsPanel() {
    const followingContainer = document.getElementById("followings-container");

    if(followingContainer.classList.contains('hide')) {
      followingContainer.classList.remove('hide');
    } else {
      followingContainer.classList.add('hide');
    }
  }

  function toggleFollowersPanel() {
    const followerContainer = document.getElementById("followers-container");

    if(followerContainer.classList.contains('hide')) {
      followerContainer.classList.remove('hide');
    } else {
      followerContainer.classList.add('hide');
    }
  }
  */

function toggleLikesPanel(i) {
  const likesPanel = document.getElementById(`likes-panel${i}`);

  if (likesPanel.classList.contains("hide")) {
    likesPanel.classList.remove("hide");
  } else {
    likesPanel.classList.add("hide");
  }
}

function toggleCommentsPanel(i) {
  const commentsPanel = document.getElementById(`comments-panel${i}`);
  const commentButton = document.getElementById(`showCommentButton${i}`);

  if (commentsPanel.classList.contains("hide")) {
    commentsPanel.classList.remove("hide");
    commentButton.innerHTML = "Hide All Comments";
  } else {
    commentsPanel.classList.add("hide");
    commentButton.innerHTML = "Show All Comments";
  }
}

function editPhotoCaption(i) {
  const photoCaptionButton = document.getElementById(`photo-bio-button${i}`);
  const photoCaption = document.getElementById(`photo-bio${i}`);
  const photoBioCaption = document.getElementById(`photo-bio-caption${i}`);
  const saveCaptionButton = document.getElementById(`saveCaptionButton${i}`);

  if (photoCaptionButton.classList.contains("hide")) {
    photoCaption.classList.remove("hide");
    photoCaptionButton.classList.remove("hide");
    photoBioCaption.classList.add("hide");
    saveCaptionButton.classList.add("hide");
  } else {
    photoCaption.classList.add("hide");
    photoCaptionButton.classList.add("hide");
    photoBioCaption.classList.remove("hide");
    saveCaptionButton.classList.remove("hide");
    photoBioCaption.value = photoCaption.innerHTML;
  }
}

function validateBioForm() {
  const bioText = document.getElementById("editBioInputField").value;
  if (bioText.trim() === "") {
    alert("Bio cannot be empty");
    return false;
  }
  return true;
}

function validateUsernameForm() {
  const username = document.getElementById("editUsernameInputField").value;
  if (username.trim() === "") {
    alert("Username cannot be empty");
    return false;
  }
  return true;
}

function validateEmailForm() {
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

function validatePasswordForm() {
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

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validateAddProfilePictureForm() {
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

function validateAddCommentForm(i) {
  const comment = document.getElementById(`comment-text${i}`).value;
  if (comment.trim() === "") {
    alert("Comment cannot be empty");
    return false;
  }
  return true;
}

function validateEditCaptionForm(i) {
  const newCaption = document.getElementById(`photo-bio-caption${i}`).value;
  if (newCaption.trim() === "") {
    alert("Caption cannot be empty");
    return false;
  }
  return true;
}

const handleEditCaptionFormSubmit = async (event, i) => {
  event.preventDefault(); // Prevent the default form submission

  // Perform validation
  if (!validateEditCaptionForm(i)) {
    return false; // Stop the submission if validation fails
  }

  const form = document.getElementById(`editCaptionForm${i}`);
  const photoId = form.photoId.value;
  const newCaption = form.newCaption.value;

  try {
    const response = await fetch("api/photos/editCaption", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photoId, newCaption }),
    });

    if (response.ok) {
      const updatedCaption = await response.json();

      // Update the caption display area with the new caption
      document.getElementById(`photo-bio${i}`).innerText =
        updatedCaption.caption;
    } else {
      alert("Error updating caption");
    }
  } catch (err) {
    console.log(`Error: ${err}`);
    alert("Error updating caption");
  }

  return false; // Ensure the form doesn't trigger a page reload
};

const handleEditBioFormSubmit = async (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Perform validation
  if (!validateBioForm()) {
    return false;
  }

  const form = document.getElementById("editBioForm");
  const userId = form.userId.value;
  const bioText = form.bioText.value;

  try {
    const response = await fetch("/api/users/editBio", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, bioText }),
    });

    if (response.ok) {
      const updatedBio = await response.json();

      // Update the bio display area with the new bio
      document.getElementById("user-bio").innerText = updatedBio.bio;
    } else {
      alert("Error updating user bio");
    }
  } catch (err) {
    console.log(`Error: ${err}`);
    alert("Error updating user bio");
  }

  return false; // Ensure the form doesn't trigger a page reload
};

const handleEditUsernameFormSubmit = async (event) => {
  event.preventDefault();

  if (!validateUsernameForm()) {
    return false;
  }

  const form = document.getElementById("editUsernameForm");
  const userId = form.userId.value;
  const username = form.username.value;

  try {
    const response = await fetch("/api/users/editUsername", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, username }),
    });

    if (response.ok) {
      const updatedUsername = await response.json();

      document.getElementById("username").innerText = updatedUsername.username;
    } else {
      alert("Error updating username");
    }
  } catch (err) {
    console.log(`Error: ${err}`);
    alert("Error updating username");
  }

  return false; // Ensure the form doesn't trigger a page reload
};

const handleEditEmailFormSubmit = async (event) => {
  event.preventDefault();

  if (!validateEmailForm()) {
    return false;
  }

  const form = document.getElementById("editEmailForm");
  const userId = form.userId.value;
  const email = form.email.value;

  try {
    const response = await fetch("/api/users/editEmail", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, email }),
    });

    const updatedEmail = await response.json();
    if (response.ok) {
      alert(updatedEmail.message);
    } else {
      alert(`Error updating email: ${updatedEmail.message}`);
    }
  } catch (err) {
    console.log(`Error: ${err}`);
    alert("Error updating email");
  }

  return false; // Ensure the form doesn't trigger a page reload
};

const handleEditProfilePictureFormSubmit = async (event) => {
  event.preventDefault();

  if (!validateAddProfilePictureForm()) {
    return false;
  }

  const form = document.getElementById("editProfilePictureForm");
  const formData = new FormData(form); // Automatically includes the file input and other form data

  try {
    const response = await fetch("/api/users/editProfilePicture", {
      method: "PATCH",
      body: formData, // Send the FormData, including the file
    });

    const updatedProfilePicture = await response.json();
    if (response.ok) {
      alert(updatedProfilePicture.message);
    } else {
      alert(`Error updating profile picture: ${updatedProfilePicture.message}`);
    }
  } catch (err) {
    console.log(`Error: ${err}`);
    alert("Error updating profile picture");
  }

  return false; // Ensure the form doesn't trigger a page reload
};

// Function to preview the profile picture before uploading
const previewProfilePicture = () => {
  const fileInput = document.getElementById("photo");
  const file = fileInput.files[0];

  if (file) {
    const previewUrl = URL.createObjectURL(file);
    const profilePictureElement = document.getElementById("profile-picture");
    profilePictureElement.src = previewUrl; // Update the image source to the preview URL
  }
};

const handleEditPasswordFormSubmit = async (event) => {
  event.preventDefault();

  if (!validatePasswordForm()) {
    return false;
  }

  const form = document.getElementById("editPasswordForm");
  //const formData = new FormData(form);
  const userId = form.userId.value;
  const password = form.password.value;

  try {
    const response = await fetch("/api/auth/editPassword", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, password }),
    });

    const updatedPassword = await response.json();
    if (response.ok) {
      alert(updatedPassword.message);
    } else {
      alert(`Error updating password: ${updatedPassword.message}`);
    }
  } catch (err) {
    console.log(`Error: ${err}`);
    alert("Error updating password");
  }

  return false; // Ensure the form doesn't trigger a page reload
};
