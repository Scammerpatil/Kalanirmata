import random
import csv

divisions =[
    {
        "division": "Division A",
        "teachers": [
            {
                "_id": "672fb75251428f1cddac6bfe",
                "teacherId": {
                    "_id": "672f9d7518d830d7fd42eb30",
                    "teacherId": "COMPUTERPOONAM",
                    "name": "Punam Ravan Patil",
                    "email": "punam.patil@rcpit.ac.in",
                    "gender": "female",
                    "department": "computer",
                    "lecturesPerWeek": 5,
                    "subjects": [],
                    "__v": 0
                },
                "subjectId": {
                    "_id": "672f008788373518c36c14f0",
                    "subjectId": "PECO7031T",
                    "name": "Deep Learning",
                    "shortCutName": "DL",
                    "department": "computer",
                    "year": "Last Year Btech",
                    "semester": 7,
                    "hoursPerWeek": 2,
                    "type": "Theory",
                    "__v": 0
                },
                "year": "Last Year Btech",
                "semester": 7,
                "department": "computer",
                "__v": 0
            },
            {
                "_id": "672fb76551428f1cddac6c05",
                "teacherId": {
                    "_id": "672f9d7518d830d7fd42eb30",
                    "teacherId": "COMPUTERPOONAM",
                    "name": "Punam Ravan Patil",
                    "email": "punam.patil@rcpit.ac.in",
                    "gender": "female",
                    "department": "computer",
                    "lecturesPerWeek": 5,
                    "subjects": [],
                    "__v": 0
                },
                "subjectId": {
                    "_id": "672fa27e448e61b6dc0319cb",
                    "subjectId": "PECO7031L",
                    "name": "Deep Learning Lab",
                    "shortCutName": "DL",
                    "department": "computer",
                    "year": "Last Year Btech",
                    "semester": 7,
                    "hoursPerWeek": 2,
                    "type": "Practical",
                    "__v": 0
                },
                "year": "Last Year Btech",
                "semester": 7,
                "department": "computer",
                "__v": 0
            },
            {
                "_id": "672fb7a251428f1cddac6c07",
                "teacherId": {
                    "_id": "672f141b88373518c36c150a",
                    "teacherId": "COMPUTERMAHESH",
                    "name": "Mahesh Madhukar Mahajan",
                    "email": "mahesh.mahajan@rcpit.ac.in",
                    "gender": "Male",
                    "department": "computer",
                    "lecturesPerWeek": 5,
                    "subjects": [],
                    "__v": 0
                },
                "subjectId": {
                    "_id": "672fa2ea448e61b6dc0319cf",
                    "subjectId": "PCCO7020T",
                    "name": "Distributed Computing",
                    "shortCutName": "DC",
                    "department": "computer",
                    "year": "Last Year Btech",
                    "semester": 7,
                    "hoursPerWeek": 3,
                    "type": "Theory",
                    "__v": 0
                },
                "year": "Last Year Btech",
                "semester": 7,
                "department": "computer",
                "__v": 0
            },
            {
                "_id": "672fb7a851428f1cddac6c09",
                "teacherId": {
                    "_id": "672f141b88373518c36c150a",
                    "teacherId": "COMPUTERMAHESH",
                    "name": "Mahesh Madhukar Mahajan",
                    "email": "mahesh.mahajan@rcpit.ac.in",
                    "gender": "Male",
                    "department": "computer",
                    "lecturesPerWeek": 5,
                    "subjects": [],
                    "__v": 0
                },
                "subjectId": {
                    "_id": "672fa3bf448e61b6dc0319d3",
                    "subjectId": "PECO7020L",
                    "name": "Distributed Computing Lab",
                    "shortCutName": "DC",
                    "department": "computer",
                    "year": "Last Year Btech",
                    "semester": 7,
                    "hoursPerWeek": 2,
                    "type": "Practical",
                    "__v": 0
                },
                "year": "Last Year Btech",
                "semester": 7,
                "department": "computer",
                "__v": 0
            },
            {
                "_id": "672fb83c51428f1cddac6c22",
                "teacherId": {
                    "_id": "672f9e6618d830d7fd42eb3a",
                    "teacherId": "COMPUTERDUSHYANT",
                    "name": "Dushyant Somnath Potdar",
                    "email": "dushyant.potdar@rcpit.ac.in",
                    "gender": "Male",
                    "department": "computer",
                    "lecturesPerWeek": 5,
                    "subjects": [],
                    "__v": 0
                },
                "subjectId": {
                    "_id": "672fa3f9448e61b6dc0319d5",
                    "subjectId": "PCCO7010T",
                    "name": "Digital Signal Processing and Applications",
                    "shortCutName": "DSPA",
                    "department": "computer",
                    "year": "Last Year Btech",
                    "semester": 7,
                    "hoursPerWeek": 3,
                    "type": "Theory",
                    "__v": 0
                },
                "year": "Last Year Btech",
                "semester": 7,
                "department": "computer",
                "__v": 0
            },
            {
                "_id": "672fb84051428f1cddac6c24",
                "teacherId": {
                    "_id": "672f9e6618d830d7fd42eb3a",
                    "teacherId": "COMPUTERDUSHYANT",
                    "name": "Dushyant Somnath Potdar",
                    "email": "dushyant.potdar@rcpit.ac.in",
                    "gender": "Male",
                    "department": "computer",
                    "lecturesPerWeek": 5,
                    "subjects": [],
                    "__v": 0
                },
                "subjectId": {
                    "_id": "672fa43e448e61b6dc0319d7",
                    "subjectId": "PCCO7010L",
                    "name": "Digital Signal Processing and Applications Lab",
                    "shortCutName": "DSPA",
                    "department": "computer",
                    "year": "Last Year Btech",
                    "semester": 7,
                    "hoursPerWeek": 2,
                    "type": "Practical",
                    "__v": 0
                },
                "year": "Last Year Btech",
                "semester": 7,
                "department": "computer",
                "__v": 0
            },
            {
                "_id": "672fbb9651428f1cddac6c3c",
                "teacherId": {
                    "_id": "672f9e2218d830d7fd42eb34",
                    "teacherId": "COMPUTERSHAILENDRA",
                    "name": "Shailendra M. Pardeshi",
                    "email": "shailendra.pardeshi@rcpit.ac.in",
                    "gender": "Male",
                    "department": "computer",
                    "lecturesPerWeek": 5,
                    "subjects": [],
                    "__v": 0
                },
                "subjectId": {
                    "_id": "672fa47d448e61b6dc0319d9",
                    "subjectId": "OECO7049T",
                    "name": "Research Methodology",
                    "shortCutName": "RM",
                    "department": "computer",
                    "year": "Last Year Btech",
                    "semester": 7,
                    "hoursPerWeek": 3,
                    "type": "Theory",
                    "__v": 0
                },
                "year": "Last Year Btech",
                "semester": 7,
                "department": "computer",
                "__v": 0
            }
        ]
    },
    {
        "division": "Division B",
        "teachers": [
            {
                "_id": "672fb82d51428f1cddac6c1e",
                "teacherId": {
                    "_id": "672fb7ea51428f1cddac6c12",
                    "teacherId": "COMPUTERVIPUL",
                    "name": "Vipul Devendra Punjabi",
                    "email": "vipul.punjabi@rcpit.ac.in",
                    "gender": "Male",
                    "department": "computer",
                    "lecturesPerWeek": 5,
                    "__v": 0
                },
                "subjectId": {
                    "_id": "672fa2ea448e61b6dc0319cf",
                    "subjectId": "PCCO7020T",
                    "name": "Distributed Computing",
                    "shortCutName": "DC",
                    "department": "computer",
                    "year": "Last Year Btech",
                    "semester": 7,
                    "hoursPerWeek": 3,
                    "type": "Theory",
                    "__v": 0
                },
                "year": "Last Year Btech",
                "semester": 7,
                "department": "computer",
                "__v": 0
            },
            {
                "_id": "672fb83051428f1cddac6c20",
                "teacherId": {
                    "_id": "672fb7ea51428f1cddac6c12",
                    "teacherId": "COMPUTERVIPUL",
                    "name": "Vipul Devendra Punjabi",
                    "email": "vipul.punjabi@rcpit.ac.in",
                    "gender": "Male",
                    "department": "computer",
                    "lecturesPerWeek": 5,
                    "__v": 0
                },
                "subjectId": {
                    "_id": "672fa3bf448e61b6dc0319d3",
                    "subjectId": "PECO7020L",
                    "name": "Distributed Computing Lab",
                    "shortCutName": "DC",
                    "department": "computer",
                    "year": "Last Year Btech",
                    "semester": 7,
                    "hoursPerWeek": 2,
                    "type": "Practical",
                    "__v": 0
                },
                "year": "Last Year Btech",
                "semester": 7,
                "department": "computer",
                "__v": 0
            },
            {
                "_id": "672fb75b51428f1cddac6c01",
                "teacherId": {
                    "_id": "672f9e4b18d830d7fd42eb38",
                    "teacherId": "COMPUTERSAIYYAD",
                    "name": "Saiyyad Mohmmad Ali Muzffar Ali",
                    "email": "mohammadali.sayyad@rcpit.ac.in",
                    "gender": "Male",
                    "department": "computer",
                    "lecturesPerWeek": 5,
                    "subjects": [],
                    "__v": 0
                },
                "subjectId": {
                    "_id": "672f008788373518c36c14f0",
                    "subjectId": "PECO7031T",
                    "name": "Deep Learning",
                    "shortCutName": "DL",
                    "department": "computer",
                    "year": "Last Year Btech",
                    "semester": 7,
                    "hoursPerWeek": 2,
                    "type": "Theory",
                    "__v": 0
                },
                "year": "Last Year Btech",
                "semester": 7,
                "department": "computer",
                "__v": 0
            },
            {
                "_id": "672fb76051428f1cddac6c03",
                "teacherId": {
                    "_id": "672f9e4b18d830d7fd42eb38",
                    "teacherId": "COMPUTERSAIYYAD",
                    "name": "Saiyyad Mohmmad Ali Muzffar Ali",
                    "email": "mohammadali.sayyad@rcpit.ac.in",
                    "gender": "Male",
                    "department": "computer",
                    "lecturesPerWeek": 5,
                    "subjects": [],
                    "__v": 0
                },
                "subjectId": {
                    "_id": "672fa27e448e61b6dc0319cb",
                    "subjectId": "PECO7031L",
                    "name": "Deep Learning Lab",
                    "shortCutName": "DL",
                    "department": "computer",
                    "year": "Last Year Btech",
                    "semester": 7,
                    "hoursPerWeek": 2,
                    "type": "Practical",
                    "__v": 0
                },
                "year": "Last Year Btech",
                "semester": 7,
                "department": "computer",
                "__v": 0
            },
            {
                "_id": "672fb83c51428f1cddac6c22",
                "teacherId": {
                    "_id": "672f9e6618d830d7fd42eb3a",
                    "teacherId": "COMPUTERDUSHYANT",
                    "name": "Dushyant Somnath Potdar",
                    "email": "dushyant.potdar@rcpit.ac.in",
                    "gender": "Male",
                    "department": "computer",
                    "lecturesPerWeek": 5,
                    "subjects": [],
                    "__v": 0
                },
                "subjectId": {
                    "_id": "672fa3f9448e61b6dc0319d5",
                    "subjectId": "PCCO7010T",
                    "name": "Digital Signal Processing and Applications",
                    "shortCutName": "DSPA",
                    "department": "computer",
                    "year": "Last Year Btech",
                    "semester": 7,
                    "hoursPerWeek": 3,
                    "type": "Theory",
                    "__v": 0
                },
                "year": "Last Year Btech",
                "semester": 7,
                "department": "computer",
                "__v": 0
            },
            {
                "_id": "672fb84051428f1cddac6c24",
                "teacherId": {
                    "_id": "672f9e6618d830d7fd42eb3a",
                    "teacherId": "COMPUTERDUSHYANT",
                    "name": "Dushyant Somnath Potdar",
                    "email": "dushyant.potdar@rcpit.ac.in",
                    "gender": "Male",
                    "department": "computer",
                    "lecturesPerWeek": 5,
                    "subjects": [],
                    "__v": 0
                },
                "subjectId": {
                    "_id": "672fa43e448e61b6dc0319d7",
                    "subjectId": "PCCO7010L",
                    "name": "Digital Signal Processing and Applications Lab",
                    "shortCutName": "DSPA",
                    "department": "computer",
                    "year": "Last Year Btech",
                    "semester": 7,
                    "hoursPerWeek": 2,
                    "type": "Practical",
                    "__v": 0
                },
                "year": "Last Year Btech",
                "semester": 7,
                "department": "computer",
                "__v": 0
            },
            {
                "_id": "6730f34a9beb9c30ffee101a",
                "teacherId": {
                    "_id": "672f9e8218d830d7fd42eb3c",
                    "teacherId": "COMPUTERPALLAVI",
                    "name": "Pallavi A. Agrawal",
                    "email": "pallavi.agrawal@rcpit.ac.in",
                    "gender": "Male",
                    "department": "computer",
                    "lecturesPerWeek": 5,
                    "subjects": [],
                    "__v": 0
                },
                "subjectId": {
                    "_id": "672fa47d448e61b6dc0319d9",
                    "subjectId": "OECO7049T",
                    "name": "Research Methodology",
                    "shortCutName": "RM",
                    "department": "computer",
                    "year": "Last Year Btech",
                    "semester": 7,
                    "hoursPerWeek": 3,
                    "type": "Theory",
                    "__v": 0
                },
                "year": "Last Year Btech",
                "semester": 7,
                "department": "computer",
                "__v": 0
            }
        ]
    },
    {
        "division": "Division C",
        "teachers": [
            {
                "_id": "672fb75251428f1cddac6bfe",
                "teacherId": {
                    "_id": "672f9d7518d830d7fd42eb30",
                    "teacherId": "COMPUTERPOONAM",
                    "name": "Punam Ravan Patil",
                    "email": "punam.patil@rcpit.ac.in",
                    "gender": "female",
                    "department": "computer",
                    "lecturesPerWeek": 5,
                    "subjects": [],
                    "__v": 0
                },
                "subjectId": {
                    "_id": "672f008788373518c36c14f0",
                    "subjectId": "PECO7031T",
                    "name": "Deep Learning",
                    "shortCutName": "DL",
                    "department": "computer",
                    "year": "Last Year Btech",
                    "semester": 7,
                    "hoursPerWeek": 2,
                    "type": "Theory",
                    "__v": 0
                },
                "year": "Last Year Btech",
                "semester": 7,
                "department": "computer",
                "__v": 0
            },
            {
                "_id": "672fb76551428f1cddac6c05",
                "teacherId": {
                    "_id": "672f9d7518d830d7fd42eb30",
                    "teacherId": "COMPUTERPOONAM",
                    "name": "Punam Ravan Patil",
                    "email": "punam.patil@rcpit.ac.in",
                    "gender": "female",
                    "department": "computer",
                    "lecturesPerWeek": 5,
                    "subjects": [],
                    "__v": 0
                },
                "subjectId": {
                    "_id": "672fa27e448e61b6dc0319cb",
                    "subjectId": "PECO7031L",
                    "name": "Deep Learning Lab",
                    "shortCutName": "DL",
                    "department": "computer",
                    "year": "Last Year Btech",
                    "semester": 7,
                    "hoursPerWeek": 2,
                    "type": "Practical",
                    "__v": 0
                },
                "year": "Last Year Btech",
                "semester": 7,
                "department": "computer",
                "__v": 0
            },
            {
                "_id": "672fb82d51428f1cddac6c1e",
                "teacherId": {
                    "_id": "672fb7ea51428f1cddac6c12",
                    "teacherId": "COMPUTERVIPUL",
                    "name": "Vipul Devendra Punjabi",
                    "email": "vipul.punjabi@rcpit.ac.in",
                    "gender": "Male",
                    "department": "computer",
                    "lecturesPerWeek": 5,
                    "__v": 0
                },
                "subjectId": {
                    "_id": "672fa2ea448e61b6dc0319cf",
                    "subjectId": "PCCO7020T",
                    "name": "Distributed Computing",
                    "shortCutName": "DC",
                    "department": "computer",
                    "year": "Last Year Btech",
                    "semester": 7,
                    "hoursPerWeek": 3,
                    "type": "Theory",
                    "__v": 0
                },
                "year": "Last Year Btech",
                "semester": 7,
                "department": "computer",
                "__v": 0
            },
            {
                "_id": "672fb83051428f1cddac6c20",
                "teacherId": {
                    "_id": "672fb7ea51428f1cddac6c12",
                    "teacherId": "COMPUTERVIPUL",
                    "name": "Vipul Devendra Punjabi",
                    "email": "vipul.punjabi@rcpit.ac.in",
                    "gender": "Male",
                    "department": "computer",
                    "lecturesPerWeek": 5,
                    "__v": 0
                },
                "subjectId": {
                    "_id": "672fa3bf448e61b6dc0319d3",
                    "subjectId": "PECO7020L",
                    "name": "Distributed Computing Lab",
                    "shortCutName": "DC",
                    "department": "computer",
                    "year": "Last Year Btech",
                    "semester": 7,
                    "hoursPerWeek": 2,
                    "type": "Practical",
                    "__v": 0
                },
                "year": "Last Year Btech",
                "semester": 7,
                "department": "computer",
                "__v": 0
            },
            {
                "_id": "672fb83c51428f1cddac6c22",
                "teacherId": {
                    "_id": "672f9e6618d830d7fd42eb3a",
                    "teacherId": "COMPUTERDUSHYANT",
                    "name": "Dushyant Somnath Potdar",
                    "email": "dushyant.potdar@rcpit.ac.in",
                    "gender": "Male",
                    "department": "computer",
                    "lecturesPerWeek": 5,
                    "subjects": [],
                    "__v": 0
                },
                "subjectId": {
                    "_id": "672fa3f9448e61b6dc0319d5",
                    "subjectId": "PCCO7010T",
                    "name": "Digital Signal Processing and Applications",
                    "shortCutName": "DSPA",
                    "department": "computer",
                    "year": "Last Year Btech",
                    "semester": 7,
                    "hoursPerWeek": 3,
                    "type": "Theory",
                    "__v": 0
                },
                "year": "Last Year Btech",
                "semester": 7,
                "department": "computer",
                "__v": 0
            },
            {
                "_id": "672fb84051428f1cddac6c24",
                "teacherId": {
                    "_id": "672f9e6618d830d7fd42eb3a",
                    "teacherId": "COMPUTERDUSHYANT",
                    "name": "Dushyant Somnath Potdar",
                    "email": "dushyant.potdar@rcpit.ac.in",
                    "gender": "Male",
                    "department": "computer",
                    "lecturesPerWeek": 5,
                    "subjects": [],
                    "__v": 0
                },
                "subjectId": {
                    "_id": "672fa43e448e61b6dc0319d7",
                    "subjectId": "PCCO7010L",
                    "name": "Digital Signal Processing and Applications Lab",
                    "shortCutName": "DSPA",
                    "department": "computer",
                    "year": "Last Year Btech",
                    "semester": 7,
                    "hoursPerWeek": 2,
                    "type": "Practical",
                    "__v": 0
                },
                "year": "Last Year Btech",
                "semester": 7,
                "department": "computer",
                "__v": 0
            },
            {
                "_id": "6730f34a9beb9c30ffee101a",
                "teacherId": {
                    "_id": "672f9e8218d830d7fd42eb3c",
                    "teacherId": "COMPUTERPALLAVI",
                    "name": "Pallavi A. Agrawal",
                    "email": "pallavi.agrawal@rcpit.ac.in",
                    "gender": "Male",
                    "department": "computer",
                    "lecturesPerWeek": 5,
                    "subjects": [],
                    "__v": 0
                },
                "subjectId": {
                    "_id": "672fa47d448e61b6dc0319d9",
                    "subjectId": "OECO7049T",
                    "name": "Research Methodology",
                    "shortCutName": "RM",
                    "department": "computer",
                    "year": "Last Year Btech",
                    "semester": 7,
                    "hoursPerWeek": 3,
                    "type": "Theory",
                    "__v": 0
                },
                "year": "Last Year Btech",
                "semester": 7,
                "department": "computer",
                "__v": 0
            }
        ]
    }
]

