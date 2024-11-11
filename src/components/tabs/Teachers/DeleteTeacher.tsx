import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Teacher } from "@/types/Teacher";

const DeleteTeacher = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  // Fetch teachers on component mount
  const fetchTeachers = async () => {
    try {
      const response = await axios.get(`api/v1/teachers/all`);
      setTeachers(response.data);
    } catch (error) {
      toast.error("Failed to fetch teachers");
    }
  };

  const handleDelete = async (teacher: Teacher) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        await axios.delete(`api/v1/teachers/delete/${teacher.teacherId}`);
        toast.success("Teacher deleted successfully");
        fetchTeachers();
      } catch (error) {
        toast.error("Failed to delete teacher");
      }
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Delete Teachers
      </h2>

      {/* Teachers Table */}
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2">Teacher ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Gender</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{teacher.teacherId}</td>
              <td className="border px-4 py-2">{teacher.name}</td>
              <td className="border px-4 py-2">{teacher.gender}</td>
              <td className="border px-4 py-2">{teacher.email}</td>
              <td className="border px-4 py-2">
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleDelete(teacher)}
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

export default DeleteTeacher;
