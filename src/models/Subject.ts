import { Subject } from "./../types/Subject.d";
import mongoose, { Schema } from "mongoose";

const SubjectSchema = new Schema({
  subjectId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  shortCutName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  hoursPerWeek: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["Theory", "Practical"],
    required: true,
  },
});

const SubjectModel =
  mongoose.models.Subject || mongoose.model<Subject>("Subject", SubjectSchema);

export default SubjectModel;
