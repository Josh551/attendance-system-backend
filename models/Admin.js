import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  empId: {
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
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("admins", adminSchema);

export default Admin;
