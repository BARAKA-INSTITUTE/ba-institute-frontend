import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { navLinks } from "@utils/constants";

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const navSurface = isDarkMode
    ? "text-white bg-slate-900/70 border-white/10 shadow-lg"
    : "text-gray-900 bg-white/70 border-white/50 shadow-lg";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`${navSurface} fixed top-0 left-0 right-0 z-50 w-full px-6 py-4 flex items-center justify-between transition-colors duration-300 border-b backdrop-blur-xl backdrop-saturate-150`}
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
