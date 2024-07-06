// src/presentation/routes/viewRoutes.js
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/home");
  } else {
    res.render("index.ejs");
  }
});

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.get("/register", (req, res) => {
  res.render("register.ejs");
});

router.get("/home", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("home.ejs");
  } else {
    res.redirect("/login");
  }
});

export default router;
