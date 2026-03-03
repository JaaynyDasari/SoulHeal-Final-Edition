import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
    category: { type: String, required: true }, 
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    externalLink: { type: String },
    author: { type: String }, 
    metadata: {
        email: String,
        phone: String,
        location: String,
        steps: [String] 
    }
}, { timestamps: true });

export default mongoose.model('Resource', resourceSchema);