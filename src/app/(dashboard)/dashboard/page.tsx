"use client";
import Navbar from "@/components/common/Navbar";
import SideNav from "@/components/common/SideNav";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <SideNav children={<DashboardComponent />} />
    </>
  );
};

export default Dashboard;

const DashboardComponent = () => {
  return (
    <div className="ml-0 text-base-content">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg mb-6">
          Welcome to the Timetable Generator! Use the sidebar to manage your
          timetables, classes, teachers, and students.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-base-200 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Create a New Timetable</h2>
            <p>Click here to start creating a new timetable.</p>
            <a href="/create-timetable" className="btn btn-primary mt-2">
              Go to Create Timetable
            </a>
          </div>
          <div className="bg-base-200 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">View Existing Timetables</h2>
            <p>Check out all the timetables you have created.</p>
            <a href="/view-timetables" className="btn btn-primary mt-2">
              View Timetables
            </a>
          </div>
          <div className="bg-base-200 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Manage Classes</h2>
            <p>View and manage your classes effectively.</p>
            <a href="/manage-classes" className="btn btn-primary mt-2">
              Manage Classes
            </a>
          </div>
          <div className="bg-base-200 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Manage Teachers</h2>
            <p>Oversee teacher assignments and details.</p>
            <a href="/manage-teachers" className="btn btn-primary mt-2">
              Manage Teachers
            </a>
          </div>
          <div className="bg-base-200 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Manage Students</h2>
            <p>Access student information and records.</p>
            <a href="/students" className="btn btn-primary mt-2">
              Manage Students
            </a>
          </div>
          <div className="bg-base-200 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Settings</h2>
            <p>Configure your timetable settings here.</p>
            <a href="/settings" className="btn btn-primary mt-2">
              Go to Settings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
