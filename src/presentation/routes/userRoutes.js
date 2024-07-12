import express from "express";
import {
  createUser,
  editBio,
  editUsername,
  editEmail,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.post("/editBio", editBio);
router.post("/editUsername", editUsername);
router.post("/editEmail", editEmail);

export default router;
