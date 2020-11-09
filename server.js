import express from "express";
import connectDB from "./config/keys.js";
import dotenv from "dotenv";
import path from "path";

const app = express();

dotenv.config();
connectDB();

const __dirname = path.resolve();
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
