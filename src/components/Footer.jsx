import { navLinks, socialLinks } from '@utils/constants'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        
        <ul className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
          {navLinks.map(({ id, name }) => (
            <li
              key={id}
              className="cursor-pointer hover:text-emerald-500 transition-colors duration-200"
            >
              {name}
            </li>
          ))}
        </ul>

        <div className="flex justify-center md:justify-start gap-4">
          {socialLinks.map(({ id, icon, url, name }) => (
            <a
              key={id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-emerald-500 transition-colors duration-200"
              aria-label={name}
            >
              <i className={`${icon} text-xl`}></i>
            </a>
          ))}
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-right">
          &copy; {new Date().getFullYear()} Baraka Institute. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
