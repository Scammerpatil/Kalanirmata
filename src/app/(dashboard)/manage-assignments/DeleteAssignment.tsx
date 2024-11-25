import { Assignment } from "@/types/Assignment";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DeleteAssigment = () => {
  const [assignment, setAssignment] = useState([]);
  useEffect(() => {
    const response = axios.get("/api/v1/teacher-subject/all");
    toast.promise(response, {
      loading: "Loading",
      success: (data) => {
        setAssignment(data.data);
        return "Assignment fetched successfully";
      },
      error: "Failed to fetch assignment",
    });
  }, []);

  const handleEditClick = (assignment: Assignment) => {
    prompt("Are you sure you want to delete this assignment?");
    const response = axios.post(`/api/v1/teacher-subject/delete`, {
      _id: assignment._id,
    });
    toast.promise(response, {
      loading: "Deleting assignment...",
      success: "Assignment deleted successfully",
      error: "Failed to delete assignment",
    });
  };

  return (
    <table className="table-auto w-full text-left">
      <thead>
        <tr>
          <th className="px-4 py-2">Assignment ID</th>
          <th className="px-4 py-2">Teacher Name</th>
          <th className="px-4 py-2">Subject Name</th>
          <th className="px-4 py-2">Department</th>
          <th className="px-4 py-2">Year</th>
          <th className="px-4 py-2">Semester</th>
          <th className="px-4 py-2">Type</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {assignment.map((assignment: Assignment, index) => (
          <tr key={index} className="text-center">
            <td className="border px-4 py-2">{index + 1}</td>
            <td className="border px-4 py-2">{assignment.teacherId.name}</td>
            <td className="border px-4 py-2">{assignment.subjectId.name}</td>
            <td className="border px-4 py-2 capitalize">
              {assignment.department}
            </td>
            <td className="border px-4 py-2">{assignment.year}</td>
            <td className="border px-4 py-2">{assignment.semester}</td>
            <td className="border px-4 py-2">{assignment.subjectId.type}</td>
            <td className="border px-4 py-2">
              <button
                className="btn btn-sm btn-outline"
                onClick={() => handleEditClick(assignment)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default DeleteAssigment;
