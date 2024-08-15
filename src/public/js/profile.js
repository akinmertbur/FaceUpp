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

const handleLikeFormSubmit = async (event, i) => {
  event.preventDefault();

  const form = document.getElementById(`likeForm${i}`);
  const userId = form.userId.value;
  const photoId = form.photoId.value;
  const likeButton = document.getElementById(`likeButton${i}`);

  if (likeButton.classList.contains("liked")) {
    form.id = `unlikeForm${i}`;
    likeButton.id = `disLikeButton${i}`;
    await handleUnlikeFormSubmit(event, i);
    form.id = `likeForm${i}`;
    likeButton.id = `likeButton${i}`;
  } else {
    try {
      const response = await fetch("/api/likes/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, photoId }),
      });

      if (response.ok) {
        const likeResponse = await response.json();
        const user = likeResponse.user;

        const likesPanel = document.getElementById(`likes-panel${i}`);
        const newParagraph = document.createElement("p");
        newParagraph.innerHTML = `🩷 <a href="/userProfile/${user.id}">${user.username}</a>`;
        likesPanel.appendChild(newParagraph);

        likeButton.textContent = "Liked";
        likeButton.classList.add("liked");

        const likesCount = document.getElementById(`likes-count${i}`);
        const num = Number(likesCount.textContent.split(" ")[0]);
        likesCount.textContent = `${num + 1} Likes`;
      } else {
        alert(`Error like the photo`);
      }
    } catch (err) {
      console.log(`Error: ${err}`);
      alert("Error like the photo");
    }
  }

  return false; // Ensure the form doesn't trigger a page reload
};

const handleUnlikeFormSubmit = async (event, i) => {
  event.preventDefault();

  const form = document.getElementById(`unlikeForm${i}`);
  const userId = form.userId.value;
  const photoId = form.photoId.value;

  const dislikeButton = document.getElementById(`disLikeButton${i}`);

  if (!dislikeButton.classList.contains("liked")) {
    form.id = `likeForm${i}`;
    dislikeButton.id = `likeButton${i}`;
    await handleLikeFormSubmit(event, i);
    form.id = `unlikeForm${i}`;
    dislikeButton.id = `disLikeButton${i}`;
  } else {
    try {
      const response = await fetch("/api/likes/unlike", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, photoId }),
      });

      if (response.ok) {
        const unlikeResponse = await response.json();
        const user = unlikeResponse.user;

        const elements = document.querySelectorAll(`#likes-panel${i} p`);

        elements.forEach((element) => {
          if (
            element.innerHTML.includes(
              `🩷 <a href="/userProfile/${user.id}">${user.username}</a>`
            )
          ) {
            element.remove();
          }
        });

        dislikeButton.textContent = "Like";
        dislikeButton.classList.remove("liked");

        const likesCount = document.getElementById(`likes-count${i}`);
        const num = Number(likesCount.textContent.split(" ")[0]);
        likesCount.textContent = `${num - 1} Likes`;
      } else {
        alert(`Error unlike the photo`);
      }
    } catch (err) {
      console.log(`Error: ${err}`);
      alert("Error unlike the photo");
    }
  }

  return false;
};

const handleAddCommentFormSubmit = async (event, i) => {
  event.preventDefault();

  if (!validateAddCommentForm(i)) {
    return false;
  }

  const form = document.getElementById(`addCommentForm${i}`);
  const userId = form.userId.value;
  const photoId = form.photoId.value;
  const comment = form.comment.value;

  try {
    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, photoId, comment }),
    });

    if (response.ok) {
      const commentResponse = await response.json();
      const user = commentResponse.user;
      const comment = commentResponse.comment;
      const commentsPanel = document.getElementById(`comments-panel${i}`);
      const newParagraph = document.createElement("p");
      const uniqueId = generateUniqueId(5);
      newParagraph.id = `comment-paragraph${i}${uniqueId}`;
      newParagraph.innerHTML = `💬 <a href="/userProfile/${user.id}"> ${user.username} </a>: ${comment}`;
      commentsPanel.appendChild(newParagraph);
      addRemoveCommentForm(i, uniqueId, user, photoId, comment);
    } else {
      alert(`Error adding comment to the photo`);
    }
  } catch (err) {
    console.log(`Error: ${err}`);
    alert("Error adding comment to the photo");
  }

  return false;
};

const handleRemoveCommentFormSubmit = async (event, i, j) => {
  event.preventDefault();

  const form = document.getElementById(`removeCommentForm${i}${j}`);
  const userId = form.userId.value;
  const photoId = form.photoId.value;
  const comment = form.comment.value;

  try {
    const response = await fetch("/api/comments/remove", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, photoId, comment }),
    });

    if (response.ok) {
      const commentResponse = await response.json();
      const user = commentResponse.user;
      const comment = commentResponse.comment;

      const commentParagaraph = document.getElementById(
        `comment-paragraph${i}${j}`
      );
      if (commentParagaraph) {
        commentParagaraph.remove();
      } else {
        const elements = document.querySelectorAll(`#comment-detail${i}${j} p`);
        elements.forEach((element) => {
          if (
            element.innerHTML.includes(
              `💬 <a href="/userProfile/${user.id}">${user.username}</a>:`
            ) ||
            element.innerHTML.includes(` ${comment} `)
          ) {
            element.remove();
          }
        });
      }

      const commentDeleteButton = document.getElementById(
        `comment-delete-button${i}${j}`
      );
      commentDeleteButton.remove();
    } else {
      alert(`Error removing comment from the photo`);
    }
  } catch (err) {
    console.log(`Error: ${err}`);
    alert("Error removing comment from the photo");
  }

  return false;
};

function addRemoveCommentForm(i, j, user, photoId, comment) {
  const form = document.createElement("form");
  form.id = `removeCommentForm${i}${j}`;
  form.onsubmit = function (event) {
    return handleRemoveCommentFormSubmit(event, i, j);
  };

  const formGroup = document.createElement("div");
  formGroup.className = "form-group";

  const userIdInput = document.createElement("input");
  userIdInput.type = "text";
  userIdInput.className = "form-control";
  userIdInput.name = "userId";
  userIdInput.value = user.id;
  userIdInput.hidden = true;

  const photoIdInput = document.createElement("input");
  photoIdInput.type = "text";
  photoIdInput.className = "form-control";
  photoIdInput.name = "photoId";
  photoIdInput.value = photoId;
  photoIdInput.hidden = true;

  const commentInput = document.createElement("input");
  commentInput.type = "text";
  commentInput.className = "form-control";
  commentInput.name = "comment";
  commentInput.value = comment;
  commentInput.hidden = true;

  formGroup.appendChild(userIdInput);
  formGroup.appendChild(photoIdInput);
  formGroup.appendChild(commentInput);

  const button = document.createElement("button");
  button.type = "submit";
  button.id = `comment-delete-button${i}${j}`;
  button.className = "comment-delete-button";
  button.innerHTML = `<svg viewBox="0 0 448 512" class="deleteCommentSvgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>`;

  form.appendChild(formGroup);
  form.appendChild(button);

  const commentsPanel = document.getElementById(`comments-panel${i}`);
  commentsPanel.appendChild(form);
}

function generateUniqueId(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
