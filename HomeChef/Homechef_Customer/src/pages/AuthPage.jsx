import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      toast.success("Welcome, chef! 👨‍🍳");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black px-4 py-16">
      <ToastContainer />
      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-[0_10px_30px_rgba(0,0,0,0.4)] dark:bg-gray-900">
        <h2 className="mb-6 text-center text-3xl font-extrabold tracking-wide text-gray-800 dark:text-white">
          Login to HomeChef 🍽️
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="mb-1 block font-medium text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-1 block font-medium text-gray-700 dark:text-gray-200">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 py-3 font-semibold text-white shadow-md transition hover:opacity-90"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
