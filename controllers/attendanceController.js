import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Attendance from '../models/attendanceModel.js';

// @route   POST /api/attendance/register
// @access  Private/Admin
const enterAttendance = asyncHandler(async (req, res) => {
  const { classes, absent } = req.body;

  const attendance = await Attendance.create({
    classes,
    absent,
  });

  if (attendance) {
    res.status(201).json({
      attendance,
    });
  } else {
    res.status(400);
    throw new Error('Invalid attendance data');
  }
});

// @route   GET /api/attendance/byClass/:class_id
// @access  Private
const getAttendanceByClass = asyncHandler(async (req, res) => {
  const attendance = await Attendance.find({ classes: req.params.class_id });

  if (attendance) {
    res.json({
      attendance,
    });
  } else {
    res.status(404);
    throw new Error('Student not found');
  }
});

// @route   GET /api/attendance/byClass/lm/:class_id
// @access  Private
const getAttendanceLimited = asyncHandler(async (req, res) => {
  const attendance = await Attendance.find({
    classes: req.params.class_id,
  }).limit(20);

  if (attendance) {
    res.json({
      attendance,
    });
  } else {
    res.status(404);
    throw new Error('Student not found');
  }
});

export { enterAttendance, getAttendanceByClass, getAttendanceLimited };
