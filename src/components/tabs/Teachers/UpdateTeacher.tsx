import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Teacher } from "@/types/Teacher";

const UpdateTeacher = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(`/api/v1/teachers/all`);
      console.log(response);
      setTeachers(response.data);
    } catch (error) {
      toast.error("Failed to fetch teachers");
    }
  };

  const handleUpdate = async (updatedTeacher: Teacher) => {
    try {
      await axios.put(`api/v1/teachers/update`, {
        updatedTeacher: updatedTeacher,
      });
      toast.success("Teacher updated successfully");
      fetchTeachers();
      setEditingTeacher(null);
    } catch (error) {
      toast.error("Failed to update teacher");
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleEditClick = (teacher: Teacher) => {
    setEditingTeacher(teacher);
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Update Teachers
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
          {teachers.length > 0 ? (
            teachers.map((teacher, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{teacher.teacherId}</td>
                <td className="border px-4 py-2">{teacher.name}</td>
                <td className="border px-4 py-2">{teacher.gender}</td>
                <td className="border px-4 py-2">{teacher.email}</td>
                <td className="border px-4 py-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleEditClick(teacher)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No Teachers Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {editingTeacher && (
        <div className="mt-8 p-10 bg-base-300 rounded-box text-base-content">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Edit Teacher
          </h3>
          <label className="block text-sm font-medium mb-2">Teacher ID</label>
          <input
            type="text"
            name="teacherId"
            value={editingTeacher.teacherId}
            disabled
            className="input input-bordered w-full mb-2"
          />

          {/* Editable fields for other properties */}
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={editingTeacher.name}
            onChange={(e) =>
              setEditingTeacher({ ...editingTeacher, name: e.target.value })
            }
            placeholder="Teacher Name"
            className="input input-bordered w-full mb-2"
          />

          <label className="block text-sm font-medium mb-2">Gender</label>
          <select
            name="gender"
            value={editingTeacher.gender}
            onChange={(e) =>
              setEditingTeacher({
                ...editingTeacher,
                gender: e.target.value,
              })
            }
            className="select select-bordered w-full mb-2"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={editingTeacher.email}
            onChange={(e) =>
              setEditingTeacher({ ...editingTeacher, email: e.target.value })
            }
            placeholder="Email Address"
            className="input input-bordered w-full mb-2"
          />

          <button
            className="btn btn-primary mt-4"
            onClick={() => handleUpdate(editingTeacher)}
          >
            Save Changes
          </button>
          <button
            className="btn btn-secondary mt-4 ml-4"
            onClick={() => setEditingTeacher(null)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateTeacher;
