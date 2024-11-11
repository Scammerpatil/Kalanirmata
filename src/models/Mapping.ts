import mongoose, { Schema } from "mongoose";

const TeacherSubjectMappingSchema = new Schema({
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  subjectId: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
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
  department: {
    type: String,
    required: true,
  },
});

const TeacherSubjectMappingModel =
  mongoose.models.TeacherSubjectMapping ||
  mongoose.model("TeacherSubjectMapping", TeacherSubjectMappingSchema);

export default TeacherSubjectMappingModel;
