import dbConfig from "@/middleware/db.config";
import TeacherModel from "@/models/Teacher";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function POST(req: NextRequest) {
  const {
    teacherId,
    name,
    email,
    lecturesPerWeek,
    subjects,
    gender,
    department,
  } = await req.json();
  const newTeacher = new TeacherModel({
    teacherId,
    name,
    email,
    lecturesPerWeek,
    subjects,
    gender,
    department,
  });
  try {
    await newTeacher.save();
    return NextResponse.json(
      { message: "Teacher added successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add teacher" },
      { status: 500 }
    );
  }
}
