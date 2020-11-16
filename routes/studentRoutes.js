import express from 'express';
const router = express.Router();
import {
  registerStudent,
  getStudentProfile,
  getStudents,
  getStudentsByClass,
} from '../controllers/studentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/register').post(protect, admin, registerStudent);
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));
router.route('/:id').get(protect, getStudentProfile);
router.get('/', getStudents);
router.route('/byClass/:class_id').get(protect, getStudentsByClass);
export default router;

//1.Given a class id,get all the students enrolled in that particular class
