import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-soft">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <img 
            src={isDark ? "./2-removebg.png" : "./1-removebg.png"} 
            alt="Trackly Logo" 
            className="w-[50px]" 
          />
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 
            transition-colors focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary-dark/30"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <FiSun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <FiMoon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
