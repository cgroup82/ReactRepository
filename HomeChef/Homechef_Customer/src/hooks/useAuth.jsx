//קבלת user מתוך JWT

import { useEffect, useState } from "react";
//import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser({
        id: decoded.id,
        email: decoded.email,
        username: decoded.username,
      });
    }
  }, []);

  return { user };
};
