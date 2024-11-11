import SubjectModel from "@/models/Subject";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;
    const id = pathname.split("/").pop();
    if (!id) {
      return NextResponse.json(
        { message: "Subject ID is required" },
        { status: 400 }
      );
    }
    const deletedSubject = await SubjectModel.findOneAndDelete({
      _id: id,
    });
    if (!deletedSubject) {
      return NextResponse.json(
        { message: "Subject not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Subject deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete subject" },
      { status: 500 }
    );
  }
}
