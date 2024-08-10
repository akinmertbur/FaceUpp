// src/presentation/routes/viewRoutes.js
import express from "express";
import {
  renderProfile,
  renderUserProfile,
  renderHome,
  renderAddContent,
  renderSearch,
  renderRegister,
  renderLogin,
} from "../controllers/viewController.js";
import { ensureAuthenticated } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
  res.redirect("/home");
});

router.get("/login", renderLogin);

router.get("/register", renderRegister);

router.get("/home", ensureAuthenticated, renderHome);

router.get("/addContent", ensureAuthenticated, renderAddContent);

router.get("/profile", ensureAuthenticated, renderProfile);

router.get("/search", ensureAuthenticated, renderSearch);

router.get("/userProfile/:userId", ensureAuthenticated, renderUserProfile);

export default router;
