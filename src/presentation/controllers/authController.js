// src/presentation/controllers/authController.js
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  registerUser,
  findUserByEmail,
  findUserById,
  updateUserPassword,
} from "../../business/services/authService.js";
import { log, error } from "../../utils/logger.js";

const saltRounds = 10;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await findUserByEmail(username);
      if (!user) return done(null, false, { message: "User not found" });

      const isValidPassword = await bcrypt.compare(password, user.password);
      return done(null, isValidPassword ? user : false);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);
    done(null, user || new Error("User not found"));
  } catch (err) {
    done(err);
  }
});

const registerUserController = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    await registerUser(email, username, password);
    res.redirect(`/login?success=You are successfully register to Face App!`);
  } catch (err) {
    error(`Error registering user: ${err.message}`);
    res.status(500).redirect(`/register?errmsg=${err.message}`);
  }
};

const loginUserController = passport.authenticate("local", {
  successRedirect: "/home?success=Welcome to Face App!",
  failureRedirect: `/login?errmsg=Email or password is wrong! Please try again!`,
});

const logoutUserController = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

const editPasswordController = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const result = await updateUserPassword(userId, hash);

    if (result[0] === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    log(`Password changed for the user ID: ${userId}`);
    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    error(`Failed to change password: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

export {
  registerUserController,
  loginUserController,
  logoutUserController,
  editPasswordController,
};
