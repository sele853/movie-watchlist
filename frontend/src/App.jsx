import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return <div>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <h1 className="text-3xl font-bold text-blue-600">Welcome to Movie Watchlist</h1>
            </div>
          }/>
        </Routes>
        <ToastContainer />
      </Router>
    </AuthProvider>
  </div>;
};

export default App;
