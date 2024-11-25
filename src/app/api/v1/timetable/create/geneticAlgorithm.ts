import fs from "fs";

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
  batches?: string[];
  teacherName: string;
};

type TimetableGrid = (string | null)[][];

// Create an empty timetable grid
export function createEmptyTimetable(): TimetableGrid {
  return DAYS.map(() => Array(SLOTS.length).fill(null));
}

// Function to calculate total lecture slots
export function calculateLectureSlots(subjects: Subject[]): number {
  return subjects
    .filter((subject) => subject.type === "lecture")
    .reduce((total, subject) => total + subject.hoursPerWeek, 0);
}

// Function to distribute lectures evenly
export function distributeLectures(
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

        // If subject hours are completed, remove it from the queue
        if (subject.hoursPerWeek === 0) {
          lectureQueue.shift();
        } else {
          lectureQueue.push(lectureQueue.shift()!); // Rotate the queue
        }
      }
    }
  }
}

// Function to distribute practicals
export function distributePracticals(
  timetable: TimetableGrid,
  practicals: Subject[],
  availableSlots: number[]
): void {
  const practicalQueue = [...practicals]; // Queue of practicals
  const batchOrder = ["Batch 1", "Batch 2", "Batch 3"]; // Batch rotation order

  for (let day = 0; day < DAYS.length; day++) {
    for (const slot of availableSlots) {
      // Skip Recess and Break slots
      if ([2, 5].includes(slot)) continue;

      // Ensure we have enough practicals to assign
      if (practicalQueue.length < 3) break;

      // Rotate batches and assign practicals
      const practicalAssignments = batchOrder.map((batch, index) => {
        const practical = practicalQueue[(day + index) % practicalQueue.length];
        return `${practical.name} | ${practical.teacherName} | ${batch}`;
      });

      // Join the practicals into the slot using " || "
      timetable[day][slot] = practicalAssignments.join(" || ");
    }
  }
}

// Assign Project Lectures (Extra slots at the end)
export function assignProjectLectures(
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

// Save Timetable to CSV
export function saveTimetableToCSV(
  timetable: TimetableGrid,
  filePath: string
): void {
  const header = ["Day", ...SLOTS];
  const rows = timetable.map((row, index) => [DAYS[index], ...row]);

  const csvContent = [
    header.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");
  fs.writeFileSync(filePath, csvContent, "utf8");
  console.log(`Timetable saved to ${filePath}`);
}
