import mongoose from "mongoose";

const SliderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const SliderModel = mongoose.model("Slider", SliderSchema);

export default SliderModel;