# Constants
DAYS = 6
SLOTS = 6
POPULATION_SIZE = 50
GENERATIONS = 100
MUTATION_RATE = 0.1

# Fitness Weights
HARD_CONSTRAINT_WEIGHT = 1000
SOFT_CONSTRAINT_WEIGHT = 100

# Chromosome Representation: 3D list [division][day][slot]

def create_initial_population(divisions, subjects, slots, num_timetables):
        population = []
        for _ in range(num_timetables):
            timetable = []
            for division in divisions:
                for slot in slots:
                    assigned_subject = random.choice(subjects)
                    timetable.append({
                        "division": division,
                        "slot": slot,
                        "subject": assigned_subject,
                        "type": "practical" if assigned_subject["type"] == "practical" else "lecture",
                    })
            population.append(timetable)
        return population

def assign_practicals_in_batches(timetable, practicals, division, slots):
    batch_names = ["A1", "A2", "A3"]
    batch_practicals = {batch: [] for batch in batch_names}
    for i, practical in enumerate(practicals):
        batch = batch_names[i % len(batch_names)]
        batch_practicals[batch].append(practical)
    assigned = False
    for slot_index in range(len(slots) - len(batch_names) + 1):
        if all(
            not any(
                t["slot"] == slots[slot_index + b_index]
                and t["division"] == division
                for t in timetable
            )
            for b_index in range(len(batch_names))
        ):
            for b_index, batch in enumerate(batch_names):
                timetable.append({
                    "division": division,
                    "slot": slots[slot_index + b_index],
                    "subject": {"batches": batch_practicals[batch]},
                    "type": "practical",
                })
            assigned = True
            break
    return assigned

