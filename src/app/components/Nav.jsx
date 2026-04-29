"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Nav = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [open, setOpen] = useState(false); // 🔥 mobile menu toggle

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/login");
  };

  return (
    <nav className="w-full bg-white dark:bg-zinc-900 shadow-sm px-6 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <h1 className="text-xl font-bold">
        ThinkMirror 🧠
      </h1>

      {/* 🔥 Mobile menu button */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Links */}
      <div
        className={`
          flex-col md:flex-row md:flex items-center gap-6
          absolute md:static top-16 left-0 w-full md:w-auto
          bg-white dark:bg-zinc-900 md:bg-transparent
          shadow-md md:shadow-none p-4 md:p-0
          ${open ? "flex" : "hidden md:flex"}
        `}
      >
        <Link href="/" className="hover:text-blue-500">
          Home
        </Link>

        <Link href="/history" className="hover:text-blue-500">
          History
        </Link>

        {/* If NOT logged in */}
        {!token && (
          <>
            <Link href="/login" className="hover:text-blue-500">
              Login
            </Link>

            <Link href="/signup" className="hover:text-blue-500">
              Signup
            </Link>
          </>
        )}

        {/* If logged in */}
        {token && (
          <button
            onClick={handleLogout}
            className="hover:text-red-500"
          >
            Logout
          </button>
        )}
      </div>

    </nav>
  );
};

export default Nav;