import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import connectDB from './config/db.js';
import User from './models/User.js';
import BurnoutData from './models/BurnoutData.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize MongoDB
connectDB();

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
        if (!user) return res.status(400).json({ error: "Invalid" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'hackathon_secret', { expiresIn: '7d' });
        res.json({ token, user: { firstName: user.firstName, email: user.email }});
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// ==========================================
// BURNOUT LOGIC & STORAGE
// ==========================================
app.post('/api/burnout/analyze', (req, res) => {
    const { sleepHours, walkingTime, workingHours } = req.body;
    let level = "MEDIUM";
    let rawScore = 50;

    if (sleepHours < 5 && workingHours > 8) { level = "HIGH"; rawScore = 85; }
    else if (sleepHours >= 5 && sleepHours <= 7 && workingHours >= 6 && workingHours <= 8) { level = "MEDIUM"; rawScore = 55; }
    else if (sleepHours > 7 && walkingTime > 30) { level = "LOW"; rawScore = 20; }
    else {
        if(sleepHours < 6) rawScore += 20;
        if(workingHours > 9) rawScore += 20;
        if(walkingTime < 20) rawScore += 10;
        if (rawScore > 70) level = "HIGH"; else if (rawScore > 40) level = "MEDIUM"; else level = "LOW";
    }

    res.json({ burnoutLevel: level, rawScore, suggestions: level === 'HIGH' ? ["Take rest immediately"] : ["Keep it up"] });
});

app.post('/api/user/save', async (req, res) => { // Optional Auth omitted for hackathon speed test
    try {
        const entry = new BurnoutData(req.body); 
        await entry.save();
        res.json({ message: "Saved successfully", entry });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

app.get('/api/user/data', async (req, res) => {
    try {
        const history = await BurnoutData.find().sort({ createdAt: -1 }).limit(10);
        res.json({ history });
    } catch (error) { res.status(500).json({ error: error.message }); }
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
