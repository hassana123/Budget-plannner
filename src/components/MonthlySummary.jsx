import React from 'react';
import { formatNaira } from '../utils/currency'; // Helper function to format money
import { FiTrendingUp, FiTrendingDown, FiSave } from 'react-icons/fi';

const MonthlySummary = ({ monthKey, data }) => {
  const calculateTotal = (items) => items.reduce((sum, item) => sum + item.amount, 0);

  const incomeTotal = calculateTotal(data.income || []);
  const expensesTotal = calculateTotal(data.expenses || []);
  const savingsTotal = calculateTotal(data.savings || []);
  const debtTotal = calculateTotal(data.debt || []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-2">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{monthKey}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-green-600 dark:text-green-400">Income</span>
            <FiTrendingUp className="text-green-500" />
          </div>
          <p className="text-xl font-bold text-green-700 dark:text-green-300 mt-2">
            {formatNaira(incomeTotal)}
          </p>
        </div>
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-red-600 dark:text-red-400">Expenses</span>
            <FiTrendingDown className="text-red-500" />
          </div>
          <p className="text-xl font-bold text-red-700 dark:text-red-300 mt-2">
            {formatNaira(expensesTotal)}
          </p>
        </div>
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-blue-600 dark:text-blue-400">Savings</span>
            <FiSave className="text-blue-500" />
          </div>
          <p className="text-xl font-bold text-blue-700 dark:text-blue-300 mt-2">
            {formatNaira(savingsTotal)}
          </p>
        </div>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-yellow-600 dark:text-yellow-400">Debt</span>
            <FiTrendingDown className="text-yellow-500" />
          </div>
          <p className="text-xl font-bold text-yellow-700 dark:text-yellow-300 mt-2">
            {formatNaira(debtTotal)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MonthlySummary;
