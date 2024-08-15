import express from "express";
import { follow, unfollow } from "../controllers/followController.js";
import { validateFollowUnfollow } from "../../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/follow", validateFollowUnfollow, follow);
router.delete("/unfollow", validateFollowUnfollow, unfollow);

export default router;
