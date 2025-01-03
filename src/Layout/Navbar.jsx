import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon, FiPieChart, FiCalendar, FiSettings } from 'react-icons/fi';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/overview', icon: FiPieChart, label: 'Overview' },
    { path: '/budget', icon: FiCalendar, label: 'Budget' },
    { path: '/settings', icon: FiSettings, label: 'Settings' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-soft fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <img 
              src={isDark ? "/1-removebg.png" : "/2-removebg.png"} 
              alt="Track.ly Logo" 
              className="w-[50px]" 
            />
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map(({ path, icon: Icon, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                    ${location.pathname === path
                      ? 'bg-primary/10 text-primary dark:bg-primary-dark/20 dark:text-primary-light'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>

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

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-soft-lg border-t dark:border-gray-700">
        <div className="flex justify-around py-1">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center space-y-1
                ${location.pathname === path
                  ? 'text-primary dark:text-primary-light'
                  : 'text-gray-600 dark:text-gray-300'
                }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;