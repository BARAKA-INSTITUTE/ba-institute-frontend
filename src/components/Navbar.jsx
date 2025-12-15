import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { navLinks } from "@utils/constants";

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const navBg = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-gray-100 text-gray-900";
  const [open, setOpen] = useState(false);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`${navBg} sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-md transition-colors duration-300 border-b`}
    >
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => handleScroll("home")}
      >
        <img src="/logo.png" alt="logo" className="h-8" />
        <p className="font-semibold text-xl tracking-wide">Baraka Institute</p>
      </div>

      <ul className="hidden md:flex items-center space-x-8">
        {navLinks.map(({ id, name, targetId }) => {
          if (id === 5) {
            return (
              <li
                key={id}
                className="cursor-pointer hover:text-emerald-400 transition-colors duration-200"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                <i
                  className={
                    isDarkMode ? "fa-solid fa-moon" : "fa-solid fa-sun"
                  }
                ></i>
              </li>
            );
          }

          const linkColor = isDarkMode
            ? "hover:text-emerald-300"
            : "hover:text-emerald-400";

          return (
            <li
              key={id}
              className={`cursor-pointer transition-colors duration-200 ${linkColor}`}
              onClick={() => handleScroll(targetId)}
            >
              {name}
            </li>
          );
        })}
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

      <Sidebar open={open} onClose={() => setOpen(false)} />
    </nav>
  );
};

export default Navbar;
