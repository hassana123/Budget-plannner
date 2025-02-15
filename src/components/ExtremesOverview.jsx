import React from 'react';
import { formatNaira } from '../utils/currency'; 

const ExtremesOverview = ({ allMonthsData }) => {
  const findExtremes = () => {
    const extremes = {
      highestSavings: { month: '', amount: 0 },
      lowestSavings: { month: '', amount: Infinity },
      highestSpending: { month: '', amount: 0 },
      lowestSpending: { month: '', amount: Infinity },
      highestIncome: { month: '', amount: 0 },
      lowestIncome: { month: '', amount: Infinity },
    };

    allMonthsData.forEach(({ monthKey, data }) => {
      const income = data.income.reduce((sum, item) => sum + item.amount, 0);
      const expenses = data.expenses.reduce((sum, item) => sum + item.amount, 0);
      const savings = data.savings.reduce((sum, item) => sum + item.amount, 0);

      if (income > extremes.highestIncome.amount) extremes.highestIncome = { month: monthKey, amount: income };
      if (income < extremes.lowestIncome.amount) extremes.lowestIncome = { month: monthKey, amount: income };

      if (expenses > extremes.highestSpending.amount) extremes.highestSpending = { month: monthKey, amount: expenses };
      if (expenses < extremes.lowestSpending.amount) extremes.lowestSpending = { month: monthKey, amount: expenses };

      if (savings > extremes.highestSavings.amount) extremes.highestSavings = { month: monthKey, amount: savings };
      if (savings < extremes.lowestSavings.amount) extremes.lowestSavings = { month: monthKey, amount: savings };
    });

    return extremes;
  };

  const extremes = findExtremes();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Extremes Overview</h3>
      <div>
        <p><strong>Highest Savings:</strong> {extremes.highestSavings.month}: {formatNaira(extremes.highestSavings.amount)}</p>
        <p><strong>Lowest Savings:</strong> {extremes.lowestSavings.month}: {formatNaira(extremes.lowestSavings.amount)}</p>
        <p><strong>Highest Spending:</strong> {extremes.highestSpending.month}: {formatNaira(extremes.highestSpending.amount)}</p>
        <p><strong>Lowest Spending:</strong> {extremes.lowestSpending.month}: {formatNaira(extremes.lowestSpending.amount)}</p>
        <p><strong>Highest Income:</strong> {extremes.highestIncome.month}: {formatNaira(extremes.highestIncome.amount)}</p>
        <p><strong>Lowest Income:</strong> {extremes.lowestIncome.month}: {formatNaira(extremes.lowestIncome.amount)}</p>
      </div>
    </div>
  );
};

export default ExtremesOverview;
