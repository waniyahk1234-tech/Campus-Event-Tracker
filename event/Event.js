import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    userEmail: { type: String, required: true },
    isPrivate: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model("Event", eventSchema);
