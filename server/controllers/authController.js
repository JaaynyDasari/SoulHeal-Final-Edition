// controllers/authController.js - UPDATED SYNTAX
import User from '../models/User.js'; // Changed - Added .js extension

// Helper function (keep as is, it's not exported directly)
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode)
        .json({
            success: true,
            token: token,
            user: {
                id: user._id,
                email: user.email
            }
        });
};

// @desc    Register/Sign up user
// @route   POST /api/auth/signup
export const signup = async (req, res, next) => { // Changed: Use export const
    const { email, password } = req.body;
    try {
        if (!email || !password) {
             return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }
         if (password.length < 6) {
             return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
        }
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists with that email' });
        }
        user = await User.create({
            email,
            password,
        });
         res.status(201).json({ success: true, message: 'User registered successfully. Please log in.' });
    } catch (error) {
        console.error("Signup Error:", error);
        if (error.code === 11000) {
             return res.status(400).json({ success: false, message: 'User already exists with that email' });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ success: false, message: messages.join('. ') });
        }
        res.status(500).json({ success: false, message: 'Server Error during signup' });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
export const login = async (req, res, next) => { // Changed: Use export const
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        sendTokenResponse(user, 200, res);
    } catch (error) {
        console.error("Login Error:", error);
         res.status(500).json({ success: false, message: 'Server Error during login' });
    }
};