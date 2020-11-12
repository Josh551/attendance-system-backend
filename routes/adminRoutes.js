import express from "express";
const router = express.Router();
import { authAdmin,  registerAdmin, getAdminProfile } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post('/login', authAdmin)
router.route('/register').post(registerAdmin)
router.get("/test", (req, res) => res.json({ msg: "Users Works" }))
router.route("/profile").get(protect, getAdminProfile)
export default router
