import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Subject } from "@/types/Subject";
import { ShowCustomToast } from "@/components/common/ShowCustomToast";

const DeleteSubject = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`/api/v1/subjects/all`);
      setSubjects(response.data);
    } catch (error) {
      toast.error("Failed to fetch subjects");
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleDelete = async (updatedSubject: Subject) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this subject?"
      );
      if (!confirmDelete) return;
      const _id = updatedSubject._id;
      const response = axios.delete(`/api/v1/subjects/delete/${_id}`);
      ShowCustomToast(response, {
        loading: "Deleting subject...",
        success: "Subject deleted successfully",
        error: "Failed to delete subject",
      });
      fetchSubjects();
    } catch (error) {
      toast.error("Failed to update subject");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Delete Subjects
      </h2>

      {/* Subjects Table */}
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2">Subject ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Shortcut Name</th>
            <th className="px-4 py-2">Department</th>
            <th className="px-4 py-2">Year</th>
            <th className="px-4 py-2">Semester</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={index} className="text-center">
              <td className="border px-4 py-2">{subject.subjectId}</td>
              <td className="border px-4 py-2">{subject.name}</td>
              <td className="border px-4 py-2">{subject.shortCutName}</td>
              <td className="border px-4 py-2 capitalize">
                {subject.department}
              </td>
              <td className="border px-4 py-2">{subject.year}</td>
              <td className="border px-4 py-2">{subject.semester}</td>
              <td className="border px-4 py-2">{subject.type}</td>
              <td className="border px-4 py-2">
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => handleDelete(subject)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteSubject;
