import express from "express";
const router = express.Router();
import {
  enteredClasses,
  deletedClasses,
  getClasses
} from "../controllers/classController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/add").post(protect, enteredClasses);
router.route('/:id').delete(protect, deletedClasses);
router.route("/classes").get(protect,getClasses)
export default router;
