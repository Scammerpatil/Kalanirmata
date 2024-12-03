import { NextResponse } from "next/server";
import dbConfig from "@/middleware/db.config";
import { TimetableModel } from "@/models/TimeTable";

dbConfig();

export async function GET() {
  const timetable = await TimetableModel.find();
  return NextResponse.json(timetable);
}
