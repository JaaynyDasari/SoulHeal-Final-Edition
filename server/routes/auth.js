// routes/auth.js - UPDATED SYNTAX
import express from 'express';                   // Changed
import { signup, login } from '../controllers/authController.js'; // Changed - Added .js extension

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

export default router; // Changed