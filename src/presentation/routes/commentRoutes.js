import express from "express";
import { addComment, removeComment } from "../controllers/commentController.js";

const router = express.Router();

router.post("/add", addComment);
router.post("/remove", removeComment);

export default router;
