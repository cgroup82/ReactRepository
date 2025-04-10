// src/pages/Auth/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null); // משתמש
  const [role, setRole] = useState(localStorage.getItem("role")); // תפקיד

  useEffect(() => {
    const loadUser = () => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);

      if (storedToken) {
        try {
          const decoded = jwtDecode(storedToken);
          console.log("decoded token:", decoded);

          setUser({
            id: decoded.UserId,
            email: decoded.email,
            username: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
          });
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    loadUser();
    
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  const login = (newToken, newRole) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);
    setToken(newToken);
    setRole(newRole);

    try {
      const decoded = jwtDecode(storedToken);
      console.log("decoded token:", decoded);

      setUser({
        id: decoded.UserId,
        email: decoded.email,
        username: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      });
    } catch {
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
