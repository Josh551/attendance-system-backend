import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Admin from '../models/adminModel.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

// @route   POST /api/admin/login
// @access  Private/Admin
const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @route   GET /api/class/:id
// @access  Private/Admin
const getClass = asyncHandler(async (req, res) => {
  const cls = await Class.findById(req.params.id);
  if (cls) {
    res.json(cls);
  } else {
    res.status(404);
    throw new Error('Class not found');
  }
});

// @route   POST /api/admin/register
// @access  Private/Admin
const registerAdmin = asyncHandler(async (req, res) => {
  const { empId, fullname, email, password } = req.body;

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400);
    throw new Error('Admin already exists');
  }

  const admin = await Admin.create({
    empId,
    fullname,
    email,
    password,
  });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      empId: admin.empId,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @route   GET /api/admin/profile
// @access  Private
const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id);

  if (admin) {
    res.json({
      _id: admin._id,
      empId: admin.empId,
      fullname: admin.name,
      email: admin.email,
    });
  } else {
    res.status(404);
    throw new Error('Admin not found');
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const admin = await Admin.findOne({ email });
  const token = crypto.randomBytes(20).toString('hex');
  if (admin) {
    admin.resetPasswordToken = token;
    const changePassword = await admin.save();
    res.json(changePassword);
  } else {
    console.error('email not in database');
    res.status(403).send('email not in db');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: false,
    auth: {
      type: 'login',
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: process.env.ACCESS_TOKEN,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: 'noreply@gmail.com',
    to: `${admin.email}`,
    subject: 'Link To Reset Password',
    text:
      'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
      `http://localhost:5000/api/admin/reset/${token}\n\n` +
      'If you did not request this, please ignore this email and your password will remain unchanged.\n',
  };

  console.log('sending mail');

  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      console.error('there was an error: ', err);
    } else {
      console.log('here is the res: ', response);
      res.status(200).json('recovery email sent');
    }
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;

  const admin = await Admin.findOne({ resetPasswordToken: req.params.token });

  if (admin) {
    admin.password = password;

    const updatedPassword = await admin.save();
    res.json(updatedPassword);
  } else {
    res.status(404);
    throw new Error('Admin not found');
  }
});

export {
  authAdmin,
  registerAdmin,
  getAdminProfile,
  changePassword,
  resetPassword,
};
