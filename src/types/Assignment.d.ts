import { Subject } from "./Subject";
import { Teacher } from "./Teacher";

export interface Assignment {
  _id: string;
  subjectId: Subject;
  teacherId: Teacher;
  year: string;
  department: string;
  semester: string;
}
