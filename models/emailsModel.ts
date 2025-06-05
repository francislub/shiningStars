import mongoose, { type Document, Schema } from "mongoose"

export interface INewsLetter extends Document {
  newsemail: string
  createdAt: Date
  isActive: boolean
}

const newsLetterSchema = new Schema<INewsLetter>({
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

// Add index for better query performance
newsLetterSchema.index({ newsemail: 1 })

const newsLetter = mongoose.models.newsLetter || mongoose.model<INewsLetter>("newsLetter", newsLetterSchema)

export default newsLetter
