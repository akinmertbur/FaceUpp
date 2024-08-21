"use strict";
import {
  validateBioForm,
  validateUsernameForm,
  validateEmailForm,
  validatePasswordForm,
  validateAddProfilePictureForm,
  validateAddCommentForm,
  validateEditCaptionForm,
} from "./formHelpers.js";

export const handleEditCaptionFormSubmit = async (event, i) => {
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

    const updatedCaption = await response.json();
    if (response.ok) {
      // Update the caption display area with the new caption
      document.getElementById(`photo-bio${i}`).innerText =
        updatedCaption.caption;

      handleHideCaption(i, updatedCaption.caption);
    } else {
      if (response.status === 500) {
        alert(`Server Error: ${updatedCaption.message}`);
      } else {
        alert(`Error updating caption: ${updatedCaption.message}`);
      }
    }
  } catch (err) {
    console.log(`Error: ${err}`);
    alert("Error updating caption");
  }

  return false; // Ensure the form doesn't trigger a page reload
};

export const handleEditBioFormSubmit = async (event) => {
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

    const updatedBio = await response.json();
    if (response.ok) {
      // Update the bio display area with the new bio
      document.getElementById("user-bio").innerText = updatedBio.bio;
    } else {
      if (response.status === 500) {
        alert(`Server Error: ${updatedBio.message}`);
      } else {
        alert(`Error updating user bio: ${updatedBio.message}`);
      }
    }
  } catch (err) {
    console.log(`Error: ${err}`);
    alert("Error updating user bio");
  }

  return false; // Ensure the form doesn't trigger a page reload
};

export const handleEditUsernameFormSubmit = async (event) => {
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

    const updatedUsername = await response.json();
    if (response.ok) {
      document.getElementById("username").innerText = updatedUsername.username;
    } else {
      if (response.status === 500) {
        alert(`Server Error: ${updatedUsername.message}`);
      } else {
        alert(`Error updating username: ${updatedUsername.message}`);
      }
    }
  } catch (err) {
    console.log(`Error: ${err}`);
    alert("Error updating username");
  }

  return false; // Ensure the form doesn't trigger a page reload
};

export const handleEditEmailFormSubmit = async (event) => {
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
      if (response.status === 500) {
        alert(`Server Error: ${updatedEmail.message}`);
      } else {
        alert(`Error updating email: ${updatedEmail.message}`);
      }
    }
  } catch (err) {
    console.log(`Error: ${err}`);
    alert("Error updating email");
  }

  return false; // Ensure the form doesn't trigger a page reload
};

export const handleEditProfilePictureFormSubmit = async (event) => {
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
      if (response.status === 500) {
        alert(`Server Error: ${updatedProfilePicture.message}`);
      } else {
        alert(
          `Error updating profile picture: ${updatedProfilePicture.message}`
        );
      }
    }
  } catch (err) {
    console.log(`Error: ${err}`);
    alert("Error updating profile picture");
  }

  return false; // Ensure the form doesn't trigger a page reload
};

export const handleEditPasswordFormSubmit = async (event) => {
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
      if (response.status === 500) {
        alert(`Server Error: ${updatedPassword.message}`);
      } else {
        alert(`Error updating password: ${updatedPassword.message}`);
      }
    }
  } catch (err) {
    console.log(`Error: ${err}`);
    alert("Error updating password");
  }

  return false; // Ensure the form doesn't trigger a page reload
};

export const handleLikeFormSubmit = async (event, i) => {
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

      const likeResponse = await response.json();
      if (response.ok) {
        const user = likeResponse.user;
        addRemoveUserToPanel(true, user, i);
        likeUnlikeBtnChange(true, likeButton, i);
      } else {
        if (response.status === 500) {
          alert(`Server Error: ${likeResponse.message}`);
        } else {
          alert(`Error like the photo: ${likeResponse.message}`);
        }
      }
    } catch (err) {
      console.log(`Error: ${err}`);
      alert("Error like the photo");
    }
  }

  return false; // Ensure the form doesn't trigger a page reload
};

