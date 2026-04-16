import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
    sleep: { type: Number, required: true },
    work: { type: Number, required: true },
    stress: { type: Number, required: true },
    score: { type: Number, required: true },
    riskLevel: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Record', recordSchema);
