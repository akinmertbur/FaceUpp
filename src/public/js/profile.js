import {
  hideButtons,
  showButtons,
  toggleHideBio,
  toggleHideUsername,
  toggleHideEmail,
  toggleHidePassword,
  toggleHideProfilePicture,
  toggleLikesPanel,
  toggleCommentsPanel,
  editPhotoCaption,
  previewProfilePicture,
} from "./helpers/uiHelpers.js";
import {
  handleEditCaptionFormSubmit,
  handleEditBioFormSubmit,
  handleEditUsernameFormSubmit,
  handleEditEmailFormSubmit,
  handleEditProfilePictureFormSubmit,
  handleEditPasswordFormSubmit,
  handleLikeFormSubmit,
  handleUnlikeFormSubmit,
  handleAddCommentFormSubmit,
  handleRemoveCommentFormSubmit,
  handleFollowFormSubmit,
  handleUnfollowFormSubmit,
} from "./helpers/apiHelpers.js";

window.hideButtons = hideButtons;
window.showButtons = showButtons;
window.toggleHideBio = toggleHideBio;
window.toggleHideUsername = toggleHideUsername;
window.toggleHideEmail = toggleHideEmail;
window.toggleHidePassword = toggleHidePassword;
window.toggleHideProfilePicture = toggleHideProfilePicture;
window.toggleLikesPanel = toggleLikesPanel;
window.toggleCommentsPanel = toggleCommentsPanel;
window.editPhotoCaption = editPhotoCaption;
window.previewProfilePicture = previewProfilePicture;

window.handleEditCaptionFormSubmit = handleEditCaptionFormSubmit;
window.handleEditBioFormSubmit = handleEditBioFormSubmit;
window.handleEditUsernameFormSubmit = handleEditUsernameFormSubmit;
window.handleEditEmailFormSubmit = handleEditEmailFormSubmit;
window.handleEditProfilePictureFormSubmit = handleEditProfilePictureFormSubmit;
window.handleEditPasswordFormSubmit = handleEditPasswordFormSubmit;
window.handleLikeFormSubmit = handleLikeFormSubmit;
window.handleUnlikeFormSubmit = handleUnlikeFormSubmit;
window.handleAddCommentFormSubmit = handleAddCommentFormSubmit;
window.handleRemoveCommentFormSubmit = handleRemoveCommentFormSubmit;
window.handleFollowFormSubmit = handleFollowFormSubmit;
window.handleUnfollowFormSubmit = handleUnfollowFormSubmit;
