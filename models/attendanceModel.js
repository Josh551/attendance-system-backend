import mongoose from "mongoose"

const attendanceSchema = mongoose.Schema(
  {
    classes: {
      type: Schema.Types.ObjectId,
      ref: "class",
    },
    absent: [
      {
        student: {
          type: Schema.Types.ObjectId,
          ref: "students",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Attendance = mongoose.model("attendance", attendanceSchema)

export default Attendance
