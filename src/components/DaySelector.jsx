import { motion } from 'framer-motion';
import { CalendarIcon, LockClosedIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

function DaySelector({ days, selectedDay, setSelectedDay }) {
  return (
    <div className="mt-8">
      <div className="bg-white/90 rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <CalendarIcon className="h-6 w-6 text-primary-600" />
          <h3 className="text-lg font-medium text-secondary-800">
            Ramadan Journal
          </h3>
        </div>
        
        <div className="grid grid-cols-6 md:grid-cols-10 gap-2">
          {days.map(({ day, isAccessible, isCurrent }) => (
            <button
              key={day}
              onClick={() => isAccessible && setSelectedDay(day)}
              disabled={!isAccessible}
              className={`
                relative p-3 rounded-lg border transition-all
                ${isAccessible 
                  ? day === selectedDay
                    ? 'bg-primary-100 border-primary-300 ring-2 ring-primary-500'
                    : 'hover:bg-gray-100 border-gray-200'
                  : 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                }
              `}
            >
              <span className="text-sm font-medium">
                Day {day}
              </span>
              
              {!isAccessible && (
                <LockClosedIcon className="h-4 w-4 text-gray-400 absolute top-1 right-1" />
              )}
              
              {isAccessible && day !== selectedDay && (
                <CheckCircleIcon className="h-4 w-4 text-primary-600 absolute top-1 right-1" />
              )}
              
              {isCurrent && (
                <motion.div
                  className="absolute inset-0 rounded-lg ring-2 ring-yellow-400"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DaySelector;