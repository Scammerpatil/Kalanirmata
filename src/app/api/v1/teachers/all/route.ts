import dbConfig from "@/middleware/db.config";
import TeacherModel from "@/models/Teacher";
import { NextResponse } from "next/server";

dbConfig();

export async function GET() {
  const teachers = await TeacherModel.find();
  return NextResponse.json(teachers, { status: 200 });
}
