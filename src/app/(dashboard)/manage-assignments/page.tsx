"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/common/Navbar";
import SideNav from "@/components/common/SideNav";
import { Subject } from "@/types/Subject";
import { Teacher } from "@/types/Teacher";
import { Assignment } from "@/types/Assignment";
import toast from "react-hot-toast";

const ViewAssignments = () => {
  return (
    <>
      <Navbar />
      <SideNav children={<AssignmentList />} />
    </>
  );
};

export default ViewAssignments;

const AssignmentList = () => {
  const [teacherSubject, setTeacherSubject] = useState([]);
  const groupedAssignments: Record<string, Assignment[]> = {};

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = axios.get(`/api/v1/teacher-subject/all`);
        toast.promise(response, {
          loading: "Loading assignments...",
          success: (data) => {
            console.log(data.data);
            setTeacherSubject(data.data);
            return "Assignments loaded successfully";
          },
          error: "Failed to load assignments",
        });
      } catch (error) {
        console.error("Failed to fetch assignments:", error);
      }
    };

    fetchAssignments();
  }, []);

  teacherSubject.forEach((assignment: Assignment) => {
    const key = `${assignment.year}-${assignment.department}-${assignment.semester}`;
    if (!groupedAssignments[key]) groupedAssignments[key] = [];
    groupedAssignments[key].push(assignment);
  });

  if (teacherSubject.length > 0)
    return <div className="container mx-auto p-6">No assignments found</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Teacher Assignments
      </h1>
      <div className="grid grid-cols-1 gap-6">
        {Object.entries(groupedAssignments).map(([key, group]) => {
          const [year, department, semester] = key.split("-");
          return (
            <div key={key} className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-lg font-semibold mb-2">
                  {year} - {department} - Semester {semester}
                </h2>
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th className="text-left">Subject</th>
                        <th className="text-left">Assigned Teachers</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.map((assignment) => (
                        <tr key={assignment._id}>
                          <td className="py-2">{assignment.subjectId?.name}</td>
                          <td className="py-2">{assignment.teacherId?.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
