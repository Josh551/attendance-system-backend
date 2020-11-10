import mongoose from "mongoose";

const teacherSchema = mongoose.Schema({
  empId: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  classes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "class",
    required: false,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admins",
    required: false,
  },
});

const Teacher = mongoose.model("teachers", teacherSchema);

export default Teacher;
