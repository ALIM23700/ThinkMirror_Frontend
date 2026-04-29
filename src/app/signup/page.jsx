"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/analyze/register", form);

      alert("Signup successful!");
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-black px-3 sm:px-4">
      
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 p-4 sm:p-6 rounded-xl shadow-md">

        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          Create Account 🧠
        </h1>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded dark:bg-zinc-800 text-sm sm:text-base"
        />

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
          onClick={handleSignup}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 text-sm sm:text-base"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

      </div>
    </div>
  );
}