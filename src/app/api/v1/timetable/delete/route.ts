import { TimetableModel } from "@/models/TimeTable";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  try {
    const timetable = await TimetableModel.findByIdAndDelete(id);
    if (!timetable) {
      return NextResponse.json("Timetable not found.", { status: 404 });
    }
    return NextResponse.json("Timetable deleted successfully!");
  } catch (error: any) {
    return NextResponse.json("Failed to delete timetable.", { status: 500 });
  }
}
