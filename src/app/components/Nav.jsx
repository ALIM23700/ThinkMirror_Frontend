"use client";

import Link from "next/link";

const Nav = () => {
  return (
    <nav className="w-full bg-white dark:bg-zinc-900 shadow-sm px-6 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <h1 className="text-xl font-bold">
        ThinkMirror 🧠
      </h1>

      {/* Links */}
      <div className="flex items-center gap-6">
        <Link href="/" className="hover:text-blue-500">
          Home
        </Link>

        <Link href="/history" className="hover:text-blue-500">
          History
        </Link>
      </div>

    </nav>
  );
};

export default Nav;