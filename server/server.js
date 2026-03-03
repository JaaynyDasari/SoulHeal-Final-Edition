import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js'; // <-- **** ADD THIS LINE ****
import path from 'path';
import resourceRoutes from './routes/resource.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
// --- Setup for __dirname in ES Modules ---
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

// Connect to database
connectDB();

const app = express();

// --- Middleware ---

// Enable CORS
const allowedOrigins = [
    'http://localhost:3006',
    'http://127.0.0.1:3006'
];
if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.error(`CORS Error: Origin ${origin} not allowed.`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));


// Body parser middleware
app.use(express.json());

// --- Mount Routers ---
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes); // <-- **** ADD THIS LINE ****
app.use('/api/resources', resourceRoutes);

// --- Basic Error Handling ---
// IMPORTANT: Error handling MUST come AFTER routes are mounted
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err.stack);
    if (err.message === 'Not allowed by CORS') {
       return res.status(403).json({ success: false, message: 'Not allowed by CORS' });
    }
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5001;

const server = app.listen(
    PORT,
    console.log(`Backend server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.error(`Unhandled Rejection Error: ${err.message}`);
    server.close(() => process.exit(1));
});