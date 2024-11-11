import { Calendar, Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import ThemeToggler from "@/components/common/ThemeToggler";
import { useAuth } from "@/Context/AuthContext";
import Link from "next/link.js";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  useEffect(() => {
    const authenticate = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authenticate);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/";
  };

  return (
    <div className="navbar shadow-lg p-3 px-10 fixed top-0 left-0 w-full z-10 bg-opacity-[0.04] shadow-black/10 backdrop-blur-md bg-base-300">
      <div className="navbar-start">
        {/* Mobile Menu Button */}
        {!isAuthenticated && (
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden">
              <Menu size={24} />
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/login" className="btn btn-primary btn-outline">
                  Login
                </Link>
              </li>
              <li>
                <ThemeToggler />
              </li>
            </ul>
          </div>
        )}

        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-sans uppercase text-base-content"
        >
          <Calendar size={28} />
          <span className="text-xl">Kalanirmata</span>
        </Link>
      </div>

      {/* Search Bar and User Actions */}
      <div className="navbar-end flex items-center gap-4">
        <div className="form-control hidden md:block">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-32 md:w-64 bg-transparent text-base focus:ring-primary focus:ring-2 border border-base-content"
          />
        </div>
        {isAuthenticated ? (
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-2"
            >
              <li>
                <Link
                  href="/user/profile"
                  className="justify-between btn btn-ghost text-base"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/user/profile/settings"
                  className="btn btn-ghost justify-between text-base"
                >
                  Settings
                </Link>
              </li>
              <li>
                <button
                  className="btn btn-error hover:btn-outline"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <button
            className="btn btn-outline mr-2"
            onClick={(e) => {
              (
                document.getElementById("login") as HTMLDialogElement
              ).showModal();
            }}
          >
            Login
          </button>
        )}
      </div>
      <ThemeToggler />
    </div>
  );
};

export default Navbar;
