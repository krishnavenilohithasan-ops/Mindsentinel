import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
    sleepHours: { type: Number, required: true },
    workingHours: { type: Number, required: true },
    walkingTime: { type: Number, required: true },
    foodIntake: { type: String, required: false },
    rawScore: { type: Number, required: true },
    burnoutLevel: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Record', recordSchema);
