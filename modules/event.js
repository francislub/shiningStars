import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  activity: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  place: { type: String, required: true },
  photo: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const EventModel = mongoose.model("Event", EventSchema);

export default EventModel;
