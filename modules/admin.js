import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  title: { type: String, required: true },
  name: { type: String, required: true },
  message: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const AdminModel = mongoose.model("Admin", AdminSchema);

export default AdminModel;
