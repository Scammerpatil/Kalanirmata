const fs = require("fs");
const path = require("path");

const DAYS = 6;
const SLOTS = 6;
const POPULATION_SIZE = 50;
const GENERATIONS = 100;
const MUTATION_RATE = 0.1;

// Chromosome Representation: Array of objects [{division, slot, subject, type}]
function createInitialPopulation(divisions, subjects, slots, numTimetables) {
  const population = [];
  for (let i = 0; i < numTimetables; i++) {
    const timetable = [];
    divisions.forEach((division) => {
      slots.forEach((slot) => {
        const assignedSubject =
          subjects[Math.floor(Math.random() * subjects.length)];
        timetable.push({
          division,
          slot,
          subject: assignedSubject,
          type: assignedSubject.type === "practical" ? "practical" : "lecture",
        });
      });
    });
    population.push(timetable);
  }
  return population;
}

function assignPracticalsInBatches(timetable, practicals, division, slots) {
  const batchNames = ["A1", "A2", "A3"];
  const batchPracticals = batchNames.reduce((acc, batch) => {
    acc[batch] = [];
    return acc;
  }, {});

  practicals.forEach((practical, i) => {
    const batch = batchNames[i % batchNames.length];
    batchPracticals[batch].push(practical);
  });

  let assigned = false;

  for (
    let slotIndex = 0;
    slotIndex <= slots.length - batchNames.length;
    slotIndex++
  ) {
    if (
      batchNames.every((_, bIndex) =>
        timetable.every(
          (entry) =>
            entry.slot !== slots[slotIndex + bIndex] ||
            entry.division !== division
        )
      )
    ) {
      batchNames.forEach((batch, bIndex) => {
        timetable.push({
          division,
          slot: slots[slotIndex + bIndex],
          subject: { batches: batchPracticals[batch] },
          type: "practical",
        });
      });
      assigned = true;
      break;
    }
  }

  return assigned;
}

function generateRandomTimetable(teachers) {
  const timetable = Array.from({ length: DAYS }, () =>
    Array.from({ length: SLOTS }, () => null)
  );

  teachers.forEach((teacher) => {
    const { subjectId: subject } = teacher;
    let hoursRemaining = subject.hoursPerWeek;

    while (hoursRemaining > 0) {
      const day = Math.floor(Math.random() * DAYS);
      const slot = Math.floor(Math.random() * SLOTS);

      if (subject.type === "Practical") {
        if (
          slot < SLOTS - 1 &&
          timetable[day][slot] === null &&
          timetable[day][slot + 1] === null
        ) {
          timetable[day][slot] = subject;
          timetable[day][slot + 1] = subject;
          hoursRemaining -= 2;
        }
      } else {
        if (timetable[day][slot] === null) {
          timetable[day][slot] = subject;
          hoursRemaining -= 1;
        }
      }
    }
  });

  return timetable;
}

function calculateFitness(timetable, divisions, slots) {
  let fitness = 0;

  divisions.forEach((division) => {
    const divisionTimetable = timetable.filter((t) => t.division === division);
    const coveredSubjects = new Set();

    slots.forEach((slot) => {
      const slotTimetable = divisionTimetable.filter((t) => t.slot === slot);

      if (slotTimetable.length > 1) {
        fitness -= 10;
      }

      slotTimetable.forEach((t) => {
        if (t.type === "lecture") {
          if (coveredSubjects.has(t.subject.id)) {
            fitness -= 5;
          } else {
            coveredSubjects.add(t.subject.id);
          }
        } else if (t.type === "practical" && !t.subject.batches) {
          fitness -= 10;
        }
      });
    });
  });

  return fitness;
}

function crossover(parent1, parent2) {
  const split = Math.floor(parent1.length / 2);
  const child1 = [...parent1.slice(0, split), ...parent2.slice(split)];
  const child2 = [...parent2.slice(0, split), ...parent1.slice(split)];
  return [child1, child2];
}

function mutate(timetable, subjects, slots) {
  const mutationIndex = Math.floor(Math.random() * timetable.length);
  timetable[mutationIndex].subject =
    subjects[Math.floor(Math.random() * subjects.length)];
  timetable[mutationIndex].slot =
    slots[Math.floor(Math.random() * slots.length)];
}

function geneticAlgorithm(
  divisions,
  subjects,
  slots,
  practicals,
  numGenerations,
  populationSize
) {
  let population = createInitialPopulation(
    divisions,
    subjects,
    slots,
    populationSize
  );

  for (let generation = 0; generation < numGenerations; generation++) {
    population.sort(
      (a, b) =>
        calculateFitness(b, divisions, slots) -
        calculateFitness(a, divisions, slots)
    );

    const nextGeneration = population.slice(0, 2);

    for (let i = 0; i < (populationSize - 2) / 2; i++) {
      const [parent1, parent2] = [population[0], population[1]]; // Top 2 for elitism
      const [child1, child2] = crossover(parent1, parent2);

      if (Math.random() < MUTATION_RATE) {
        mutate(child1, subjects, slots);
        mutate(child2, subjects, slots);
      }

      nextGeneration.push(child1, child2);
    }

    population = nextGeneration;

    population.forEach((timetable) => {
      divisions.forEach((division) =>
        assignPracticalsInBatches(timetable, practicals, division, slots)
      );
    });
  }

  return population[0];
}

const data = [];

// Example usage
const divisions = ["Division A", "Division B", "Division C"];
const subjects = [
  { id: "S1", name: "Subject 1", type: "lecture", hoursPerWeek: 3 },
  { id: "S2", name: "Subject 2", type: "practical", hoursPerWeek: 2 },
];
const slots = [0, 1, 2, 3, 4, 5];
const practicals = ["Practical 1", "Practical 2", "Practical 3"];

const bestTimetable = geneticAlgorithm(
  divisions,
  subjects,
  slots,
  practicals,
  GENERATIONS,
  POPULATION_SIZE
);
saveTimetableToCSV(bestTimetable);

console.log("Best Timetable:", bestTimetable);
function saveTimetableToCSV(timetable, filename = "timetable.csv") {
  const filePath = path.join(__dirname, filename);
  const header = ["Division", "Slot", "Subject", "Type"];
  const rows = timetable.map((entry) => [
    entry.division,
    `Slot ${entry.slot + 1}`,
    entry.subject.name || `Practical (${entry.subject.batches.join(", ")})`,
    entry.type,
  ]);

  const csvContent = [
    header.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  fs.writeFileSync(filePath, csvContent, "utf8");
  console.log(`Timetable saved to ${filePath}`);
}
