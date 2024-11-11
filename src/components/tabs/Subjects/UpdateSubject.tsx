import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Subject } from "@/types/Subject";
import { ShowCustomToast } from "@/components/common/ShowCustomToast";

const UpdateSubject = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`api/v1/subjects/all`);
      setSubjects(response.data);
    } catch (error) {
      toast.error("Failed to fetch subjects");
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleEditClick = (subject: Subject) => {
    setEditingSubject(subject);
  };

  const handleUpdate = async (updatedSubject: Subject) => {
    console.log(updatedSubject);
    try {
      const response = axios.put(`/api/v1/subjects/update`, {
        updatedSubject: updatedSubject,
      });
      ShowCustomToast(response, {
        loading: "Updating subject...",
        success: "Subject updated successfully",
        error: "Failed to update subject",
      });
      fetchSubjects();
      setEditingSubject(null);
    } catch (error) {
      toast.error("Failed to update subject");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Update Subjects
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
                  onClick={() => handleEditClick(subject)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Subject Form */}
      {editingSubject && (
        <div className="mt-8 p-10 bg-base-300 rounded-box text-base-content">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Edit Subject
          </h3>
          <label className="block text-sm font-medium mb-2">Subject ID</label>
          <input
            type="text"
            name="subjectId"
            readOnly
            value={editingSubject.subjectId}
            className="input input-bordered w-full mb-2"
          />

          {/* Editable fields for other properties */}
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={editingSubject.name}
            onChange={(e) =>
              setEditingSubject({ ...editingSubject, name: e.target.value })
            }
            placeholder="Subject Name"
            className="input input-bordered w-full mb-2"
          />

          <label className="block text-sm font-medium mb-2">
            Shortcut Name
          </label>
          <input
            type="text"
            name="shortcutName"
            value={editingSubject.shortCutName}
            onChange={(e) =>
              setEditingSubject({
                ...editingSubject,
                shortCutName: e.target.value,
              })
            }
            placeholder="Shortcut Name"
            className="input input-bordered w-full mb-2"
          />

          <label className="block text-sm font-medium mb-2">Description</label>
          <input
            name="semester"
            type="number"
            min={1}
            max={8}
            value={editingSubject.semester}
            onChange={(e) =>
              setEditingSubject({
                ...editingSubject,
                semester: e.target.value,
              })
            }
            placeholder="Description"
            className="textarea textarea-bordered w-full mb-2"
          />

          <label className="block text-sm font-medium mb-2">Year</label>
          <select
            name="year"
            value={editingSubject.year}
            onChange={(e) =>
              setEditingSubject({ ...editingSubject, year: e.target.value })
            }
            className="select select-bordered w-full mb-2"
          >
            <option value="FY Btech">First Year Btech</option>
            <option value="SY Btech">Second Year Btech</option>
            <option value="TY Btech">Third Year Btech</option>
            <option value="Last Year Btech">Last Year Btech</option>
          </select>

          <label className="block text-sm font-medium mb-2">Department</label>
          <select
            name="department"
            value={editingSubject.department}
            onChange={(e) =>
              setEditingSubject({
                ...editingSubject,
                department: e.target.value,
              })
            }
            className="select select-bordered w-full mb-2"
          >
            <option value="computer">Computer Engineering</option>
            <option value="aiml">
              Artificial Intelligence and Machine Learning
            </option>
            <option value="ds">Data Science</option>
            <option value="entc">Electronics & Telecommunication</option>
            <option value="mechanical">Mechanical Engineering</option>
          </select>

          <label className="block text-sm font-medium mb-2">Type</label>
          <select
            name="type"
            value={editingSubject.type}
            onChange={(e) =>
              setEditingSubject({ ...editingSubject, type: e.target.value })
            }
            className="select select-bordered w-full mb-2"
          >
            <option value="Theory">Theory</option>
            <option value="Practical">Practical</option>
          </select>

          <label className="block text-sm font-medium mb-2">
            Hours Per Week
          </label>
          <input
            type="number"
            name="duration"
            min={2}
            max={5}
            value={editingSubject.hoursPerWeek}
            onChange={(e) =>
              setEditingSubject({
                ...editingSubject,
                duration: parseInt(e.target.value) || 1,
              })
            }
            className="input input-bordered w-full mb-2"
          />

          <button
            className="btn btn-primary mt-4"
            onClick={() => handleUpdate(editingSubject)}
          >
            Save Changes
          </button>
          <button
            className="btn btn-secondary mt-4 ml-4"
            onClick={() => setEditingSubject(null)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateSubject;
