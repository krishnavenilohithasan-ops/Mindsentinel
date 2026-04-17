import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import connectDB from './config/db.js';
import User from './models/User.js';
import Record from './models/Record.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize MongoDB
connectDB();

// ==========================================
// HEALTH CHECK
// ==========================================
app.get('/', (req, res) => {
    res.json({ message: "Welcome to MindSentinel API! The brain is running." });
});

// ==========================================
// JWT MIDDLEWARE
// ==========================================
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: "Access denied" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'hackathon_secret');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid token" });
    }
};

// ==========================================
// AUTHENTICATION
// ==========================================
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ error: "Email exists" });

        const hashed = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, email, password: hashed });
        await newUser.save();
        res.status(201).json({ message: "Registered" });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        user.lastLogin = Date.now();
        await user.save();

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET || 'hackathon_secret', { expiresIn: '7d' });
        res.json({ token, user: { firstName: user.firstName, lastName: user.lastName, email: user.email, isAdmin: user.isAdmin }});
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// Admin Route to get all users
app.get('/api/admin/users', async (req, res) => {
    try {
        // Find users, select specific fields, and sort by lastLogin descending
        const users = await User.find().select('-password').sort({ lastLogin: -1 });
        res.json({ users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Helper route to quickly make a user an admin (For testing/setup)
app.post('/api/admin/make-admin', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOneAndUpdate({ email }, { isAdmin: true }, { new: true });
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({ message: `${user.firstName} is now an Admin!` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// BURNOUT LOGIC & STORAGE
// ==========================================

app.post('/api/burnout/analyze', (req, res) => {
    const { sleepHours, workingHours, walkingTime } = req.body;
    let burnoutLevel = "LOW";
    let rawScore = 30;
    let suggestions = ["Keep up your excellent routine!"];

    if (sleepHours < 5 && workingHours > 8) {
        burnoutLevel = "HIGH";
        rawScore = 85;
        suggestions = ["Critical risk. Sleep immediately.", "Reduce working hours."];
    } else if (sleepHours <= 7 && workingHours >= 6) {
        burnoutLevel = "MEDIUM";
        rawScore = 55;
        suggestions = ["Take shorter breaks.", "Balance is key."];
    }
    
    res.json({ burnoutLevel, rawScore, suggestions });
});

app.post('/api/user/save', async (req, res) => {
    try {
        const { sleepHours, workingHours, walkingTime, foodIntake, burnoutLevel, rawScore } = req.body;
        const newRecord = new Record({ 
            sleepHours, workingHours, walkingTime, foodIntake, burnoutLevel, rawScore 
        });
        await newRecord.save();
        res.status(201).json({ message: "Saved successfully", record: newRecord });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/records', async (req, res) => {
    try {
        const records = await Record.find().sort({ createdAt: -1 }).limit(10);
        res.json({ records });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==========================================
// CHATBOT ENGINE
// ==========================================
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    const m = message.toLowerCase();
    let reply = "Stay balanced!";
    
    if (m.includes("tired")) reply = "Take a short 10 minute break to reset mentally.";
    else if (m.includes("focus")) reply = "A distraction-free environment and 25-minute Pomodoro sessions work best.";
    else if (m.includes("burnout")) reply = "High workload causes burnout. Secure 8 hours of sleep!";
    
    setTimeout(() => res.json({ reply }), 1000);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 API Running on port ${PORT}`));
