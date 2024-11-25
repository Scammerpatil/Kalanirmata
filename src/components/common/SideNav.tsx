import React, { ReactNode } from "react";
import {
  Calendar,
  Users,
  Clipboard,
  Settings,
  BookOpen,
  Book,
  UserCheck,
  Home,
} from "lucide-react";
import Link from "next/link";

const SideNav = ({ children }: { children: ReactNode }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center pt-28">
        {children}
      </div>
      <div className="drawer-side pt-20">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 gap-3">
          <li>
            <Link
              href="/dashboard"
              className="btn btn-ghost text-base justify-start gap-3"
            >
              <Home size={20} />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/create-timetable"
              className="btn btn-ghost text-base justify-start gap-3"
            >
              <Calendar size={20} />
              Create Timetable
            </Link>
          </li>
          <li>
            <Link
              href="/view-timetables"
              className="btn btn-ghost text-base justify-start gap-3"
            >
              <Clipboard size={20} />
              View Timetables
            </Link>
          </li>
          <li>
            <Link
              href="/manage-assignments"
              className="btn btn-ghost text-base justify-start gap-3"
            >
              <BookOpen size={20} />
              Manage Assignments
            </Link>
          </li>
          <li>
            <Link
              href="/manage-teachers"
              className="btn btn-ghost text-base justify-start gap-3"
            >
              <Users size={20} />
              Manage Teachers
            </Link>
          </li>
          <li>
            <Link
              href="/manage-subjects"
              className="btn btn-ghost text-base justify-start gap-3"
            >
              <Book size={20} />
              Manage Subjects
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className="btn btn-ghost text-base justify-start gap-3"
            >
              <Settings size={20} />
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
