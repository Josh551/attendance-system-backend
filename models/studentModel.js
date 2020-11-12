import mongoose from "mongoose"

const studentSchema = mongoose.Schema({
  classes: [
    {
      classId: { type: String, required: true },
      subjectName: { type: String, required: true },
      semester: { type: Number, required: true },
      section: { type: String, required: true },
      branch: { type: String, required: true },
      class: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "class",
      },
    },
  ],
  usn: {
    type: String,
    unique: true,
    required: true,
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
  images: {
    type: [String],
    required: false,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    required: true,
  },
})

const Student = mongoose.model("students", studentSchema)

export default Student
