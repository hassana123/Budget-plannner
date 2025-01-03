import React, { useState } from "react";
import { formatNaira } from "../utils/currency";
import { getCurrentMonth } from "../utils/dateHelpers";
import { FiTrendingUp, FiTrendingDown, FiAlertTriangle } from "react-icons/fi";

const MonthlyOverview = ({ monthlyData }) => {
  const { month, year } = getCurrentMonth();
  const totalIncome =
    monthlyData?.income?.reduce((sum, item) => sum + item.amount, 0) || 0;
  const totalExpenses =
    monthlyData?.expenses?.reduce((sum, item) => sum + item.amount, 0) || 0;
  const totalBills =
    monthlyData?.bills?.reduce((sum, item) => sum + item.amount, 0) || 0;
  const totalSavings =
    monthlyData?.savings?.reduce((sum, item) => sum + item.amount, 0) || 0;
  const totalDebt =
    monthlyData?.debt?.reduce((sum, item) => sum + item.amount, 0) || 0;

  const totalOutgoing = totalExpenses + totalBills + totalDebt;
  const isInDangerZone = totalOutgoing >= totalIncome;

  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const getStatusMessage = () => {
    if (totalIncome === 0 && totalOutgoing === 0) {
      return `No financial data recorded yet, but don't worry, we're all broke sometimes. \n #BrokeButHappy #ChillNoMoney #NaijaVibes #DrySeason`;
    }

    if (totalOutgoing > totalIncome && totalSavings >= totalOutgoing) {
      return `Your savings are covering your expenses, but your income is still lacking. \n #SavingsOnTop #PennySavedIsAPennyEarned #NaijaHustle #SavingsLife`;
    }

    if (totalOutgoing >= totalIncome && totalSavings === 0) {
      return "Your expenses are eating up your income and you have no savings. \n #SurvivalMode #ChasingBalance #SapaChronicles #HustleForLife";
    }

    if (totalIncome < totalExpenses && totalSavings === 0) {
      return `Your income can't cover your expenses and you have no savings. \n #FightingToSurvive #BalanceWeDeyFind #DebtLife #StrugglingHard`;
    }

    if (totalSavings > totalIncome && totalIncome > totalExpenses) {
      return `Your savings are greater than your income, and you're still breezing through your expenses. \n #FinancialGuru #MoneyMatters #HustlerVibes #JapaPlans`;
    }

    if (totalOutgoing >= totalIncome) {
      return `Warning: You're spending more than you're earning! \n #SapaOnTheHorizon #BudgetWahala #BrokeLife #SavingGraceNeeded`;
    }

    return "Your finances are looking great! Keep the good vibes going. \n #GoodVibesOnly #OnTheUpAndUp #MoneyGoals #FlexMode";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft py-5 px-2 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 mx-6">
        {month} {year} Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 group relative"
          title="Total of your income and savings"
        >
          <div className="flex items-center justify-between">
            <span className="text-green-600 dark:text-green-400">Money In</span>
            <FiTrendingUp className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-700 dark:text-green-300 mt-2">
            {formatNaira(totalIncome + totalSavings)}
          </p>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-2 text-sm text-green-600 dark:text-green-400">
            Income: {formatNaira(totalIncome)} | Savings:{" "}
            {formatNaira(totalSavings)}
          </div>
        </div>

        <div
          className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 group relative"
          title="Total of your expenses, bills, and debt payments"
        >
          <div className="flex items-center justify-between">
            <span className="text-red-600 dark:text-red-400">Money Out</span>
            <FiTrendingDown className="text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-700 dark:text-red-300 mt-2">
            {formatNaira(totalOutgoing)}
          </p>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-2 text-sm text-red-600 dark:text-red-400">
            Expenses: {formatNaira(totalExpenses)} | Bills:{" "}
            {formatNaira(totalBills)} | Debt: {formatNaira(totalDebt)}
          </div>
        </div>

        <div
          className={`p-2 rounded-lg group relative ${
            isInDangerZone
              ? "bg-red-50 dark:bg-red-900/20"
              : "bg-emerald-50 dark:bg-emerald-900/20"
          }`}
          title={getStatusMessage()}
          onMouseEnter={() => setIsMessageVisible(true)}
          onMouseLeave={() => setIsMessageVisible(false)}
        >
          <div className="flex items-center justify-between">
            <span
              className={
                isInDangerZone
                  ? "text-red-600 dark:text-red-400"
                  : "text-emerald-600 dark:text-emerald-400"
              }
            >
              Financial Status
            </span>
            {isInDangerZone ? (
              <div className="flex items-center gap-1 lg:gap-2 lg:px-2 px-1 py-1 rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-[12px] lg:text-sm">
                <FiAlertTriangle />
                <span>Danger Zone</span>
              </div>
            ) : (
              <div className="px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-sm">
                Safe Zone
              </div>
            )}
          </div>
          <p
            className={`text-2xl font-bold mt-2 ${
              isInDangerZone
                ? "text-red-700 dark:text-red-300"
                : "text-emerald-700 dark:text-emerald-300"
            }`}
          >
            {formatNaira(totalIncome - totalOutgoing)}
          </p>

          {/* Toast message styled here */}
          {isMessageVisible && (
            <div
              className="absolute top-full  my-1 left-1/2 transform -translate-x-1/2  -translate-y-2 dark:bg-white dark:text-black bg-pink-800 text-white text-md capitalize p-2 rounded-lg shadow-lg opacity-90"
              style={{
                // Adjust top position based on card height
                top: 'calc(100% + 10px)', 
              }}
            >
              {getStatusMessage()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthlyOverview;