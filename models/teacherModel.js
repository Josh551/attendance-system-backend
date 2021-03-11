import mongoose from 'mongoose';

const teacherSchema = mongoose.Schema({
  empId: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: false,
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
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: 'class',
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin',
    required: true,
  },
});

const Teacher = mongoose.model('teachers', teacherSchema);

export default Teacher;
