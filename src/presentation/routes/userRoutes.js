import express from "express";
import {
  createUser,
  editBio,
  editUsername,
  editEmail,
} from "../controllers/userController.js";
import {
  validateCreateUser,
  validateEditBio,
  validateEditUsername,
  validateEditEmail,
} from "../../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/", validateCreateUser, createUser);
router.post("/editBio", validateEditBio, editBio);
router.post("/editUsername", validateEditUsername, editUsername);
router.post("/editEmail", validateEditEmail, editEmail);

export default router;
