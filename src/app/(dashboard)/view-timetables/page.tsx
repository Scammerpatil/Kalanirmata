"use client";

import Navbar from "@/components/common/Navbar";
import SideNav from "@/components/common/SideNav";
import ToastContainer from "@/components/common/ToastContainer";
import { useState, useEffect } from "react";
import axios from "axios";

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

  useEffect(() => {
    // Fetch timetable data from the API
    const fetchTimetables = async () => {
      try {
        const response = await axios.get("/api/v1/timetable/get");
        setTimetableData(response.data);
      } catch (error) {
        console.error("Error fetching timetables:", error);
      }
    };
    fetchTimetables();
  }, []);

  const groupedData = timetableData.reduce((acc: any, item: any) => {
    if (!acc[item.department]) acc[item.department] = {};
    if (!acc[item.department][item.semester])
      acc[item.department][item.semester] = [];
    acc[item.department][item.semester].push(item);
    return acc;
  }, {});

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
        <div className="w-full">
          {Object.entries(groupedData).map(([department, semesters]: any) => (
            <div key={department} className="mb-4">
              <div
                tabIndex={0}
                className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
              >
                <input type="checkbox" />
                <div className="collapse-title text-lg font-semibold">
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
                                <h3 className="text-sm font-medium mb-2">
                                  Division: {division.division}
                                </h3>
                                <table className="table w-full border border-gray-300">
                                  <thead>
                                    <tr>
                                      <th>Day/Slot</th>
                                      {[
                                        "Monday",
                                        "Tuesday",
                                        "Wednesday",
                                        "Thursday",
                                        "Friday",
                                        "Saturday",
                                      ].map((day, dayIndex) => (
                                        <th key={dayIndex}>{day}</th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {slotTimes.map((slotTime, slotIndex) => (
                                      <tr key={slotIndex}>
                                        <td className="font-medium">
                                          {slotTime.includes("Recess")
                                            ? "Recess"
                                            : slotTime.includes("Break")
                                            ? "Break"
                                            : slotTime}
                                        </td>
                                        {division.timetable.map(
                                          (
                                            daySlots: string[],
                                            dayIndex: number
                                          ) => (
                                            <td key={dayIndex}>
                                              {slotIndex === 2
                                                ? "Recess"
                                                : slotIndex === 5
                                                ? "Break"
                                                : daySlots[slotIndex] || "-"}
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
          ))}
        </div>
      </div>
    </>
  );
};
