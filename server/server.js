import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js'; 
import path from 'path';
import resourceRoutes from './routes/resource.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

// Connect to database
connectDB();

const app = express();

// --- IMPROVED CORS CONFIGURATION ---
const allowedOrigins = [
    'http://localhost:3006',
    'http://127.0.0.1:3006',
    'http://localhost:5173',
    /\.vercel\.app$/  // Correctly handles any Vercel URL
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        
        // Check if origin is in the allowed list or matches regex
        const isAllowed = allowedOrigins.some((allowed) => {
            if (allowed instanceof RegExp) return allowed.test(origin);
            return allowed === origin;
        });

        if (isAllowed) {
            callback(null, true);
        } else {
            console.error(`CORS Error: Origin ${origin} not allowed.`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests for all routes
app.options('*', cors());

// Body parser middleware
app.use(express.json());

// --- Mount Routers ---
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes); 
app.use('/api/resources', resourceRoutes);

// --- Basic Error Handling ---
app.use((err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
       return res.status(403).json({ success: false, message: 'CORS Error: Origin not allowed' });
    }
    console.error("Unhandled Error:", err.stack);
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