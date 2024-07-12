// src/presentation/routes/authRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  editPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/logout", logoutUser);
router.post("/editPassword", editPassword);

export default router;
