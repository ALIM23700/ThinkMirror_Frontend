"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/analyze/login",
        form
      );

      // 🔐 store token
      localStorage.setItem("token", res.data.token);

      alert("Login successful!");
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-black px-3 sm:px-4">
      
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 p-4 sm:p-6 rounded-xl shadow-md">

        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          Login 🧠
        </h1>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded dark:bg-zinc-800 text-sm sm:text-base"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded dark:bg-zinc-800 text-sm sm:text-base"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 text-sm sm:text-base"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>
    </div>
  );
}