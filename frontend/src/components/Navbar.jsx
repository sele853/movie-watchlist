import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };
  return (
    <nav className="bg-blue-600 dark:bg-blue-800 p-4 shadow-md">
      <div className="container mx-auto  flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          <a href="/">Movie Watchlist</a>
        </h1>
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
        <div
          className={`md:flex items-center gap-4 ${
            isOpen ? "block" : "hidden"
          } mt-4 md:mt-0 w-full md:w-auto`}
        >
          <a
            href="/"
            className="block md:inline-block text-white hover:text-gray-200 px-3 py-2 text-sm sm:text-base"
          >
            Home
          </a>
          {user ? (
            <>
              <a
                href="/watchlist"
                className="block md:inline-block text-white hover:text-gray-200 px-3 py-2 text-sm sm:text-base"
              >
                Watchlist
              </a>
              <button
                className="block md:inline-block text-white hover:text-gray-200 px-3 py-2 text-sm sm:text-base"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="block md:inline-block text-white hover:text-gray-200 px-3 py-2 text-sm sm:text-base"
              >
                Login
              </a>
              <a
                href="/register"
                className="block md:inline-block text-white hover:text-gray-200 px-3 py-2 text-sm sm:text-base"
              >
                Register
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
