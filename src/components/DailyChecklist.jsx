import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, BookOpenIcon, MoonIcon, HeartIcon, StarIcon } from '@heroicons/react/24/solid';
import { dailyDuas, dailyDhikr } from '../utils/dateUtils';
import { saveToLocalStorage } from '../utils/storage';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

function DailyChecklist({ day, data, setData }) {
  const currentDua = dailyDuas[day - 1] || dailyDuas[0];
  const currentDhikr = dailyDhikr[day - 1] || dailyDhikr[0];

  useEffect(() => {
    if (data[day]) {
      saveToLocalStorage(data);
    }
  }, [data, day]);

  const handleCheckboxChange = (category, item) => {
    setData(prev => {
      const newData = {
        ...prev,
        [day]: {
          ...prev[day],
          [category]: {
            ...(prev[day]?.[category] || {}),
            [item]: !(prev[day]?.[category]?.[item] || false)
          }
        }
      };
      saveToLocalStorage(newData);
      return newData;
    });
  };

  const handleQuranInputChange = (field, value) => {
    setData(prev => {
      const newData = {
        ...prev,
        [day]: {
          ...prev[day],
          quran: {
            ...(prev[day]?.quran || {}),
            [field]: value
          }
        }
      };
      saveToLocalStorage(newData);
      return newData;
    });
  };

  const handleNotesChange = (value) => {
    setData(prev => {
      const newData = {
        ...prev,
        [day]: {
          ...prev[day],
          notes: value
        }
      };
      saveToLocalStorage(newData);
      return newData;
    });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div className="space-y-6">
        {/* Salah Section */}
        <motion.section
          variants={itemVariants}
          className="bg-white/90 rounded-2xl shadow-lg p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 islamic-pattern opacity-5" />
          <div className="flex items-center gap-2 mb-6">
            <MoonIcon className="h-6 w-6 text-primary-600" />
            <h3 className="text-xl font-display text-secondary-800">
              Salah Checklist
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha', 'Tarawih'].map(prayer => (
              <motion.button
                key={prayer}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCheckboxChange('salah', prayer.toLowerCase())}
                className={`
                  flex items-center justify-between p-4 rounded-lg border transition-all
                  ${data[day]?.salah?.[prayer.toLowerCase()]
                    ? 'bg-primary-100 border-primary-300'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }
                `}
              >
                <span className="font-display">{prayer}</span>
                {data[day]?.salah?.[prayer.toLowerCase()] && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <CheckIcon className="h-5 w-5 text-primary-600" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Quran Section */}
        <motion.section
          variants={itemVariants}
          className="bg-white/90 rounded-2xl shadow-lg p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 islamic-pattern opacity-5" />
          <div className="flex items-center gap-2 mb-6">
            <BookOpenIcon className="h-6 w-6 text-primary-600" />
            <h3 className="text-xl font-display text-secondary-800">
              Quran Tracker
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {['Verses', 'Pages', 'Juz'].map(field => (
              <div key={field}>
                <label className="block text-sm font-display text-secondary-600 mb-2">
                  {field}
                </label>
                <input
                  type="number"
                  value={data[day]?.quran?.[field.toLowerCase()] || ''}
                  onChange={(e) => handleQuranInputChange(field.toLowerCase(), e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-display"
                  placeholder="0"
                />
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <div className="space-y-6">
        {/* Dhikr Section */}
        <motion.section
          variants={itemVariants}
          className="bg-white/90 rounded-2xl shadow-lg p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 islamic-pattern opacity-5" />
          <div className="flex items-center gap-2 mb-6">
            <HeartIcon className="h-6 w-6 text-primary-600" />
            <h3 className="text-xl font-display text-secondary-800">
              Daily Dhikr
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {currentDhikr.items.map(item => (
              <motion.button
                key={item.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCheckboxChange('dhikr', item.name)}
                className={`
                  flex items-center justify-between p-4 rounded-lg border transition-all
                  ${data[day]?.dhikr?.[item.name]
                    ? 'bg-primary-100 border-primary-300'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }
                `}
              >
                <span className="font-display">{item.name}</span>
                {data[day]?.dhikr?.[item.name] && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <CheckIcon className="h-5 w-5 text-primary-600" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Dua of the Day */}
        <motion.section
          variants={itemVariants}
          className="bg-white/90 rounded-2xl shadow-lg p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 islamic-pattern opacity-5" />
          <div className="flex items-center gap-2 mb-6">
            <StarIcon className="h-6 w-6 text-primary-600" />
            <h3 className="text-xl font-display text-secondary-800">
              Dua of the Day
            </h3>
          </div>
          <div className="space-y-4">
            <p className="text-right font-quran text-2xl leading-loose text-secondary-700">
              {currentDua.arabic}
            </p>
            <p className="text-secondary-600 italic font-display">
              "{currentDua.translation}"
            </p>
            <p className="text-sm text-secondary-500">
              {currentDua.reference}
            </p>
          </div>
        </motion.section>

        {/* Notes Section */}
        <motion.section
          variants={itemVariants}
          className="bg-white/90 rounded-2xl shadow-lg p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 islamic-pattern opacity-5" />
          <h3 className="text-xl font-display text-secondary-800 mb-4">
            Notes
          </h3>
          <textarea
            value={data[day]?.notes || ''}
            onChange={(e) => handleNotesChange(e.target.value)}
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-display"
            placeholder="Write your reflections for today..."
          />
        </motion.section>
      </div>
    </motion.div>
  );
}

export default DailyChecklist;