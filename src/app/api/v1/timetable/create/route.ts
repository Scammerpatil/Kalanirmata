import { NextRequest, NextResponse } from "next/server";
import dbConfig from "@/middleware/db.config";
import mongoose from "mongoose";

dbConfig();

const TimetableSchema = new mongoose.Schema({
  division: { type: String, required: true },
  year: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: String, required: true },
  timetable: { type: [[String]], required: true },
  createdAt: { type: Date, default: Date.now },
});

export const TimetableModel =
  mongoose.models.Timetable || mongoose.model("Timetable", TimetableSchema);

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const SLOTS = [
  "Slot 1",
  "Slot 2",
  "Recess",
  "Slot 3",
  "Slot 4",
  "Break",
  "Slot 5",
  "Slot 6",
];

type Subject = {
  id: string;
  name: string;
  type: "practical" | "lecture";
  hoursPerWeek: number;
  teacherName: string;
};

type DivisionData = {
  division: string;
  teachers: {
    subjectId: {
      id: string;
      name: string;
      type: "Practical" | "Lecture";
      hoursPerWeek: number;
    };
    teacherId: { name: string };
    year: string;
  }[];
};

type TimetableGrid = (string | null)[][];

function createEmptyTimetable(): TimetableGrid {
  return DAYS.map(() => Array(SLOTS.length).fill(null));
}

function calculateLectureSlots(subjects: Subject[]): number {
  return subjects
    .filter((subject) => subject.type === "lecture")
    .reduce((total, subject) => total + subject.hoursPerWeek, 0);
}

function distributeLectures(
  timetable: TimetableGrid,
  subjects: Subject[],
  availableSlots: number[]
): void {
  let lectureQueue = [...subjects.filter((s) => s.type === "lecture")];
  const maxLecturesPerDay = Math.ceil(
    calculateLectureSlots(lectureQueue) / DAYS.length
  );

  for (let day = 0; day < DAYS.length; day++) {
    let lecturesAssigned = 0;
    for (const slot of availableSlots) {
      if (lectureQueue.length === 0) break;

      const subject = lectureQueue[0];
      if (lecturesAssigned < maxLecturesPerDay && !timetable[day][slot]) {
        timetable[day][slot] = `${subject.name} | ${subject.teacherName}`;
        lecturesAssigned++;
        subject.hoursPerWeek--;

        if (subject.hoursPerWeek === 0) lectureQueue.shift();
        else lectureQueue.push(lectureQueue.shift()!);
      }
    }
  }
}

function distributePracticals(
  timetable: TimetableGrid,
  practicals: Subject[],
  availableSlots: number[]
): void {
  const practicalQueue = [...practicals];
  const batchOrder = ["Batch 1", "Batch 2", "Batch 3"];

  for (let day = 0; day < DAYS.length; day++) {
    for (const slot of availableSlots) {
      if ([2, 5].includes(slot)) continue;

      const availablePracticals = practicalQueue.filter(
        (p) => p.hoursPerWeek > 0
      );
      if (availablePracticals.length === 0) break;

      // Rotate batch order based on the day to ensure permutation
      const currentBatchOrder = batchOrder
        .slice(day % batchOrder.length)
        .concat(batchOrder.slice(0, day % batchOrder.length));

      const practicalAssignments = currentBatchOrder.map((batch, index) => {
        const practical =
          availablePracticals[index % availablePracticals.length];
        practical.hoursPerWeek--;
        return `${practical.name} | ${practical.teacherName} | ${batch}`;
      });

      timetable[day][slot] = practicalAssignments.join(" || ");
    }
  }
}

function assignProjectLectures(
  timetable: TimetableGrid,
  availableSlots: number[]
): void {
  for (let day = 0; day < DAYS.length; day++) {
    for (const slot of availableSlots) {
      if (!timetable[day][slot]) {
        timetable[day][slot] = "Project Lecture";
        break;
      }
    }
  }
}

// function saveTimetableToCSV(timetable: TimetableGrid, filePath: string): void {
//   const header = ["Day", ...SLOTS];
//   const rows = timetable.map((row, index) => [DAYS[index], ...row]);
//   const csvContent = [
//     header.join(","),
//     ...rows.map((row) => row.join(",")),
//   ].join("\n");
//   fs.writeFileSync(filePath, csvContent, "utf8");
// }

export async function POST(req: NextRequest) {
  const data = (await req.json()) as DivisionData[];

  const timetables = data.map((divisionData) => {
    const { division, teachers } = divisionData;
    const year = teachers[0].year;
    const department = teachers[0].department;
    const semester = teachers[0].semester;
    const subjects = teachers.map((t) => ({
      id: t.subjectId.id,
      name: t.subjectId.name,
      type: t.subjectId.type === "Practical" ? "practical" : "lecture",
      hoursPerWeek:
        t.subjectId.type === "Practical"
          ? t.subjectId.hoursPerWeek * 3
          : t.subjectId.hoursPerWeek,
      teacherName: t.teacherId.name,
    }));

    const practicals = subjects.filter((s) => s.type === "practical");
    const lectures = subjects.filter((s) => s.type === "lecture");
    const timetable = createEmptyTimetable();

    if (year === "Last Year Btech")
      distributePracticals(timetable, practicals, [0, 1]);
    else if (year === "Third Year Btech")
      distributePracticals(timetable, practicals, [3, 4]);
    else if (year === "Second Year Btech")
      distributePracticals(timetable, practicals, [6, 7]);

    distributeLectures(timetable, lectures, [0, 1, 3, 4, 6, 7]);
    assignProjectLectures(timetable, [6, 7]);

    return { division, year, timetable, department, semester };
  });

  try {
    for (const {
      division,
      year,
      timetable,
      department,
      semester,
    } of timetables) {
      await TimetableModel.create({
        division,
        year,
        timetable,
        department,
        semester,
      });
    }
    return NextResponse.json({
      message: "Timetables generated and saved to MongoDB.",
    });
  } catch (error: any) {
    console.error("Error saving to MongoDB:", error);
    return NextResponse.json(
      { message: "Failed to save timetables.", error: error.message },
      { status: 500 }
    );
  }
}
