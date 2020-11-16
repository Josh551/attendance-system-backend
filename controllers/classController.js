import asyncHandler from 'express-async-handler';
import Class from '../models/classModel.js';

const enteredClasses = asyncHandler(async (req, res) => {
  const { classId, subjectName, semester, section, branch } = req.body;

  const classExists = await Class.findOne({ classId });

  if (classExists) {
    res.status(400);
    throw new Error('Class already exists');
  }

  const classroom = await Class.create({
    classId,
    subjectName,
    semester,
    section,
    branch,
  });

  if (classroom) {
    res.status(201).json({
      _id: classroom._id,
      classId: classroom.classId,
      subjectName: classroom.subjectName,
      semester: classroom.semester,
      section: classroom.section,
      branch: classroom.branch,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const deletedClasses = asyncHandler(async (req, res) => {
  const classes = await Class.findById(req.params.id);

  if (classes) {
    await classes.remove();
    res.json({ message: 'Class removed by admin' });
  } else {
    res.status(404);
    throw new Error('Class not found');
  }
});

const updateClass = asyncHandler(async (req, res) => {
  const { classId, subjectName, semester, section, branch } = req.body;

  const classes = await Class.findById(req.params.id);

  if (classes) {
    classes.classId = classId;
    classes.subjectName = subjectName;
    classes.semester = semester;
    classes.section = section;
    product.branch = branch;

    const updatedProduct = await product.save();
    res.json(updatedClass);
  } else {
    res.status(404);
    throw new Error('Class not found');
  }
});
const getClass = asyncHandler(async (req, res) => {
  const cls = await Class.findById(req.params.id);
  if (cls) {
    res.json(cls);
  } else {
    res.status(404);
    throw new Error('Class not found');
  }
});

const getClasses = asyncHandler(async (req, res) => {
  const classes = await Class.find({});
  res.json(classes);
});

export { enteredClasses, deletedClasses, getClasses, getClass, updateClass };
