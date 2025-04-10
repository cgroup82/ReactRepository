import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import FavoritesPage from "./pages/PrivateUserPages/FavoritesPage";
import MyRecipesPage from "./pages/PrivateUserPages/MyRecipesPage";
import PrivateRoute from "./components/PrivateRoute";
import useNotifications from "./hooks/useNotifications"; // ודא שהקובץ
//הזה קיים
import RecipeProfilePage from "./pages/RecipeProfilePage"; // ייבוא חדש

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  useNotifications((notification) => {
    toast.info(notification.content || "🔔 התראה חדשה!");
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/recipes/:id" element={<RecipeProfilePage />} />

        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-recipes"
          element={
            <PrivateRoute>
              <MyRecipesPage />
            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={
            <div className="flex h-[70vh] items-center justify-center text-2xl font-semibold">
              404 - Page Not Found 🚫
            </div>
          }
        />
      </Routes>

      {/* 💬 הודעות toast */}
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </div>
  );
}
