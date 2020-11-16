import express from "express"
const router = express.Router()
import {
  registerStudent,
  getStudentProfile,
  getStudents,
} from "../controllers/studentController.js"
import { protect } from "../middleware/authMiddleware.js"

router.route("/register").post(protect, registerStudent)
router.get("/test", (req, res) => res.json({ msg: "Users Works" }))
router.route("/:id").get(protect, getStudentProfile)
router.get("/",getStudents)
export default router