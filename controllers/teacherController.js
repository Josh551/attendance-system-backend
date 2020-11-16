import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"
import Teacher from "../models/teacherModel.js"
import Admin from "../models/adminModel.js"

const authTeacher = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const teacher = await Teacher.findOne({ email })

  if (teacher) {
    res.json({
      teacher,
    })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

const registerTeacher = asyncHandler(async (req, res) => {
  const { empId, email, fullName, password } = req.body

  const teacherExists = await Teacher.findOne({ email })

  if (teacherExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  const teacher = await Teacher.create({
    empId,
    email,
    fullName,
    password,
    addedBy: req.admin._id,
  })
  const createdTeacher = await teacher.save()
  if (createdTeacher) {
    res.status(201).json({
      teacher,
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

const getTeachers = asyncHandler(async (req, res) => {
  const teachers = await Teacher.find({}).populate('admin', 'empId fullname')
  res.json(teachers)
})

const getTeacherProfile = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id).populate(
    "admin",
    "empId fullName"
  )

  if (teacher) {
    res.json({
      teacher,
    })
  } else {
    res.status(404)
    throw new Error("Teacher not found")
  }
})

const deletedTeacher = asyncHandler(async (req, res) => {
  const teachers = await Teacher.findById(req.params.id)

  if (teachers) {
    await teacher.remove()
    res.json({ message: "Teacher removed by admin" })
  } else {
    res.status(404)
    throw new Error("Teacher not found")
  }
})

export { authTeacher, registerTeacher,getTeachers, getTeacherProfile,deletedTeacher }
