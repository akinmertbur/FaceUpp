"use strict";
import {
  handleLikeFormSubmit,
  handleUnlikeFormSubmit,
  handleAddCommentFormSubmit,
  handleRemoveCommentFormSubmit,
} from "./helpers/apiHelpers.js";

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

window.toggleLikesPanel = toggleLikesPanel;
window.toggleCommentsPanel = toggleCommentsPanel;

window.handleLikeFormSubmit = handleLikeFormSubmit;
window.handleUnlikeFormSubmit = handleUnlikeFormSubmit;
window.handleAddCommentFormSubmit = handleAddCommentFormSubmit;
window.handleRemoveCommentFormSubmit = handleRemoveCommentFormSubmit;
