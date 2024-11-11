import { ChangeEvent, useState } from "react";
import axios from "axios";
import { ShowCustomToast } from "@/components/common/ShowCustomToast";

const AddSubjectForm = () => {
  const [subject, setSubject] = useState({
    subjectId: "",
    name: "",
    shortCutName: "",
    year: "",
    semester: "",
    department: "",
    type: "",
    hoursPerWeek: "",
  });

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSubject((prevSubject) => ({ ...prevSubject, [name]: value }));
  };

  const handleSubmit = () => {
    const response = axios.post(`api/v1/subjects/add`, subject);
    ShowCustomToast(response, {
      loading: "Adding Subject",
      success: "Subject added successfully",
      error: "Something went wrong",
    });
    setSubject({
      subjectId: "",
      name: "",
      shortCutName: "",
      year: "",
      department: "",
      type: "",
      semester: "",
      hoursPerWeek: "",
    });
  };

  return (
    <form className="bg-[--b1] p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center text-[--p]">
        Add Subject
      </h2>

      <div className="mb-4">
        <label className="block text-[--s] font-semibold mb-2">
          Subject ID
        </label>
        <input
          type="text"
          name="subjectId"
          value={subject.subjectId}
          onChange={handleChange}
          className="input input-bordered w-full bg-[--b2] uppercase"
          placeholder="Enter Subject ID"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-[--s] font-semibold mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={subject.name}
          onChange={handleChange}
          className="input input-bordered w-full bg-[--b2]"
          placeholder="Enter Subject Name"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-[--s] font-semibold mb-2">
          Shortcut Name
        </label>
        <input
          type="text"
          name="shortCutName"
          value={subject.shortCutName}
          onChange={handleChange}
          className="input input-bordered w-full bg-[--b2] uppercase"
          placeholder="Enter Shortcut Name"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-[--s] font-semibold mb-2">Semester</label>
        <input
          name="semester"
          type="number"
          min={1}
          max={8}
          value={subject.semester}
          onChange={handleChange}
          className="textarea textarea-bordered w-full bg-[--b2]"
          placeholder="Enter Semester to which Subject belongs"
        ></input>
      </div>

      <div className="mb-4">
        <label className="block text-[--s] font-semibold mb-2">Year</label>
        <select
          name="year"
          value={subject.year}
          onChange={handleChange}
          className="select select-bordered w-full bg-[--b2] text-[--s]"
          required
        >
          <option value="">Choose Year</option>
          <option value="FY Btech">First Year Btech</option>
          <option value="SY Btech">Second Year Btech</option>
          <option value="TY Btech">Third Year Btech</option>
          <option value="Last Year Btech">Last Year Btech</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-[--s] font-semibold mb-2">
          Department
        </label>
        <select
          name="department"
          value={subject.department}
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
      </div>

      <div className="mb-4">
        <label className="block text-[--s] font-semibold mb-2">Type</label>
        <select
          name="type"
          value={subject.type}
          onChange={handleChange}
          className="select select-bordered w-full bg-[--b2]"
          required
        >
          <option value="">Choose Type</option>
          <option value="Theory">Theory</option>
          <option value="Practical">Practical</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-[--s] font-semibold mb-2">
          Duration (hours)
        </label>
        <input
          type="number"
          name="hoursPerWeek"
          min={2}
          max={5}
          value={subject.hoursPerWeek}
          onChange={handleChange}
          className="input input-bordered w-full bg-[--b2]"
          placeholder="Enter Duration in Hours (2-5)"
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full mt-4"
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        Add Subject
      </button>
    </form>
  );
};

export default AddSubjectForm;
