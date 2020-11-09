import classes from "../data/classData.js";
import admins from "../data/adminData.js";
import students from "../data/studentData.js";
import teachers from "../data/teacherData.js";

import Class from "../models/Class.js";
import Admin from "../models/Admin.js";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";

import connectDB from "../config/keys.js";

connectDB();

const importData = async () => {
  try {
    await Class.deleteMany();

    const createdClasses = await Class.insertMany(classes);
    const createdTeachers = await Teacher.insertMany(teachers);
    const createdAdmins = await Admin.insertMany(admins);
    const createdStudents = await Student.insertMany(students);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Class.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`Error`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
