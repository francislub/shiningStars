import mongoose from "mongoose"

const newsLetterSchema = new mongoose.Schema({
  newsemail: {
    type: String,
    required: [true, "Please provide your email"],
    trim: true,
    lowercase: true,
    unique: true,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
})

// Add index for better performance
newsLetterSchema.index({ newsemail: 1 }, { unique: true })

const newsLetter = mongoose.models.newsLetter || mongoose.model("newsLetter", newsLetterSchema)

export default newsLetter
