import express from "express"
const router = express.Router()
import {
  enteredClasses,
  deletedClasses,
  getClasses,
  getClass,
  updateClass,
} from "../controllers/classController.js"
import { protect } from "../middleware/authMiddleware.js"

router.route("/add").post(protect, enteredClasses)
router
  .route("/:id")
  .get(protect, getClass)
  .delete(protect, deletedClasses)
  .put(protect, updateClass)
router.route("/").get(protect, getClasses)
export default router
