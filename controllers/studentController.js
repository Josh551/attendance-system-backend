import asyncHandler from "express-async-handler";
import Student from "../models/studentModel.js";

const registerStudent = asyncHandler(async (req, res) => {
  const { usn,email,fullName,images} = req.body

  const studentExists = await Student.findOne({ email })

  if (studentExists) {
    res.status(400)
    throw new Error('Student already exists')
  }

  const student = await Student.create({
    classes,
    usn,
    email,
    fullName,
    images,
    addedBy:req.admin._id,
  })

  if (student) {
    res.status(201).json({
      student
    })
  } else {
    res.status(400)
    throw new Error('Invalid student data')
  }
})

const getStudentProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id)

  if (student) {
    res.json({
      student
    });
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
});

export { registerStudent, getStudentProfile }