def generate_random_timetable(teachers):
    timetable = [[None for _ in range(SLOTS)] for _ in range(DAYS)]
    for teacher in teachers:
        subject = teacher["subjectId"]
        hours_remaining = subject["hoursPerWeek"]
        while hours_remaining > 0:
            day = random.randint(0, DAYS - 1)
            slot = random.randint(0, SLOTS - 1)
            if subject["type"] == "Practical":
                if slot < SLOTS - 1 and timetable[day][slot] is None and timetable[day][slot + 1] is None:
                    timetable[day][slot] = subject
                    timetable[day][slot + 1] = subject
                    hours_remaining -= 2
            else:
                if timetable[day][slot] is None:
                    timetable[day][slot] = subject
                    hours_remaining -= 1
    return timetable

def calculate_fitness(timetable, divisions, slots):
    fitness = 0
    for division in divisions:
        division_timetable = [t for t in timetable if t["division"] == division]
        covered_subjects = set()
        for slot in slots:
            slot_timetable = [t for t in division_timetable if t["slot"] == slot]
            if len(slot_timetable) > 1:
                fitness -= 10
            for t in slot_timetable:
                if t["type"] == "lecture":
                    if t["subject"]["id"] in covered_subjects:
                        fitness -= 5
                    else:
                        covered_subjects.add(t["subject"]["id"])
                elif t["type"] == "practical":
                    if not t["subject"]["batches"]:
                        fitness -= 10
    return fitness



