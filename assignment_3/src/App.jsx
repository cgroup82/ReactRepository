import { useState } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";

function App() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  // Handle registration
  const handleRegister = (newUser) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers)); // Store users in localStorage
      return updatedUsers;
    });
  };

  // Log out function
  const logOutUser = () => {
    sessionStorage.removeItem("loggedInUser"); // Clear logged-in user session
    navigate("/Login"); // Redirect to login page
  };

  const isLoggedIn = !!sessionStorage.getItem("loggedInUser"); // Check if user is logged in

  // Protected Route Wrapper
  const ProtectedRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/Login" />;
  };

  return (
    <div>
      {/* Show navigation links only if the user is not logged in */}
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Register">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Login">Login</Link>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/Profile">Profile</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <h1>User Management System</h1>
      <Routes>
        <Route path="/Register" element={<Register onRegister={handleRegister} />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<Profile logOutUser={logOutUser} />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="*" element={<Navigate to="/Login" />} /> {/* Default to Login */}
      </Routes>
      <div className="overlay"></div>
    </div>
  );
}

export default App;
