// models/User.js - UPDATED SYNTAX
import mongoose from 'mongoose'; // Changed
import bcrypt from 'bcryptjs';   // Changed
import jwt from 'jsonwebtoken'; // Changed - Import at top

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getSignedJwtToken = function() {
    if (!process.env.JWT_SECRET) {
        console.error("Error: JWT_SECRET is not defined.");
    }
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '30d'
    });
};

const User = mongoose.model('User', UserSchema); // Define User first
export default User; // Changed - Export the model