def crossover(parent1, parent2):
    split = len(parent1) // 2
    child1 = parent1[:split] + parent2[split:]
    child2 = parent2[:split] + parent1[split:]
    return child1, child2

def mutate(timetable, subjects, slots):
    mutation_index = random.randint(0, len(timetable) - 1)
    timetable[mutation_index]["subject"] = random.choice(subjects)
    timetable[mutation_index]["slot"] = random.choice(slots)

def genetic_algorithm(divisions, subjects, slots, practicals, num_generations, population_size):
    population = create_initial_population(divisions, subjects, slots, population_size)
    for generation in range(num_generations):
        population = sorted(
            population, key=lambda t: calculate_fitness(t, divisions, slots), reverse=True
        )
        next_generation = population[:2]
        for _ in range((population_size - 2) // 2):
            parent1, parent2 = random.sample(population[:10], 2)
            child1, child2 = crossover(parent1, parent2)
            if random.random() < 0.1:
                mutate(child1, subjects, slots)
                mutate(child2, subjects, slots)
            next_generation += [child1, child2]
        population = next_generation
        for timetable in population:
            for division in divisions:
                assign_practicals_in_batches(timetable, practicals, division, slots)
    return population[0]


# Run Genetic Algorithm
divisons = ["Division A", "Division B", "Division C"]

best_timetable = genetic_algorithm(divisions)
def save_timetable_to_csv(timetable):
    with open("timetable.csv", "w", newline="") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(["Division", "Day", "Slot", "Subject"])
        for division, schedule in timetable.items():
            for day, slots in enumerate(schedule):
                for slot, subject in enumerate(slots):
                    writer.writerow([division, f"Day {day + 1}", f"Slot {slot + 1}", subject])
save_timetable_to_csv(best_timetable)

print("Timetable generated and saved to timetable.csv")
