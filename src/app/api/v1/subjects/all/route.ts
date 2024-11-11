import dbConfig from "@/middleware/db.config";
import SubjectModel from "@/models/Subject";
import { NextResponse } from "next/server";

dbConfig();
export async function GET() {
  const subjects = await SubjectModel.find();
  return NextResponse.json(subjects, { status: 200 });
}
