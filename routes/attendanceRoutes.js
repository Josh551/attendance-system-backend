import express from 'express';
const router = express.Router();
import {
  enterAttendance,
  getAttendanceByClass,
  getAttendanceLimited,
} from '../controllers/attendanceController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/register').post(protect, enterAttendance);
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));
router.route('/byClass/:class_id').get(protect, getAttendanceByClass);
router.route('/byClass/lm/:class_id').get(protect, getAttendanceLimited);
export default router;
