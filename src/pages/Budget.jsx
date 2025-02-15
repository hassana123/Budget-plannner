import React, { useState } from 'react';
import MonthSelector from '../components/MonthSelector';
import BudgetCards from '../components/BudgetCards';
import Summary from '../components/Summary';
import { useMonthlyData } from '../hooks/useMonthlyData';
import { getCurrentMonth } from '../utils/dateHelpers';

const Budget = () => {
  const [showMonthPicker, setShowMonthPicker] = useState(true);
  const { monthlyData, setMonthlyData, loading, selectedMonth, setSelectedMonth } = useMonthlyData();

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setShowMonthPicker(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-2 lg:px-3 my-2 ">
      {showMonthPicker ? (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl max-w-lg w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Select Month
            </h2>
            <MonthSelector
              selectedMonth={selectedMonth}
              onMonthSelect={handleMonthSelect}
              layout="grid"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              {selectedMonth}'s Cash Chronicles
            </h1>
            <button
              onClick={() => setShowMonthPicker(true)}
              className="btn-secondary dark:text-white"
            >
              Change Month
            </button>
          </div>
          
          <Summary
            income={monthlyData.income || []}
            expenses={monthlyData.expenses || []}
            bills={monthlyData.bills || []}
            savings={monthlyData.savings || []}
            debt={monthlyData.debt || []}
          />
          
          <BudgetCards
            initialMonthlyData={monthlyData}
            isCurrentMonth={selectedMonth === getCurrentMonth().month}
            setMonthlyData={setMonthlyData}
            month={selectedMonth}
            year={2025}
          />
        </>
      )}
    </div>
  );
};
export default Budget;