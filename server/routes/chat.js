// routes/chat.js  <- THIS IS THE FILE WE NEED TO CHECK

import express from 'express';
import { handleChat } from '../controllers/chatController.js'; // Path relative to routes/chat.js

const router = express.Router();

// Handles POST requests to /api/chat/
router.post('/', handleChat); 

export default router; 