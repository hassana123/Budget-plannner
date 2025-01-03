import React from 'react';
import { getCurrentMonth } from '../utils/dateHelpers';
import { FiCheck } from 'react-icons/fi';

const MonthSelector = ({ selectedMonth, onMonthSelect, layout = 'flex' }) => {
  const { month: currentMonth } = getCurrentMonth();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const gridStyles = layout === 'grid' 
    ? 'grid grid-cols-2 sm:grid-cols-3 gap-4' 
    : 'flex flex-wrap gap-4';

  return (
    <div className={gridStyles}>
      {months.map((month) => {
        const isCurrentMonth = month === currentMonth;
        const isPastMonth = months.indexOf(month) < months.indexOf(currentMonth);
        const isSelected = month === selectedMonth;
        
        return (
          <button
            key={month}
            onClick={() => onMonthSelect(month)}
            disabled={!isPastMonth && !isCurrentMonth}
            className={`
              relative w-full p-4 rounded-xl text-left transition-all
              ${isSelected
                ? 'bg-primary text-white shadow-lg scale-[1.02]'
                : isPastMonth || isCurrentMonth
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  : 'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
              }
            `}
          >
            <span className="text-lg font-medium">{month}</span>
            {isSelected && (
              <FiCheck className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5" />
            )}
            {isCurrentMonth && !isSelected && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-primary-dark dark:text-primary-light">
                Current
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
export default MonthSelector;