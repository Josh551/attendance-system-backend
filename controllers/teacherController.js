import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Teacher from '../models/teacherModel.js';

// @route   POST /api/teacher/login
// @access  Public
const authTeacher = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const teacher = await Teacher.findOne({ email });

  if (teacher) {
    res.json({
      token: generateToken(teacher._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @route   POST /api/teacher/register
// @access  Private/Admin
const registerTeacher = asyncHandler(async (req, res) => {
  const { empId, email, fullName, password } = req.body;

  const teacherExists = await Teacher.findOne({ email });

  if (teacherExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const teacher = await Teacher.create({
    empId,
    email,
    fullName,
    password,
    addedBy: req.admin._id,
    token: generateToken(teacher._id),
  });
  const createdTeacher = await teacher.save();
  if (createdTeacher) {
    res.status(201).json({
      teacher,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @route   GET /api/teacher/:id
// @access  Private/Admin
const getTeachers = asyncHandler(async (req, res) => {
  const teachers = await Teacher.find({}).populate('admin', 'empId fullname');
  res.json(teachers);
});

// @route   Get /api/teacher/profile
// @access  Private
const getTeacherDetails = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.teacher._id);
  if (teacher) {
    res.json(teacher);
  } else {
    res.status(404);
    throw new Error('Teacher not Found');
  }
});
// @route   GET /api/teacher/:id
// @access  Private
const getTeacherProfile = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id).populate(
    'admin',
    'empId fullName'
  );

  if (teacher) {
    res.json({
      teacher,
    });
  } else {
    res.status(404);
    throw new Error('Teacher not found');
  }
});

// @route   DELETE /api/teacher/:id
// @access  Private
const deletedTeacher = asyncHandler(async (req, res) => {
  const teachers = await Teacher.findById(req.params.id);

  if (teachers) {
    await teacher.remove();
    res.json({ message: 'Teacher removed by admin' });
  } else {
    res.status(404);
    throw new Error('Teacher not found');
  }
});

export {
  authTeacher,
  registerTeacher,
  getTeachers,
  getTeacherProfile,
  getTeacherDetails,
  deletedTeacher,
};
