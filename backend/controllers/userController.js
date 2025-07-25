import expressAsyncHandler from 'express-async-handler';
import User from '../model/userModel.js';
import { generateToken } from '../config/generateToken.js';
import bcrypt from 'bcryptjs';

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
export const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: "Incorrect password" });
  }

  const token = generateToken(user);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin:user.isAdmin,
    token,
  });
});

// @desc Register new user
// @route POST /api/users
// @access Public
export const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ success: false, message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isAdmin,
  });

  if (user) {
    return res.status(201).json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    return res.status(500).json({ success: false, message: "Failed to register user" });
  }
});

// @desc Logout user
// @route POST /api/users/logout
// @access Private
export const logoutUser = expressAsyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
export const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    return res.json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    return res.status(404).json({ success: false, message: "User not found" });
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
export const updateUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
export const getUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
export const getUserById = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json("User not found");
  }
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
export const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
     res.status(404).json("User not found");
  }
  if(user?.isAdmin){
      res.status(400)
      throw new Error("Cannot delete admin user")
    }
  await User.findByIdAndDelete(req.params.id)
  res.json("User deleted successfully");
});

// @desc Update user (admin)
// @route PUT /api/users/:id
// @access Private/Admin
export const updateUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json("User not found");
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  // user.isAdmin = req.body.isAdmin ?? user.isAdmin;
  user.isAdmin = Boolean(req.body.isAdmin)

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});
