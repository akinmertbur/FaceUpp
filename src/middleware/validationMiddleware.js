// src/middleware/validationMiddleware.js
import { check, validationResult } from "express-validator";

export const validateCreateUser = [
  check("username").notEmpty().withMessage("Username is required"),
  check("email").isEmail().withMessage("Valid email is required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateEditBio = [
  check("userId").notEmpty().withMessage("User ID is required"),
  check("bioText").notEmpty().withMessage("Bio text cannot be empty"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateEditUsername = [
  check("userId").notEmpty().withMessage("User ID is required"),
  check("username").notEmpty().withMessage("Username cannot be empty"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateEditEmail = [
  check("userId").notEmpty().withMessage("User ID is required"),
  check("email").isEmail().withMessage("Valid email is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateEditPassword = [
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateProfilePicture = [
  check("userId").notEmpty().withMessage("User ID is required"),
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    next();
  },
];

// Photo validations
export const validateAddPhoto = [
  check("userId").notEmpty().withMessage("User ID is required"),
  check("photo").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("No file uploaded");
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
