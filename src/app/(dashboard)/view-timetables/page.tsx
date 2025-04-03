"use client";

import Navbar from "@/components/common/Navbar";
import SideNav from "@/components/common/SideNav";
import ToastContainer from "@/components/common/ToastContainer";
import { useState, useEffect } from "react";
import axios from "axios";
import { Delete } from "lucide-react";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

const ViewTimetablesPage = () => {
  return (
    <>
      <Navbar />
      <SideNav children={<ViewTimeTableComponent />} />
    </>
  );
};

export default ViewTimetablesPage;

const ViewTimeTableComponent = () => {
  const [timetableData, setTimetableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState<any[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("/api/v1/teachers/all");
        setTeachers(response.data.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    const fetchTimetables = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/v1/timetable/get");
        setTimetableData(response.data);
      } catch (error) {
        console.error("Error fetching timetables:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetables();
    fetchTeachers();
  }, []);

  // Grouping timetable by department and semester
  const groupedByDepartment = timetableData.reduce((acc: any, item: any) => {
    if (!acc[item.department]) acc[item.department] = {};
    if (!acc[item.department][item.semester])
      acc[item.department][item.semester] = [];
    acc[item.department][item.semester].push(item);
    return acc;
  }, {});

  // Grouping timetable by teachers
  const groupedByTeachers = timetableData.reduce((acc: any, item: any) => {
    item.timetable.forEach((day: string[], dayIndex: number) => {
      day.forEach((slot, slotIndex) => {
        if (slot) {
          const teacherName = slot.split(" | ")[1]; // Extract teacher name
          if (!acc[teacherName]) acc[teacherName] = {};
          if (!acc[teacherName][dayIndex]) acc[teacherName][dayIndex] = {};
          acc[teacherName][dayIndex][slotIndex] = slot;
        }
      });
    });
    return acc;
  }, {});

  const deleteTimeTable = async (id: string) => {
    try {
      const response = axios.post("/api/v1/timetable/delete", { id });
      toast.promise(response, {
        loading: "Deleting timetable...",
        success: "Timetable deleted successfully!",
        error: "Failed to delete timetable.",
      });
      setTimetableData((prev) =>
        prev.filter((timetable) => timetable._id !== id)
      );
    } catch (error) {
      console.error("Error deleting timetable:", error);
    }
  };

  const slotTimes = [
    "10:30 - 11:30",
    "11:30 - 12:30",
    "12:30 - 1:30 (Recess)",
    "1:30 - 2:30",
    "2:30 - 3:30",
    "3:30 - 3:45 (Break)",
    "3:45 - 4:45",
    "4:45 - 5:45",
  ];

  return (
    <>
      <ToastContainer />
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">View Timetables</h1>

        {/* Department-wise Timetable */}
        <div className="w-full">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : Object.entries(groupedByDepartment).length > 0 ? (
            Object.entries(groupedByDepartment).map(
              ([department, semesters]: any) => (
                <div key={department} className="mb-4">
                  <div
                    tabIndex={0}
                    className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
                  >
                    <input type="checkbox" />
                    <div className="collapse-title text-lg font-semibold capitalize">
                      {department}
                    </div>
                    <div className="collapse-content">
                      {Object.entries(semesters).map(
                        ([semester, divisions]: any) => (
                          <div key={semester} className="mb-4">
                            <div
                              tabIndex={0}
                              className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
                            >
                              <input type="checkbox" />
                              <div className="collapse-title text-md font-medium">
                                Semester: {semester}
                              </div>
                              <div className="collapse-content">
                                {divisions.map((division: any) => (
                                  <div key={division.division} className="mb-4">
                                    <h3 className="text-3xl font-medium my-4 text-center">
                                      Division: {division.division}
                                    </h3>
                                    <table className="table w-full border border-base-300">
                                      <thead>
                                        <tr className="bg-base-300 text-base-content">
                                          <th className="px-4 py-2">
                                            Time/Day
                                          </th>
                                          {[
                                            "Monday",
                                            "Tuesday",
                                            "Wednesday",
                                            "Thursday",
                                            "Friday",
                                            "Saturday",
                                          ].map((day, index) => (
                                            <th
                                              key={index}
                                              className="px-4 py-2 text-sm"
                                            >
                                              {day}
                                            </th>
                                          ))}
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {slotTimes.map((time, timeIndex) => (
                                          <tr
                                            key={timeIndex}
                                            className={
                                              timeIndex % 2 === 0
                                                ? "bg-base-100"
                                                : "bg-base-200"
                                            }
                                          >
                                            <td className="px-4 py-2 font-medium">
                                              {time}
                                            </td>
                                            {division.timetable.map(
                                              (
                                                daySlots: string[],
                                                dayIndex: number
                                              ) => (
                                                <td
                                                  key={dayIndex}
                                                  className="px-4 py-2 text-center text-sm"
                                                >
                                                  {daySlots[timeIndex] ||
                                                    "Free Slot"}
                                                </td>
                                              )
                                            )}
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="text-center">No timetables found</div>
          )}
        </div>

        {/* Teacher-wise Timetable */}
        <h1 className="text-xl font-bold my-6">View Timetable (By Teachers)</h1>
        {Object.entries(groupedByTeachers).length > 0 ? (
          Object.entries(groupedByTeachers).map(([teacher, days]: any) => (
            <div key={teacher} className="mb-4">
              <div
                tabIndex={0}
                className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
              >
                <input type="checkbox" />
                <div className="collapse-title text-lg font-semibold">
                  {teacher}
                </div>
                <div className="collapse-content">
                  <table className="table w-full border border-base-300">
                    <thead>
                      <tr className="bg-base-300 text-base-content">
                        <th className="px-4 py-2">Time/Day</th>
                        {[
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                        ].map((day, index) => (
                          <th key={index} className="px-4 py-2 text-sm">
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {slotTimes.map((time, timeIndex) => (
                        <tr
                          key={timeIndex}
                          className={
                            timeIndex % 2 === 0 ? "bg-base-100" : "bg-base-200"
                          }
                        >
                          <td className="px-4 py-2 font-medium">{time}</td>
                          {Object.values(days).map((slots: any, dayIndex) => (
                            <td
                              key={dayIndex}
                              className="px-4 py-2 text-center text-sm"
                            >
                              {slots[timeIndex] || "Free Slot"}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            No teacher-specific timetables found
          </div>
        )}
      </div>
    </>
  );
};
