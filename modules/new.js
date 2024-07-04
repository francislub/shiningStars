import mongoose from "mongoose";

const NewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const NewModel = mongoose.model("New", NewSchema);

export default NewModel;
