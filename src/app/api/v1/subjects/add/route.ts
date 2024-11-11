import dbConfig from "@/middleware/db.config";
import SubjectModel from "@/models/Subject";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function POST(req: NextRequest) {
  const {
    subjectId,
    name,
    department,
    year,
    semester,
    shortCutName,
    hoursPerWeek,
    type,
  } = await req.json();
  const newSubject = new SubjectModel({
    subjectId,
    name,
    shortCutName,
    department,
    year,
    semester,
    hoursPerWeek,
    type,
  });
  try {
    await newSubject.save();
    return NextResponse.json(
      { message: "Subject added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to add subject" },
      { status: 500 }
    );
  }
}
