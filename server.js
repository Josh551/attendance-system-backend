import express from 'express';
import connectDB from './config/keys.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

import adminRoutes from './routes/adminRoutes.js';
import classRoutes from './routes/classRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';

dotenv.config();
connectDB();

const __dirname = path.resolve();

app.use('/api/admin', adminRoutes);
app.use('/api/class', classRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/attendance', attendanceRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
