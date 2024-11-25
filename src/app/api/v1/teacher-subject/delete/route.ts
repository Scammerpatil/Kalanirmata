import TeacherSubjectMappingModel from "@/models/Mapping";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { _id } = await req.json();
  try {
    const assignment = await TeacherSubjectMappingModel.findByIdAndDelete(_id);
    return NextResponse.json(assignment, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
