import express from 'express';
import {
  authUser,
  logoutUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUserById,
  getUsers,
  deleteUser,
  updateUser
} from '../controllers/userController.js';
import { Admin, protect } from '../middleware/auth.js';


const router = express.Router();

// Public routes
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.post('/', registerUser);

// Private routes (you’ll add auth middleware later)
router.get('/', protect, Admin, getUsers);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Admin routes
router.get('/:id',protect, Admin, getUserById);
router.delete('/:id',protect, Admin, deleteUser);
router.put('/:id',protect, Admin, updateUser);

export default router;