export const handleUnlikeFormSubmit = async (event, i) => {
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

      const unlikeResponse = await response.json();
      if (response.ok) {
        const user = unlikeResponse.user;
        addRemoveUserToPanel(false, user, i);
        likeUnlikeBtnChange(false, dislikeButton, i);
      } else {
        if (response.status === 500) {
          alert(`Server Error: ${unlikeResponse.message}`);
        } else {
          alert(`Error unlike the photo: ${unlikeResponse.message}`);
        }
      }
    } catch (err) {
      console.log(`Error: ${err}`);
      alert("Error unlike the photo");
    }
  }

  return false;
};

export const handleAddCommentFormSubmit = async (event, i) => {
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

    const commentResponse = await response.json();
    if (response.ok) {
      const user = commentResponse.user;
      const comment = commentResponse.comment;
      const uniqueId = generateUniqueId(5);

      addCommentParagraphAndRemoveCommentForm(
        i,
        uniqueId,
        user,
        photoId,
        comment
      );
    } else {
      if (response.status === 500) {
        alert(`Server Error: ${commentResponse.message}`);
      } else {
        alert(`Error adding comment to the photo: ${commentResponse.message}`);
      }
    }
  } catch (err) {
    console.log(`Error: ${err}`);
    alert("Error adding comment to the photo");
  }

  return false;
};

export const handleRemoveCommentFormSubmit = async (event, i, j) => {
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

    const commentResponse = await response.json();
    if (response.ok) {
      const commentDetail = document.getElementById(`commentDetail${i}${j}`);

      if (commentDetail) {
        commentDetail.remove();
      } else {
        const comment_detail = document.getElementById(
          `comment-detail${i}${j}`
        );

        comment_detail.remove();
      }
    } else {
      if (response.status === 500) {
        alert(`Server Error: ${commentResponse.message}`);
      } else {
        alert(
          `Error removing comment from the photo: ${commentResponse.message}`
        );
      }
    }
  } catch (err) {
    console.log(`Error: ${err}`);
    alert("Error removing comment from the photo");
  }

  return false;
};

