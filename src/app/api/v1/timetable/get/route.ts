import { NextResponse } from "next/server";
import { TimetableModel } from "../create/route";
import dbConfig from "@/middleware/db.config";

dbConfig();

export async function GET() {
  const timetable = await TimetableModel.find();
  return NextResponse.json(timetable);
}
