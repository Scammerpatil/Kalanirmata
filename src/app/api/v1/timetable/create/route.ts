import { NextRequest, NextResponse } from "next/server";
import dbConfig from "@/middleware/db.config";
import mongoose from "mongoose";
import { TimetableModel } from "@/models/TimeTable";

// MongoDB configuration
dbConfig();

var i = 0;

// Constants
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

// Types
type Subject = {
  id: string;
  name: string;
  type: "practical" | "lecture";
  hoursPerWeek: number;
  teacherName: string;
  availability: boolean[][];
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
    availability: boolean[][];
    year: string;
    department: string;
    semester: string;
  }[];
};

type TimetableGrid = (string | null)[][];

// Helper Functions
function createEmptyTimetable(): TimetableGrid {
  return DAYS.map(() => Array(SLOTS.length).fill(null));
}

function calculateLectureSlots(subjects: Subject[]): number {
  return subjects
    .filter((subject) => subject.type === "lecture")
    .reduce((total, subject) => total + subject.hoursPerWeek, 0);
}

function isSlotAvailable(
  timetable: TimetableGrid,
  day: number,
  slot: number
): boolean {
  return timetable[day][slot] === null;
}

function isTeacherAvailable(
  availability: boolean[][],
  day: number,
  slot: number
): boolean {
  return availability[day]?.[slot] ?? false;
}

function distributeLectures(
  timetable: TimetableGrid,
  subjects: Subject[],
  availableSlots: number[]
): void {
  const lectureQueue = [...subjects.filter((s) => s.type === "lecture")];
  const maxLecturesPerDay = Math.ceil(
    calculateLectureSlots(lectureQueue) / DAYS.length
  );

  for (let day = 0; day < DAYS.length; day++) {
    let lecturesAssigned = 0;

    for (const slot of availableSlots) {
      if (lectureQueue.length === 0) break;

      const subject = lectureQueue[0];

      if (
        lecturesAssigned < maxLecturesPerDay &&
        isSlotAvailable(timetable, day, slot) &&
        isTeacherAvailable(subject.availability, day, slot)
      ) {
        // Assign the lecture
        timetable[day][slot] = `${subject.name} | ${subject.teacherName}`;
        lecturesAssigned++;
        subject.hoursPerWeek--;

        // Reorganize queue if hours are left
        if (subject.hoursPerWeek === 0) {
          lectureQueue.shift(); // Remove completed lecture
        } else {
          lectureQueue.push(lectureQueue.shift()!); // Move to the end of the queue
        }
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
  const teacherSlotMap: Record<string, Set<string>> = {};
  var day = i == 2 ? 1 : 0;
  console.log("Day: ", day);
  console.log("i: ", i);

  for (; day < DAYS.length; day += 2) {
    for (const slot of availableSlots) {
      if ([2, 5].includes(slot)) continue;

      const availablePracticals = practicalQueue.filter(
        (p) => p.hoursPerWeek > 0
      );
      if (availablePracticals.length === 0) break;

      // Rotate batch order to ensure fair distribution across days
      const currentBatchOrder = batchOrder
        .slice(day % batchOrder.length)
        .concat(batchOrder.slice(0, day % batchOrder.length));

      const practicalAssignments = currentBatchOrder.map((batch, index) => {
        const practical =
          availablePracticals[index % availablePracticals.length];
        const teacherName = practical.teacherName;

        if (
          practical.hoursPerWeek > 0 &&
          isSlotAvailable(timetable, day, slot) &&
          isTeacherAvailable(practical.availability, day, slot) &&
          !teacherSlotMap[teacherName]?.has(`${day}-${slot}`)
        ) {
          // Decrement hours and update teacher slot map
          practical.hoursPerWeek--;
          if (!teacherSlotMap[teacherName]) {
            teacherSlotMap[teacherName] = new Set();
          }
          teacherSlotMap[teacherName].add(`${day}-${slot}`);

          return `${practical.name} | ${practical.teacherName} | ${batch}`;
        }

        return null;
      });

      const filteredAssignments = practicalAssignments.filter(Boolean);

      if (filteredAssignments.length > 0) {
        timetable[day][slot] = filteredAssignments.join(" || ");
      }
    }
  }
  i++;
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

// API Route Handler
export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as DivisionData[];

    const timetables = data.map((divisionData) => {
      const { division, teachers } = divisionData;
      const year = teachers[0].year;
      const department = teachers[0].department;
      const semester = teachers[0].semester;

      const availability: boolean[][] = Array(8)
        .fill(null)
        .map(() => Array(8).fill(true));

      const subjects = teachers.map((t) => ({
        id: t.subjectId.id,
        name: t.subjectId.name,
        type: t.subjectId.type === "Practical" ? "practical" : "lecture",
        hoursPerWeek:
          t.subjectId.type === "Practical"
            ? t.subjectId.hoursPerWeek * 3
            : t.subjectId.hoursPerWeek,
        teacherName: t.teacherId.name,
        availability: availability,
      }));

      const practicals = subjects.filter((s) => s.type === "practical");
      const shuffleArray = <T>(array: T[]): T[] => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };
      const lectures = subjects.filter((s) => s.type === "lecture");
      const shuffledLectures = shuffleArray(lectures);
      const timetable = createEmptyTimetable();

      if (year === "Last Year Btech")
        distributePracticals(timetable, practicals, [0, 1]);
      else if (year === "Third Year Btech")
        distributePracticals(timetable, practicals, [3, 4]);
      else if (year === "Second Year Btech")
        distributePracticals(timetable, practicals, [6, 7]);
      if (year === "Last Year Btech")
        distributeLectures(timetable, shuffledLectures, [3, 4, 6, 7]);
      else if (year === "Third Year Btech")
        distributeLectures(timetable, shuffledLectures, [0, 1, 6, 7]);
      else if (year === "Second Year Btech")
        distributeLectures(timetable, shuffledLectures, [0, 1, 3, 4]);

      // assignProjectLectures(timetable, [0, 1]);
      assignProjectLectures(timetable, [6, 7]);

      return { division, year, timetable, department, semester };
    });

    for (const timetable of timetables) {
      await TimetableModel.create(timetable);
    }

    return NextResponse.json({ message: "Timetables saved successfully!" });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Failed to generate timetable.", error: error.message },
      { status: 500 }
    );
  }
}
