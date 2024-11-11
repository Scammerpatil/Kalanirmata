import { Teacher } from "./../types/Teacher.d";
import mongoose, { Schema } from "mongoose";

const TeacherSchema = new Schema({
  teacherId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  lecturesPerWeek: {
    type: Number,
    required: true,
  },
});

const TecherModel =
  mongoose.models.Teacher || mongoose.model<Teacher>("Teacher", TeacherSchema);

export default TecherModel;
