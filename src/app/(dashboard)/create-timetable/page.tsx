"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Navbar from "@/components/common/Navbar";
import SideNav from "@/components/common/SideNav";
import axios from "axios";
import { ShowCustomToast } from "@/components/common/ShowCustomToast";
import toast from "react-hot-toast";
import { Teacher } from "@/types/Teacher";
import { Subject } from "@/types/Subject";
import { Assignment } from "@/types/Assignment";
import Link from "next/link";

interface teacherInterface {
  teachersId: string;
  subjectId: string;
}

const CreateTimeTable = () => {
  return (
    <>
      <Navbar />
      <SideNav children={<CreateTimeTableComponent />} />
    </>
  );
};

const CreateTimeTableComponent = () => {
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [numDivisions, setNumDivisions] = useState(1);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teacherSubject, setTeacherSubject] = useState([]);
  const [divisions, setDivisions] = useState(
    Array.from({ length: numDivisions }, () => ({ division: "", teachers: [] }))
  );

  useEffect(() => {
    setDivisions(
      Array.from({ length: numDivisions }, (_, i) => ({
        division: `Division ${String.fromCharCode(65 + i)}`,
        teachers: [],
      }))
    );
  }, [numDivisions]);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const teachersResponse = await axios.get(`/api/v1/teachers/all`);
      const subjectsResponse = await axios.get(`/api/v1/subjects/all`);
      const teacherSubjectResponse = axios.post(
        `/api/v1/teacher-subject/getAssignment/`,
        { year, department, semester }
      );

      setTeachers(
        teachersResponse.data.filter(
          (teacher: Teacher) => teacher.department === department
        )
      );
      setSubjects(
        subjectsResponse.data.filter(
          (subject: Subject) =>
            subject.year === year &&
            subject.department === department &&
            subject.semester === Number(semester)
        )
      );
      toast.promise(teacherSubjectResponse, {
        loading: "Fetching teachers and subjects...",
        success: (data) => {
          setTeacherSubject(data.data);
          return "Teachers and subjects fetched successfully!";
        },
        error: "Failed to fetch teachers and subjects.",
      });
    } catch (error: any) {
      console.error(error);
      toast.error("Error fetching teachers or subjects.");
    }
  };

  const handleTeacherSelection = (
    divisionIndex: number,
    assignmentId: string
  ) => {
    const updatedDivisions = [...divisions];
    const division = updatedDivisions[divisionIndex];

    const assignmentExists = division.teachers.some(
      (assignment: Assignment) => assignment._id === assignmentId
    );

    if (assignmentExists) {
      division.teachers = division.teachers.filter(
        (assignment: Assignment) => assignment._id !== assignmentId
      );
    } else {
      const selectedAssignment = teacherSubject.find(
        (assignment: Assignment) => assignment._id === assignmentId
      );
      if (selectedAssignment) {
        division.teachers.push(selectedAssignment);
      }
    }

    setDivisions(updatedDivisions);
  };

  const handleFinalSubmit = async () => {
    try {
      const response = axios.post(`/api/v1/timetable/create`, divisions, {
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.promise(response, {
        loading: "Creating timetable...",
        success: (data) => {
          setDownloadLink(data.data.csvFilePath);
          const url = window.URL.createObjectURL(new Blob([data.data]));
          console.log(url);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "timetable.csv");
          document.body.appendChild(link);
          link.click();
          link.remove();
          return "Timetable created successfully!";
        },
        error: "Failed to create timetable.",
      });
    } catch (error) {
      toast.error("Failed to create timetable.");
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen py-10 bg-base-100">
      <h2 className="text-4xl font-bold text-primary mb-8">Create Timetable</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-base-200 p-8 rounded-lg shadow-xl w-full md:w-96 mx-auto mb-10"
      >
        <div className="mb-6">
          <label className="block text-lg font-medium text-base-content mb-2">
            Year
          </label>
          <select
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="select select-primary w-full"
            required
          >
            <option value="">Choose Year</option>
            <option value="FY Btech">First Year Btech</option>
            <option value="SY Btech">Second Year Btech</option>
            <option value="TY Btech">Third Year Btech</option>
            <option value="Last Year Btech">Last Year Btech</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-base-content mb-2">
            Department
          </label>
          <select
            name="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="select select-primary w-full"
            required
          >
            <option value="">Choose Department</option>
            <option value="computer">Computer Engineering</option>
            <option value="aiml">AI and Machine Learning</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-base-content mb-2">
            Semester
          </label>
          <select
            name="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="select select-primary w-full"
            required
          >
            <option value="">Choose Semester</option>
            {Array.from({ length: 8 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{`Semester ${i + 1}`}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-base-content mb-2">
            Number of Divisions
          </label>
          <input
            type="number"
            value={numDivisions}
            onChange={(e) => setNumDivisions(Number(e.target.value))}
            className="input input-bordered w-full"
            placeholder="Enter number of divisions"
            min={1}
            max={3}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Fetch Teachers & Subjects
        </button>
      </form>

      {teachers.length > 0 && (
        <div className="w-full md:w-3/4 xl:w-11/12">
          <div className="card bg-base-200 p-6 mb-8 shadow-xl">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Assign Teachers
            </h3>
            <h4 className="text-xl font-semibold mb-2">Subjects:</h4>
            <ul className="list-disc pl-6 mb-4">
              {subjects.map((subject: Subject) => (
                <li key={subject.subjectId}>{subject.name}</li>
              ))}
            </ul>
            <h4 className="text-xl font-semibold mb-2">Teachers:</h4>
            <ul className="list-disc pl-6 mb-4">
              {teachers.map((teacher: Teacher) => (
                <li key={teacher.teacherId}>
                  {teacher.name} - {teacher.lecturesPerWeek}
                </li>
              ))}
            </ul>

            {divisions.map((division, index) => (
              <div key={index} className="mb-6">
                <div className="mb-2 text-center">
                  <label className="block text-lg font-medium text-base-content">
                    {division.division}
                  </label>
                  <textarea
                    value={division.teachers
                      .map(
                        (assignment: Assignment) =>
                          `${
                            teachers.find(
                              (t) =>
                                t.teacherId === assignment.teacherId.teacherId
                            )?.name
                          } (Subject: ${
                            subjects.find(
                              (s) =>
                                s.subjectId === assignment.subjectId.subjectId
                            )?.name
                          })`
                      )
                      .join("\n")}
                    className="textarea textarea-bordered w-full mb-2"
                    readOnly
                    placeholder="Selected teachers and subjects"
                  />
                  <div className="flex flex-col">
                    {teacherSubject.map((assignment: Assignment) => (
                      <label
                        key={assignment._id}
                        className="cursor-pointer label"
                      >
                        {assignment.subjectId.name} -{" "}
                        {assignment.teacherId?.name}
                        <input
                          type="checkbox"
                          value={assignment._id}
                          onChange={() =>
                            handleTeacherSelection(index, assignment._id)
                          }
                          className="checkbox checkbox-primary mr-2"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="w-full flex justify-center mt-8">
              <button onClick={handleFinalSubmit} className="btn btn-primary">
                Submit TimeTable
              </button>
            </div>
          </div>
        </div>
      )}
      {downloadLink && (
        <div className="mt-5">
          <a
            className="btn btn-primary btn-outline"
            href={downloadLink}
            download
          >
            Download TimeTable
          </a>
        </div>
      )}
    </div>
  );
};

export default CreateTimeTable;
