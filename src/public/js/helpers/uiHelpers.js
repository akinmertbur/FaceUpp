"use strict";

export function hideButtons() {
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

export function showButtons() {
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

export function toggleHideBio() {
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

export function toggleHideUsername() {
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

export function toggleHideEmail() {
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

export function toggleHidePassword() {
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

export function toggleHideProfilePicture() {
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

export function toggleLikesPanel(i) {
  const likesPanel = document.getElementById(`likes-panel${i}`);

  if (likesPanel.classList.contains("hide")) {
    likesPanel.classList.remove("hide");
  } else {
    likesPanel.classList.add("hide");
  }
}

export function toggleCommentsPanel(i) {
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

export function editPhotoCaption(i) {
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
