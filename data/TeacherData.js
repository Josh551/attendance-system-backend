import bcrypt from 'bcryptjs'

const teachers = [
  {
    empId: 'EMP2345',
    fullName: 'Surya Prakash',
    email: 'suryaprakash@gmail.com',
    password: bcrypt.hashSync('123456', 10)
  },
];

export default teachers;
