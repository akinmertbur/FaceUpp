import express from "express";
import {
  createUser,
  editBio,
  editUsername,
  editEmail,
  editProfilePicture,
} from "../controllers/userController.js";
import {
  validateCreateUser,
  validateEditBio,
  validateEditUsername,
  validateEditEmail,
  validateProfilePicture,
} from "../../middleware/validationMiddleware.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", validateCreateUser, createUser);
router.post("/editBio", validateEditBio, editBio);
router.post("/editUsername", validateEditUsername, editUsername);
router.post("/editEmail", validateEditEmail, editEmail);
router.post(
  "/editProfilePicture",
  upload.single("photo"),
  validateProfilePicture,
  editProfilePicture
);

export default router;
