import express from "express";
import { createUser, editBio } from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.post("/editBio", editBio);

export default router;
