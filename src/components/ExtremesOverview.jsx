import React from "react";
import { formatNaira } from "../utils/currency";
import { PiggyBank, ShoppingBag, TrendingUp, TrendingDown, BadgeDollarSign, Wallet } from "lucide-react"; // Lucide Icons

const ExtremesOverview = ({ allMonthsData }) => {
  const findExtremes = () => {
    const extremes = {
      highestSavings: { month: "", amount: 0 },
      lowestSavings: { month: "", amount: Infinity },
      highestSpending: { month: "", amount: 0 },
      lowestSpending: { month: "", amount: Infinity },
      highestIncome: { month: "", amount: 0 },
      lowestIncome: { month: "", amount: Infinity },
    };

    allMonthsData.forEach(({ monthKey, data }) => {
      const income = data.income.reduce((sum, item) => sum + item.amount, 0);
      const expenses = data.expenses.reduce((sum, item) => sum + item.amount, 0);
      const savings = data.savings.reduce((sum, item) => sum + item.amount, 0);

      if (income > extremes.highestIncome.amount)
        extremes.highestIncome = { month: monthKey, amount: income };
      if (income < extremes.lowestIncome.amount)
        extremes.lowestIncome = { month: monthKey, amount: income };

      if (expenses > extremes.highestSpending.amount)
        extremes.highestSpending = { month: monthKey, amount: expenses };
      if (expenses < extremes.lowestSpending.amount)
        extremes.lowestSpending = { month: monthKey, amount: expenses };

      if (savings > extremes.highestSavings.amount)
        extremes.highestSavings = { month: monthKey, amount: savings };
      if (savings < extremes.lowestSavings.amount)
        extremes.lowestSavings = { month: monthKey, amount: savings };
    });

    return extremes;
  };

  const extremes = findExtremes();

  return (
    <div className="bg-pink-100 dark:bg-pink-900 rounded-2xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-pink-700 dark:text-pink-300 mb-6 text-center">
       Extremes Overview 
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Highest Savings */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center gap-4">
          <PiggyBank className="text-green-500 w-10 h-10" />
          <div>
            <p className="text-lg font-semibold text-gray-700 dark:text-white">Highest Savings</p>
            <p className="text-pink-700 dark:text-pink-300 font-bold">
              {extremes.highestSavings.month}: {formatNaira(extremes.highestSavings.amount)}
            </p>
          </div>
        </div>

        {/* Lowest Savings */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center gap-4">
          <Wallet className="text-red-500 w-10 h-10" />
          <div>
            <p className="text-lg font-semibold text-gray-700 dark:text-white">Lowest Savings</p>
            <p className="text-red-600 dark:text-red-400 font-bold">
              {extremes.lowestSavings.month}: {formatNaira(extremes.lowestSavings.amount)}
            </p>
          </div>
        </div>

        {/* Highest Spending */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center gap-4">
          <ShoppingBag className="text-blue-500 w-10 h-10" />
          <div>
            <p className="text-lg font-semibold text-gray-700 dark:text-white">Highest Spending</p>
            <p className="text-blue-700 dark:text-blue-300 font-bold">
              {extremes.highestSpending.month}: {formatNaira(extremes.highestSpending.amount)}
            </p>
          </div>
        </div>

        {/* Lowest Spending */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center gap-4">
          <TrendingDown className="text-yellow-500 w-10 h-10" />
          <div>
            <p className="text-lg font-semibold text-gray-700 dark:text-white">Lowest Spending</p>
            <p className="text-yellow-700 dark:text-yellow-300 font-bold">
              {extremes.lowestSpending.month}: {formatNaira(extremes.lowestSpending.amount)}
            </p>
          </div>
        </div>

        {/* Highest Income */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center gap-4">
          <BadgeDollarSign className="text-green-600 w-10 h-10" />
          <div>
            <p className="text-lg font-semibold text-gray-700 dark:text-white">Highest Income</p>
            <p className="text-green-700 dark:text-green-300 font-bold">
              {extremes.highestIncome.month}: {formatNaira(extremes.highestIncome.amount)}
            </p>
          </div>
        </div>

        {/* Lowest Income */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center gap-4">
          <TrendingUp className="text-gray-500 w-10 h-10" />
          <div>
            <p className="text-lg font-semibold text-gray-700 dark:text-white">Lowest Income</p>
            <p className="text-gray-700 dark:text-gray-400 font-bold">
              {extremes.lowestIncome.month}: {formatNaira(extremes.lowestIncome.amount)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtremesOverview;
