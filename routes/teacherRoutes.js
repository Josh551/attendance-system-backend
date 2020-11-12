import express from "express"
const router = express.Router()
import {
  authTeacher,
  registerTeacher,
  getTeacherProfile,
} from "../controllers/teacherController.js"
import { protect } from "../middleware/authMiddleware.js"

router.post("/login", authTeacher)
router.route("/register").post(protect, registerTeacher)
router.get("/test", (req, res) => res.json({ msg: "Users Works" }))
router.route("/:id").get(getTeacherProfile)

export default router
