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
    const successMessage = req.query.success || "";
    const { username } = req.user;
    res.render("home.ejs", { username, successMessage });
  } else {
    res.redirect("/login");
  }
});

router.get("/addContent", (req, res) => {
  if (req.isAuthenticated()) {
    const errMsg = req.query.errmsg || "";
    const { id } = req.user;
    res.render("addContent.ejs", { userId: id, errMsg });
  } else {
    res.redirect("/login");
  }
});

export default router;
