import express from "express";
const router = express.Router();
import { authAdmin, getAdminProfile } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/login", authAdmin);
router.route("/profile").get(protect, getAdminProfile);

export default router;
