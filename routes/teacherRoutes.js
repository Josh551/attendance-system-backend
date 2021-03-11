import express from 'express';
const router = express.Router();
import {
  authTeacher,
  registerTeacher,
  getTeacherProfile,
  getTeacherDetails,
  getTeachers,
  deletedTeacher,
} from '../controllers/teacherController.js';
import { protect, teacher, admin } from '../middleware/authMiddleware.js';

router.post('/login', authTeacher);
router.route('/register').post(protect, admin, registerTeacher);
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));
router.route('/profile').get(protect, teacher, getTeacherDetails);
router
  .route('/:id')
  .get(protect, admin, getTeacherProfile)
  .delete(protect, admin, deletedTeacher);
router.get('/', getTeachers);
export default router;

//1.
//2.
