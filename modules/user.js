import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, required: true },
  allStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  allAdmins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Admin" }],
  allStaffs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Staff" }],
  allPrefects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Prefect" }],
  allSliders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Slider" }],
  allEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  allNews: [{ type: mongoose.Schema.Types.ObjectId, ref: "New" }],
});

const userModel = mongoose.model("User", UserSchema);

export default userModel;
