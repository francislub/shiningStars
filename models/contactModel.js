import mongoose from "mongoose";

const newsLetterSchema = new mongoose.Schema({
    newsemail: {
        type: String,
        required: [true, 'Please provide your email'],
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const newsLetter = mongoose.models.newsLetter || mongoose.model('newsLetter', newsLetterSchema);

export default newsLetter;
