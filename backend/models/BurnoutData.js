import mongoose from 'mongoose';

const burnoutDataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // False for hackathon demo speed if non-logged in
    sleepHours: { type: Number, required: true },
    walkingTime: { type: Number, required: true },
    workingHours: { type: Number, required: true },
    foodIntake: { type: String, required: true },
    burnoutLevel: { type: String, required: true },
    rawScore: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('BurnoutData', burnoutDataSchema);
