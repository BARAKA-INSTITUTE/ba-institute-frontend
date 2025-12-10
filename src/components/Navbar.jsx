import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { navLinks } from "@utils/constants";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="bg-gray-900/80 backdrop-blur-lg text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="logo" className="h-8" />
          <p className="font-semibold text-xl tracking-wide">
            Baraka Institute
          </p>
        </div>

        <ul className="hidden md:flex items-center space-x-8">
          {navLinks.map(({ id, name }) => (
            <li
              key={id}
              className="cursor-pointer hover:text-emerald-400 transition-colors duration-200"
            >
              {name}
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen(true)}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 6h18M3 12h18M3 18h18"
            />
          </svg>
        </button>
      </nav>

      <Sidebar open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Navbar;