export const handleFollowFormSubmit = async (event) => {
  event.preventDefault();

  const form = document.getElementById(`followForm`);
  const userId = form.userId.value;

  const followButton = document.getElementById("followButton");

  if (followButton.textContent === "Unfollow") {
    form.id = `unfollowForm`;
    followButton.id = `unfollowButton`;
    await handleUnfollowFormSubmit(event);
    form.id = `followForm`;
    followButton.id = `followButton`;
  } else {
    try {
      const response = await fetch("/api/following/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const followResponse = await response.json();
      if (response.ok) {
        const user = followResponse.user;
        const followersContainer = document.getElementById(
          "followers-container"
        );
        const followersDetail = document.getElementById("followers-detail");

        if (followersDetail) {
          const newParagraph = document.createElement("li");
          newParagraph.innerHTML = `<a href="/userProfile/${user.id}">${user.username}</a>`;

          followersDetail.appendChild(newParagraph);
        } else {
          const newParagraph = document.createElement("ul");
          newParagraph.innerHTML = `<li><a href="/userProfile/${user.id}">${user.username}</a></li>`;
          followersContainer.appendChild(newParagraph);
        }

        followButton.textContent = "Unfollow";

        const followersButton = document.getElementById(`followers-button`);
        const num = Number(followersButton.textContent.split(" ")[1]);
        followersButton.textContent = `Followers ${num + 1}`;
      } else {
        if (response.status === 500) {
          alert(`Server Error: ${followResponse.message}`);
        } else {
          alert(`Error following the user: ${followResponse.message}`);
        }
      }
    } catch (err) {
      console.log(`Error: ${err}`);
      alert("Error following the user");
    }
  }

  return false;
};

export const handleUnfollowFormSubmit = async (event) => {
  event.preventDefault();

  const form = document.getElementById(`unfollowForm`);
  const userId = form.userId.value;

  const unfollowButton = document.getElementById("unfollowButton");

  if (unfollowButton.textContent === "Follow") {
    form.id = `followForm`;
    unfollowButton.id = `followButton`;
    await handleFollowFormSubmit(event);
    form.id = `unfollowForm`;
    unfollowButton.id = `unfollowButton`;
  } else {
    try {
      const response = await fetch("/api/following/unfollow", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const unfollowResponse = await response.json();
      if (response.ok) {
        const user = unfollowResponse.user;

        const followersDetail = document.getElementById("followers-detail");

        if (followersDetail) {
          const elements = document.querySelectorAll(`#followers-detail li`);
          elements.forEach((element) => {
            if (
              element.innerHTML.includes(
                `<a href="/userProfile/${user.id}">${user.username}</a>`
              )
            ) {
              element.remove();
            }
          });
        } else {
          const elements = document.querySelectorAll(`#followers-container ul`);
          elements.forEach((element) => {
            if (
              element.innerHTML.includes(
                `<li><a href="/userProfile/${user.id}">${user.username}</a></li>`
              )
            ) {
              element.remove();
            }
          });
        }

        unfollowButton.textContent = "Follow";

        const followersButton = document.getElementById(`followers-button`);
        const num = Number(followersButton.textContent.split(" ")[1]);
        followersButton.textContent = `Followers ${num - 1}`;
      } else {
        if (response.status === 500) {
          alert(`Server Error: ${unfollowResponse.message}`);
        } else {
          alert(`Error unfollowing the user: ${unfollowResponse.message}`);
        }
      }
    } catch (err) {
      console.log(`Error: ${err}`);
      alert("Error unfollowing the user");
    }
  }

  return false;
};

function addCommentParagraphAndRemoveCommentForm(i, j, user, photoId, comment) {
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

  const newDiv = document.createElement("div");
  newDiv.classList.add("comment-detail");
  newDiv.id = `commentDetail${i}${j}`;

  const newParagraph = document.createElement("p");
  newParagraph.id = `comment-paragraph${i}${j}`;
  newParagraph.innerHTML = `💬 <a href="/userProfile/${user.id}"> ${user.username} </a>: ${comment}`;

  newDiv.appendChild(newParagraph);
  newDiv.appendChild(form);
  commentsPanel.appendChild(newDiv);
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

const likeUnlikeBtnChange = (like, btn, i) => {
  const likesCount = document.getElementById(`likes-count${i}`);
  const num = Number(likesCount.textContent.split(" ")[0]);

  if (!like) {
    likesCount.textContent = `${num - 1} Likes`;
    btn.textContent = "Like";
    btn.classList.remove("liked");
  } else {
    likesCount.textContent = `${num + 1} Likes`;
    btn.textContent = "Liked";
    btn.classList.add("liked");
  }
};

const addRemoveUserToPanel = (like, user, i) => {
  const likesPanel = document.getElementById(`likes-panel${i}`);

  if (!like) {
    const elements = likesPanel.querySelectorAll("p");

    elements.forEach((element) => {
      if (
        element.innerHTML.includes(
          `🩷 <a href="/userProfile/${user.id}">${user.username}</a>`
        )
      ) {
        element.remove();
      }
    });
  } else {
    const newParagraph = document.createElement("p");
    newParagraph.innerHTML = `🩷 <a href="/userProfile/${user.id}">${user.username}</a>`;
    likesPanel.appendChild(newParagraph);
  }
};

const handleHideCaption = (i, caption) => {
  const container = document.getElementById(`hide-info-container${i}`);
  const element = container.querySelector("p");

  if (caption.toLowerCase() === "hide") {
    if (!element) {
      const newParagraph = document.createElement("p");
      newParagraph.id = `hide-info${i}`;
      newParagraph.innerHTML = ` ^^ HIDDEN PHOTO ^^ `;
      container.appendChild(newParagraph);
    }
  } else {
    if (element) {
      element.remove();
    }
  }
};
