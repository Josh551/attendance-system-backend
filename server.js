import express from "express";
import connectDB from "./config/keys.js";
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import dotenv from "dotenv";
import path from "path";

const app = express();

dotenv.config();
connectDB();
app.use(express.json());

import adminRoutes from './routes/adminRoutes.js'

const __dirname = path.resolve();
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});


app.use('/api/admin', adminRoutes)

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
