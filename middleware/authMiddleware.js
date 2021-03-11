import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Admin from '../models/adminModel.js';
import Teacher from '../models/teacherModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, 'secretOrKey');

      let userData =
        (await Admin.findById(decoded.id).select('-password')) ||
        (await Teacher.findById(decoded.id).select('-password'));
      if (!userData) {
        res.status(401);
        throw new Error('Not authorized, Not Admin');
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const admin = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, 'secretOrKey');

      let adminData = await Admin.findById(decoded.id).select('-password');
      if (!adminData) {
        res.status(401);
        throw new Error('Not authorized, Not Admin');
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error(error.message);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const teacher = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, 'secretOrKey');

      let teacherData = await Teacher.findById(decoded.id).select('-password');
      if (!teacherData) {
        res.status(401);
        throw new Error('Not authorized, Not teacher');
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error(error.message);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});
export { protect, admin, teacher };
