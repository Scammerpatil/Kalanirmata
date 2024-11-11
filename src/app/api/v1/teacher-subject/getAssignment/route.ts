import TeacherSubjectMappingModel from "@/models/Mapping";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { year, department, semester } = await req.json();
  const assignments = await TeacherSubjectMappingModel.find({
    year,
    department,
    semester,
  })
    .populate("subjectId")
    .populate("teacherId");
  if (!assignments) {
    return NextResponse.json(
      { message: "No assignments found" },
      { status: 404 }
    );
  }
  return NextResponse.json(assignments);
}
