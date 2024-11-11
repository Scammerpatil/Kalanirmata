import mongoose from "mongoose";
import { Subject } from "./Subject";

export interface Teacher {
  _id: mongoose.Schema.Types.ObjectId;
  teacherId?: string;
  name: string;
  department: string;
  gender: string;
  email: string;
  lecturesPerWeek: number;
}
