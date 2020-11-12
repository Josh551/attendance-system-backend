import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"
import Admin from "../models/adminModel.js"

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const admin = await Admin.findOne({ email })

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      empId: admin.empId,
      fullname: admin.name,
      email: admin.email,
      isAdmin: admin.isAdmin,
      token: generateToken(admin._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

const registerAdmin = asyncHandler(async (req, res) => {
  const { empId, fullname, email, password } = req.body

  const adminExists = await Admin.findOne({ email })

  if (adminExists) {
    res.status(400)
    throw new Error("Admin already exists")
  }

  const admin = await Admin.create({
    empId,
    fullname,
    email,
    password,
  })

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      empId: admin.empId,
      email: admin.email,
      token: generateToken(admin._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id)

  if (admin) {
    res.json({
      _id: admin._id,
      empId: admin.empId,
      fullname: admin.name,
      email: admin.email,
    })
  } else {
    res.status(404)
    throw new Error("Admin not found")
  }
})

export { authAdmin, registerAdmin, getAdminProfile }
