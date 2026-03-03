// config/db.js - UPDATED SYNTAX
import mongoose from 'mongoose'; // Changed
import dotenv from 'dotenv';     // Changed

// When using ES modules, __dirname is not available directly.
// If you need the path, use import.meta.url. For dotenv, we can specify the path relative to CWD
dotenv.config({ path: '.env' }); // Path relative to where node is run (project root)

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env file');
        }
        await mongoose.connect(process.env.MONGODB_URI); // Mongoose 6+ options are default
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

export default connectDB; // Changed