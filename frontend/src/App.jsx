import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
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
