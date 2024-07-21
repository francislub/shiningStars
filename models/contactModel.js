import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        trim: true,
    },
    subject: {
        type: String,
        trim: true,
    },
    message: {
        type: String,
        required: [true, 'Please provide a message'],
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact;
