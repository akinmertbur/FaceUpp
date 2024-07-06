// src/presentation/controllers/authController.js
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { db } from "../../data/database/dbConfig.js";

const saltRounds = 10;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const result = await db.query('SELECT * FROM "Users" WHERE email = $1', [
        username,
      ]);
      if (result && result.length > 0) {
        const user = result[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) return done(err);
          if (valid) return done(null, user);
          return done(null, false);
        });
      } else {
        return done(null, false, { message: "User not found" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await db.query('SELECT * FROM "Users" WHERE id = $1', [id]);
    if (result && result.length > 0) {
      done(null, result[0]);
    } else {
      done(new Error("User not found"));
    }
  } catch (err) {
    done(err);
  }
});

const registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const checkResult = await db.query(
      'SELECT * FROM "Users" WHERE email = $1',
      [email]
    );
    if (checkResult && checkResult.length > 0) {
      res.redirect("/login");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.insert(
            'INSERT INTO "Users" (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hash]
          );
          console.log("Insert query result:", result); // Debugging line
          if (result && result.length > 0) {
            const user = result[0][0]; // Access the user object correctly
            console.log("Logging in user:", user); // Debugging line
            req.login(user, (err) => {
              if (err) {
                console.error("Error logging in user:", err);
                res.status(500).json({
                  message: "Failed to log in user after registration",
                });
              } else {
                res.redirect("/home");
              }
            });
          } else {
            console.error("Insert result is empty");
            res.status(500).json({ message: "Failed to register user" });
          }
        }
      });
    }
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: err.message });
  }
};

const loginUser = passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/login",
});

const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

export { registerUser, loginUser, logoutUser };
