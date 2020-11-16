import express from 'express';
const router = express.Router();
import {
  authTeacher,
  registerTeacher,
  getTeacherProfile,
  getTeachers,
  deletedTeacher,
} from '../controllers/teacherController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/login', authTeacher);
router.route('/register').post(protect, registerTeacher);
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));
router
  .route('/:id')
  .get(protect, getTeacherProfile)
  .delete(protect, deletedTeacher);
router.get('/', getTeachers);
export default router;

//1.
//2.
