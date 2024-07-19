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
    res.redirect("/login");
  } catch (err) {
    error(`Error registering user: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const loginUserController = passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/login",
});

const logoutUserController = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

const editPasswordController = async (req, res) => {
  const { password } = req.body;
  const userId = req.user.id;

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    await updateUserPassword(userId, hash);
    res.redirect("/profile");
  } catch (err) {
    error(`Error changing password: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

export {
  registerUserController,
  loginUserController,
  logoutUserController,
  editPasswordController,
};
