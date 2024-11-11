import dbConfig from "@/middleware/db.config";
import TeacherSubjectMappingModel from "@/models/Mapping";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function GET(req: NextRequest) {
  const mapping = await TeacherSubjectMappingModel.find()
    .populate("subjectId")
    .populate("teacherId");
  return NextResponse.json(mapping);
}
