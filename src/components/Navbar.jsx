import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "./Sidebar";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { navLinks } from "@utils/constants";

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const { t } = useTranslation();
  const navSurface = isDarkMode
    ? "text-white bg-slate-900/70 border-white/10 shadow-lg"
    : "text-gray-900 bg-white/70 border-white/50 shadow-lg";
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks
        .filter(link => link.targetId)
        .map(link => link.targetId);

      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <p className="font-semibold text-xl tracking-wide">Baraka Institute</p>
      </div>

      <ul className="hidden md:flex items-center space-x-8">
        {navLinks.map(({ id, name, targetId }) => {
          if (id === 5) {
            return (
              <li key={id}>
                <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
              </li>
            );
          }

          const linkColor = isDarkMode
            ? "hover:text-emerald-300"
            : "hover:text-emerald-400";

          const isActive = activeSection === targetId;
          const activeColor = isDarkMode ? "text-emerald-400" : "text-emerald-600";

          return (
            <li
              key={id}
              className={`cursor-pointer transition-colors duration-200 ${
                isActive ? activeColor : linkColor
              } ${isActive ? "font-semibold" : ""}`}
              onClick={() => handleScroll(targetId)}
            >
              {t(name.toLowerCase())}
            </li>
          );
        })}
      </ul>

      <div className="hidden md:block">
        <LanguageSwitcher />
      </div>

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

      <Sidebar open={open} onClose={() => setOpen(false)} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} activeSection={activeSection} />
    </nav>
  );
};

export default Navbar;
