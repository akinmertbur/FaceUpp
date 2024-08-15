import express from "express";
import { addComment, removeComment } from "../controllers/commentController.js";
import { validateAddRemoveComment } from "../../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/add", validateAddRemoveComment, addComment);
router.delete("/remove", validateAddRemoveComment, removeComment);

export default router;
