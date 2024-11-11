import dbConfig from "@/middleware/db.config";
import SubjectModel from "@/models/Subject";
import { NextRequest, NextResponse } from "next/server";

dbConfig();

export async function PUT(req: NextRequest) {
  const { updatedSubject } = await req.json();
  const { _id } = updatedSubject;
  try {
    const newSubject = await SubjectModel.findByIdAndUpdate(
      _id,
      updatedSubject
    );
    if (!newSubject) {
      return NextResponse.json(
        { message: "Subject not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Subject updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to update subject" },
      { status: 500 }
    );
  }
}
