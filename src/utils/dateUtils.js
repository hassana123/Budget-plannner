import { format, isAfter, isBefore, startOfDay } from 'date-fns';

export const RAMADAN_START_DATE = new Date('2025-03-01');
export const RAMADAN_END_DATE = new Date('2025-03-30');

export function getCurrentRamadanDay() {
  const today = startOfDay(new Date());
  const startDay = startOfDay(RAMADAN_START_DATE);
  
  // If before Ramadan, return 0
  if (isBefore(today, startDay)) {
    return 0;
  }
  
  // If after Ramadan, return 30
  if (isAfter(today, RAMADAN_END_DATE)) {
    return 30;
  }
  
  const diffTime = Math.abs(today - startDay);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.min(diffDays, 30);
}

export function isRamadanStarted() {
  const today = startOfDay(new Date());
  return !isBefore(today, RAMADAN_START_DATE);
}

export function getDaysProgress() {
  const currentDay = getCurrentRamadanDay();
  return Array.from({ length: 30 }, (_, index) => ({
    day: index + 1,
    isAccessible: index < currentDay,
    isCurrent: index + 1 === currentDay,
  }));
}

export const dailyDuas = [
  {
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    translation: 'Our Lord! Grant us good in this world and good in the hereafter, and save us from the punishment of the fire.',
    reference: 'Surah Al-Baqarah 2:201'
  },
  {
    arabic: 'رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ',
    translation: 'Our Lord! Accept from us; indeed, You are the All-Hearing, the All-Knowing.',
    reference: 'Surah Al-Baqarah 2:127'
  },
  // Add more duas for each day
];

export const dailyDhikr = [
  {
    day: 1,
    items: [
      { name: 'Istighfar 70 times', target: 70 },
      { name: 'SubhanAllah 100 times', target: 100 },
      { name: 'Morning Adhkar', target: 1 },
      { name: 'Evening Adhkar', target: 1 }
    ]
  },
  {
    day: 2,
    items: [
      { name: 'Alhamdulillah 100 times', target: 100 },
      { name: 'La ilaha illa Allah 100 times', target: 100 },
      { name: 'Morning Adhkar', target: 1 },
      { name: 'Evening Adhkar', target: 1 }
    ]
  },
  // Add more daily dhikr combinations
];