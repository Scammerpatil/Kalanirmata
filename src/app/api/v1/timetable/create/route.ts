import { NextRequest, NextResponse } from "next/server";
import { Teacher } from "@/types/Teacher";
import { Subject } from "@/types/Subject";
import * as fs from "fs";
import * as path from "path";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const timeSlots = [
  "10:30 - 11:30",
  "11:30 - 12:30",
  "12:30 - 1:30", // Recess
  "1:30 - 2:30",
  "2:30 - 3:30",
  "3:30 - 3:45", // Break
  "3:45 - 4:45",
  "4:45 - 5:45",
];

interface DivisionData {
  division: string;
  teachers: {
    teacherId: Teacher;
    subjectId: Subject;
    year: number;
    semester: number;
    department: string;
  }[];
}

type Timetable = { [key: string]: { [key: string]: any } };

export async function POST(req: NextRequest) {
  const data = await req.json();
  const csvRows: string[] = [];

  // Header row with time slots
  csvRows.push(["day", ...timeSlots].join(","));

  data.forEach((divisionData: DivisionData) => {
    const timetable: Timetable = {};
    const subjectAssignments: { [key: string]: Set<string> } = {};

    // Initialize the timetable for each day
    days.forEach((day) => {
      timetable[day] = {};
      timeSlots.forEach((slot) => {
        timetable[day][slot] = null; // Initialize each slot as null
      });
    });

    divisionData.teachers.forEach(({ teacherId, subjectId }) => {
      let hoursRemaining = subjectId.hoursPerWeek;
      const assignedSlots: { [key: string]: boolean } = {};
      const dailySubjects = new Set<string>();

      // Assign subjects to the timetable while ensuring the rules
      days.forEach((day) => {
        if (hoursRemaining <= 0) return;
        if (dailySubjects.size >= 3) return; // Ensure at least 3 subjects are assigned

        for (const slot of timeSlots) {
          if (
            timetable[day][slot] ||
            hoursRemaining <= 0 ||
            assignedSlots[day + slot]
          )
            continue;
          if (subjectId.type === "Practical" && slot === "3:45 - 5:45")
            continue;

          if (subjectId.type === "Practical") {
            // Assign practical sessions as pairs of time slots
            const nextSlotIndex = timeSlots.indexOf(slot) + 1;
            const nextSlot = timeSlots[nextSlotIndex];
            if (
              !nextSlot ||
              timetable[day][nextSlot] ||
              assignedSlots[day + nextSlot]
            )
              continue;

            timetable[day][slot] = {
              teacher: teacherId.name,
              subject: subjectId.name,
              type: subjectId.type,
            };
            timetable[day][nextSlot] = timetable[day][slot];
            assignedSlots[day + slot] = true;
            assignedSlots[day + nextSlot] = true;
            hoursRemaining -= 2;
            dailySubjects.add(subjectId.name);
            break;
          } else {
            timetable[day][slot] = {
              teacher: teacherId.name,
              subject: subjectId.name,
              type: subjectId.type,
            };
            assignedSlots[day + slot] = true;
            hoursRemaining--;
            dailySubjects.add(subjectId.name);
            break;
          }
        }
      });
    });

    // Ensure there are exactly 3 subjects per day and one null slot
    days.forEach((day) => {
      let subjectCount = 0;

      // First pass: Ensure 3 subjects
      timeSlots.forEach((slot) => {
        if (timetable[day][slot] !== null) {
          subjectCount++;
        }
      });

      if (subjectCount < 3) {
        timeSlots.forEach((slot) => {
          if (timetable[day][slot] === null && subjectCount < 3) {
            timetable[day][slot] = {
              teacher: "N/A",
              subject: "Free",
              type: "None",
            };
            subjectCount++;
          }
        });
      }

      // Second pass: Ensure 1 practical per day (max)
      let practicalAssigned = false;
      timeSlots.forEach((slot) => {
        if (timetable[day][slot]?.type === "Practical" && !practicalAssigned) {
          practicalAssigned = true;
        }
      });
      if (!practicalAssigned) {
        // If no practical assigned, assign one
        for (const slot of timeSlots) {
          if (timetable[day][slot] === null) {
            timetable[day][slot] = {
              teacher: "N/A",
              subject: "Free",
              type: "None",
            };
            break;
          }
        }
      }
    });

    // Prepare timetable rows for CSV
    days.forEach((day) => {
      const row: string[] = [day];
      timeSlots.forEach((slot) => {
        if (slot === "12:30 - 1:30") {
          row.push("Recess");
        } else if (slot === "3:30 - 3:45") {
          row.push("Break");
        } else if (timetable[day][slot]) {
          // Join subject and teacher with a hyphen
          row.push(
            `${timetable[day][slot].subject} - ${timetable[day][slot].teacher}`
          );
        } else {
          row.push(""); // Empty cell if no subject is assigned
        }
      });
      csvRows.push(row.join(","));
    });
  });

  // Create the CSV file
  const csvFilePath = path.join(process.cwd(), "timetable.csv");
  fs.writeFileSync(csvFilePath, csvRows.join("\n"));
  const fileData = fs.readFileSync(csvFilePath);
  return new NextResponse(fileData, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=timetable.csv",
    },
  });
}
