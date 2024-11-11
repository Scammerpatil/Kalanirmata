import dbConfig from "@/middleware/db.config";
import TeacherModel from "@/models/Teacher";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function PUT(req: NextRequest) {
  const { updatedTeacher } = await req.json();
  const { _id } = updatedTeacher;
  try {
    const newTeacher = await TeacherModel.findByIdAndUpdate(
      _id,
      updatedTeacher
    );
    if (!newTeacher) {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Teacher updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to update teacher" },
      { status: 500 }
    );
  }
}
