// App.js
import React, { useState } from "react";
import "./App.css";
import Register from "./components/Register";

function App() {
  const [users, setUsers] = useState([]);

  const handleRegister = (newUser) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers)); // שומר את המשתמשים ב-localStorage
      return updatedUsers;
    });
  };

  return (
    <div>
      <h1>User Management System</h1>
      <Register onRegister={handleRegister} />
      <div class="overlay"></div>
    </div>
  );
}

export default App;
