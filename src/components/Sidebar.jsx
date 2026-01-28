import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { navLinks } from "@utils/constants";
import { navIcons } from "@utils/constants";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

const Sidebar = ({ open, onClose, isDarkMode, setIsDarkMode, activeSection }) => {
  const { t } = useTranslation();

  // Close sidebar on Escape key press or click outside
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && open) {
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (open && !event.target.closest('.sidebar-content')) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={` 
          fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 z-40
          ${
            open
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }
        `}
      />

      {/* Sidebar */}
      <div
        className={`
          sidebar-content fixed top-0 left-0 h-auto w-80 max-w-[90vw]
          ${isDarkMode 
            ? 'bg-slate-900 text-white border-r border-slate-700/50' 
            : 'bg-white text-gray-900 border-r border-gray-200/50'
          }
          backdrop-blur-xl shadow-2xl z-50
          transform transition-transform duration-300 ease-out rounded-r-2xl
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`
            absolute top-6 right-6 p-2 rounded-full transition-all duration-200
            ${isDarkMode 
              ? 'hover:bg-slate-800/50 text-white' 
              : 'hover:bg-gray-100/50 text-gray-900'
            }
            focus:outline-none focus:ring-2 focus:ring-emerald-500/50
          `}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Logo/Brand */}
        <div className={`pt-20 pb-8 px-6 border-b ${isDarkMode ? 'border-slate-700/50' : 'border-gray-200/20'}`}>
          <div className="flex items-center space-x-3">
            <h2 className="font-bold text-xl">Baraka Institute</h2>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-6 py-8">
          <nav className="space-y-2">
            {navLinks.map(({ id, name, targetId }) => {
              const iconObj = navIcons.find((icon) => icon.id === id);

              if (id === 5) {
                return null; // Skip the theme toggle from nav links
              }

              const isActive = activeSection === targetId;
              const activeBg = isDarkMode ? 'bg-emerald-600/20 border-l-4 border-emerald-400' : 'bg-emerald-50 border-l-4 border-emerald-500';
              const activeText = isDarkMode ? 'text-emerald-400' : 'text-emerald-600';

              return (
                <button
                  key={id}
                  onClick={() => {
                    onClose();
                    // Scroll to section if targetId exists
                    if (targetId) {
                      const element = document.getElementById(targetId);
                      if (element) element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={`
                    w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left
                    transition-all duration-200 group
                    ${isActive ? activeBg : ''}
                    ${isActive ? activeText : (isDarkMode 
                      ? 'hover:bg-slate-800/50 text-slate-200 hover:text-white' 
                      : 'hover:bg-gray-100/50 text-gray-700 hover:text-gray-900'
                    )}
                    focus:outline-none focus:ring-2 focus:ring-emerald-500/50
                  `}
                >
                  <i className={`${iconObj?.icon} text-lg min-w-[24px] group-hover:scale-110 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}></i>
                  <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>{t(name.toLowerCase())}</span>
                </button>
              );
            })}
          </nav>

          {/* Controls Section */}
          <div className={`mt-12 pt-8 border-t space-y-6 ${isDarkMode ? 'border-slate-700/50' : 'border-gray-200/20'}`}>
            {/* Language Toggle */}
            <div className="space-y-3">
              <h3 className={`text-sm font-semibold uppercase tracking-wide ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                Language
              </h3>
              <LanguageSwitcher />
            </div>

            {/* Theme Toggle */}
            <div className="space-y-3">
              <h3 className={`text-sm font-semibold uppercase tracking-wide ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                Theme
              </h3>
              <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
