import React from "react";
import { navLinks } from "@utils/constants";
import { navIcons } from "@utils/constants";
const Sidebar = ({ open, onClose }) => {
  return (
    <>
      <div
        className={`
          fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300
          ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
        onClick={onClose}
      />

      <div
        className={`
          fixed top-0 right-0 h-full w-64 
          bg-white/10 backdrop-blur-xl 
          text-white shadow-2xl border-l border-white/10 z-50

          transform transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 focus:outline-none"
        >
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="mt-20 px-6 flex flex-col space-y-6 text-lg ">
          {navLinks.map(({ id, name }) => {
            const iconObj = navIcons.find((icon) => icon.id === id);

            return (
              <p
                key={id}
                onClick={onClose}
                className="cursor-pointer hover:text-emerald-400 transition-colors duration-200 flex items-center gap-4  "
              >
                <i className={iconObj?.icon}></i>
                {name}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
