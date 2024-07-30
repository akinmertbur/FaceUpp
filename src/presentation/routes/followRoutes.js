import express from "express";
import { follow, unfollow } from "../controllers/followController.js";

const router = express.Router();

router.post("/follow", follow);
router.post("/unfollow", unfollow);

export default router;
