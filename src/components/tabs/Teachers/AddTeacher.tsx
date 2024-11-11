import React, { useEffect, useState } from "react";
import { Teacher } from "@/types/Teacher";
import { ShowCustomToast } from "@/components/common/ShowCustomToast";
import axios from "axios";

const AddTeacher = () => {
  const [teacher, setTeacher] = useState<Teacher>({
    teacherId: "",
    name: "",
    email: "",
    lecturesPerWeek: 0,
    subjects: [],
    gender: "",
    department: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTeacher((prevTeacher) => ({ ...prevTeacher, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const response = axios.post(`/api/v1/teachers/add`, teacher);
    ShowCustomToast(response, {
      loading: "Adding new Teacher",
      success: "New Teacher Added",
      error: "Something went wrong",
    });
  };

  useEffect(() => {
    const generateTeacherId = ({
      department,
      username,
    }: {
      department: string;
      username: string;
    }) => {
      if (!department || !username) return "";
      const name = username.split(" ")[0];
      return `${department}${name}`.toUpperCase();
    };

    setTeacher({
      ...teacher,
      teacherId: generateTeacherId({
        department: teacher.department,
        username: teacher.name,
      }),
    });
  }, [teacher.department, teacher.name]);

  return (
    <form onSubmit={handleSubmit} className="px-6 py-3 bg-base-200 rounded">
      <h2 className="text-xl font-semibold mb-4">Add Teacher</h2>

      <label className="block mb-2">Teacher ID</label>
      <input
        type="text"
        name="teacherId"
        value={teacher.teacherId}
        className="input input-bordered w-full mb-4 uppercase"
        readOnly
      />

      <label className="block mb-2">Name</label>
      <input
        type="text"
        name="name"
        value={teacher.name}
        onChange={handleChange}
        className="input input-bordered w-full mb-4"
        required
      />
      <label className="block text-[--s] font-semibold mb-2">Department</label>
      <select
        name="department"
        value={teacher.department}
        onChange={handleChange}
        className="select select-bordered w-full bg-[--b2]"
        required
      >
        <option defaultValue="">Choose Your Department</option>
        <option value="computer">Computer Engineering</option>
        <option value="aiml">
          Artificial Intelligence and Machine Learning
        </option>
        <option value="ds">
          Computer Science & Engineering (Data Science)
        </option>
        <option value="entc">
          Electronics & Telecommunication Engineering
        </option>
        <option value="mechanical">Mechanical Engineering</option>
        <option value="electrical">Electrical Engineering</option>
        <option value="civil">Civil Engineering</option>
        <option value="cs">Computer Science & Engineering</option>
        <option value="aid">Artificial Intelligence & Data Science</option>
        <option value="it">Information Technology</option>
        <option value="ash">Applied Sciences & Humanities</option>
        <option value="research">Research Center</option>
      </select>

      <label className="block mb-2">Gender</label>
      <select
        name="gender"
        value={teacher.gender}
        onChange={handleChange}
        className="select select-bordered w-full mb-4"
        required
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <label className="block mb-2">Email</label>
      <input
        type="email"
        name="email"
        value={teacher.email}
        onChange={handleChange}
        className="input input-bordered w-full mb-4"
        required
      />

      <label className="block mb-2">Lecture to Be Allocated</label>
      <input
        type="number"
        name="lecturesPerWeek"
        min={4}
        max={5}
        value={teacher.lecturesPerWeek}
        onChange={handleChange}
        className="input input-bordered w-full mb-4"
        required
      />

      <button type="submit" className="btn btn-primary mr-2">
        Add
      </button>
    </form>
  );
};

export default AddTeacher;
