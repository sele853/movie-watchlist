import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';


function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <nav className="bg-blue-600 dark:bg-blue-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          <a href="/">Movie Watchlist</a>
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="text-white hover:text-gray-200 p-2 rounded-full"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
          </button>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
        <div
          className={`md:flex items-center gap-4 ${isOpen ? 'block' : 'hidden'} mt-4 md:mt-0 w-full md:w-auto`}
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
                onClick={handleLogout}
                className="block md:inline-block text-white hover:text-gray-200 px-3 py-2 text-sm sm:text-base"
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
}

export default Navbar;