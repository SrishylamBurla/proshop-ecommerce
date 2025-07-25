import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('admin123', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('john123', 10),
    isAdmin: false,
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: bcrypt.hashSync('jane123', 10),
    isAdmin: false,
  },
  {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: bcrypt.hashSync('bob123', 10),
    isAdmin: false,
  },
  {
    name: 'Alice Brown',
    email: 'alice@example.com', 
    password: bcrypt.hashSync('alice123', 10),
    isAdmin: false,
  },
];

export default users;
