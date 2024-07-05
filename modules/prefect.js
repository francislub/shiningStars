import mongoose from "mongoose";

const PrefectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  title: { type: String, required: true },
  grade: { type: String, required: true },
  residence: { type: String, required: true },
  photo: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const PrefectModel = mongoose.model("Prefect", PrefectSchema);

export default PrefectModel;
