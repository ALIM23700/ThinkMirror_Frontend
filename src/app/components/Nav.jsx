"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Nav = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [open, setOpen] = useState(false);

  // 🔥 always sync with localStorage
  useEffect(() => {
    const syncToken = () => {
      setToken(localStorage.getItem("token"));
    };

    syncToken(); // initial load

    // optional: handle back/forward navigation
    window.addEventListener("focus", syncToken);

    return () => {
      window.removeEventListener("focus", syncToken);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null); // 🔥 force UI update
    setOpen(false);
    router.push("/login");
  };

  return (
    <nav className="w-full bg-white dark:bg-zinc-900 shadow-sm px-6 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <h1 className="text-xl font-bold">
        ThinkMirror 🧠
      </h1>

      {/* Mobile button */}
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