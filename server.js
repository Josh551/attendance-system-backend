import express from 'express';
import connectDB from './config/keys.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

import adminRoutes from './routes/adminRoutes.js';
import classRoutes from './routes/classRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';

dotenv.config();
connectDB();

const __dirname = path.resolve();
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use('/api/admin', adminRoutes);
app.use('/api/class', classRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/attendance', attendanceRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
