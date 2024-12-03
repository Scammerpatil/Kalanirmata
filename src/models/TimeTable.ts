import mongoose from "mongoose";

const TimetableSchema = new mongoose.Schema({
  division: { type: String, required: true },
  year: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: String, required: true },
  timetable: { type: [[String]], required: true },
  createdAt: { type: Date, default: Date.now },
});

export const TimetableModel =
  mongoose.models.Timetable || mongoose.model("Timetable", TimetableSchema);
