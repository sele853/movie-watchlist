import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/"
                  element={
                    <div className="min-h-screen flex items-center justify-center bg-gray-100">
                      <h1 className="text-3xl font-bold text-blue-600">
                        Welcome to Movie Watchlist
                      </h1>
                    </div>
                  }
                />
              </Routes>
            </main>
            <ToastContainer />
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
