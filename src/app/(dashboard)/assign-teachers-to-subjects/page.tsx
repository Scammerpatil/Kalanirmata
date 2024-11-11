"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "@/components/common/Navbar";
import SideNav from "@/components/common/SideNav";
import { Teacher } from "@/types/Teacher";
import { Subject } from "@/types/Subject";

const AssignTeacher = () => {
  return (
    <>
      <Navbar />
      <SideNav children={<AssignTeacherComponent />} />
    </>
  );
};

export default AssignTeacher;

const AssignTeacherComponent = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [teacherId, setTeacherId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  useEffect(() => {
    // Fetch teachers and subjects on initial load
    const fetchTeachersAndSubjects = async () => {
      try {
        const teacherResponse = await axios.get(`/api/v1/teachers/all`);
        const subjectResponse = await axios.get(`/api/v1/subjects/all`);
        setTeachers(teacherResponse.data);
        setSubjects(subjectResponse.data);
      } catch (error) {
        toast.error("Failed to fetch data for teachers or subjects.");
      }
    };
    fetchTeachersAndSubjects();
  }, []);

  useEffect(() => {
    // Filter subjects based on selected department, year, and semester
    setFilteredSubjects(
      subjects.filter(
        (subject) =>
          subject.department === department &&
          subject.year === year &&
          subject.semester === Number(semester)
      )
    );
  }, [department, year, semester, subjects]);

  const handleSubmit = async () => {
    try {
      await axios.post(`/api/v1/teacher-subject/assign`, {
        teacherId,
        subjectId,
        year,
        semester,
        department,
      });
      toast.success("Teacher assigned to subject successfully.");
    } catch (error) {
      toast.error("Failed to assign teacher to subject.");
    }
  };

  return (
    <div className="container mx-auto p-8 text-base border-2 border-gray-200 rounded-lg max-w-xl bg-base-300 shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-base-content">
        Assign Teacher to Subject
      </h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Select Department
          </label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="select select-bordered w-full mb-2"
            required
          >
            <option value="">Select Department</option>
            <option value="computer">Computer Engineering</option>
            <option value="aiml">Artificial Intelligence & ML</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Year</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="select select-bordered w-full mb-2"
            required
          >
            <option value="">Select Year</option>
            <option value="FY Btech">First Year Btech</option>
            <option value="SY Btech">Second Year Btech</option>
            <option value="TY Btech">Third Year Btech</option>
            <option value="Last Year Btech">Last Year Btech</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Select Semester
          </label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="select select-bordered w-full mb-2"
            required
          >
            <option value="">Select Semester</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
            <option value="7">Semester 7</option>
            <option value="8">Semester 8</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Select Subject
          </label>
          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="select select-bordered w-full mb-2"
            required
          >
            <option value="">Select Subject</option>
            {filteredSubjects.map((subject) => (
              <option key={subject.subjectId} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Select Teacher
          </label>
          <select
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            className="select select-bordered w-full mb-2"
            required
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option
                key={teacher._id!.toString()}
                value={teacher._id!.toString()}
              >
                {teacher.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary mt-4 w-full"
        >
          Assign Teacher
        </button>
      </form>
    </div>
  );
};
