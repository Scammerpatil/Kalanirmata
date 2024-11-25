import TeacherModel from "@/models/Teacher";
import dbConfig from "@/middleware/db.config";
import SubjectModel from "@/models/Subject";
import { NextRequest, NextResponse } from "next/server";
import TeacherSubjectMappingModel from "@/models/Mapping";

dbConfig();

export async function POST(req: NextRequest) {
  try {
    const { _id } = await req.json();
    console.log(_id);
    if (!_id) {
      return NextResponse.json(
        { message: "Subject ID is required" },
        { status: 400 }
      );
    }
    const teacher = await TeacherModel.findByIdAndDelete(_id);
    const teacherMapping = await TeacherSubjectMappingModel.deleteMany({
      teacherId: _id,
    });
    if (!teacher && !teacherMapping) {
      return NextResponse.json(
        { message: "Subject not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Subject deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete subject" },
      { status: 500 }
    );
  }
}
