import mongoose from 'mongoose';

const attendanceSchema = mongoose.Schema(
  {
    classes: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'class',
      required: true,
    },
    absent: [
      {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'students',
        required: true,
      },
    ],
    expire_at: { type: Date, default: Date.now, expires: '180d' },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model('attendance', attendanceSchema);

export default Attendance;
