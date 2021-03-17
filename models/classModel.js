import mongoose from 'mongoose';

const classSchema = mongoose.Schema({
  classId: {
    type: String,

    unique: true,
  },
  subjectName: {
    type: String,
  },
  semester: {
    type: Number,
  },
  section: {
    type: String,
  },
  branch: {
    type: String,
  },
});

const Class = mongoose.model('class', classSchema);

export default Class;
