import dbConfig from "@/middleware/db.config";
import TeacherSubjectMappingModel from "@/models/Mapping";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function POST(req: NextRequest) {
  const { teacherId, subjectId, year, semester, department } = await req.json();
  try {
    const mapping = new TeacherSubjectMappingModel({
      teacherId,
      subjectId,
      year,
      semester,
      department,
    });
    const newMapping = await mapping.save();
    if (!newMapping) {
      return NextResponse.json(
        { error: "Failed to assign teacher to subject" },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: "Teacher assigned to subject" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
