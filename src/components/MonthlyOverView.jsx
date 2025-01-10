import React, { useState } from "react";
import { formatNaira } from "../utils/currency";
import { getCurrentMonth } from "../utils/dateHelpers";
import { FiTrendingUp, FiTrendingDown, FiAlertTriangle, FiSave } from "react-icons/fi";

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
  const remainingWithoutSavings = totalIncome - totalOutgoing - totalSavings;
  const remainingWithSavings = totalIncome - totalOutgoing;
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const getTooltipMessage = () => {
    if (totalIncome === 0 && totalOutgoing === 0 && totalSavings === 0) {
      return "No financial data recorded yet, but don't worry, we're all broke sometimes.";
    }
    if (totalIncome === 0 && totalOutgoing === 0 && totalSavings !== 0) {
      return "You No get Money You dey Save.";
    }
    if (totalOutgoing > totalIncome && totalSavings >= totalOutgoing) {
      return "Your savings are covering your expenses, but your income is still lacking.";
    }
    if (totalOutgoing >= totalIncome && totalSavings === 0) {
      return "Your expenses are eating up your income and you have no savings.";
    }
    if (totalIncome < totalExpenses && totalSavings === 0) {
      return "Your income can't cover your expenses and you have no savings.";
    }
    if (totalSavings > totalIncome && totalIncome > totalExpenses) {
      return "Your savings are greater than your income, and you're still breezing through your expenses.";
    }
    if (totalOutgoing >= totalIncome) {
      return "Warning: You're spending more than you're earning!";
    }
    return "Your finances are looking great! Keep the good vibes going.";
  };

  const getStatusMessage = () => {
    const message = (() => {
      if (totalIncome === 0 && totalOutgoing === 0 && totalSavings === 0) {
        return `No financial data recorded yet, but don't worry, we're all broke sometimes. \n #BrokeButHappy #ChillNoMoney #ifibrokenamybusiness #Sapa`;
      }
      if (totalIncome === 0 && totalOutgoing === 0 && totalSavings !== 0) {
        return `You No get Money You dey Save. \n #smilesinSapa #ChillNoMoney #SavingsDey #NoIncome`;
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
    })();

    return message.split(/(\s#\w+)/).map((part, index) => {
      if (part.startsWith(" #")) {
        return (
          <span key={index} className="text-[11px] text-white">
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft py-5 px-2 mb-8 lg:mx-5">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 mx-6">
        {month} {year} Overview
      </h2>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 md:gap-4 lg:gap-6 space-y-3 md:space-y-0">
        <div
          className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 group relative"
          title="Total of your income"
        >
          <div className="flex items-center justify-between">
            <span className="text-green-600 dark:text-green-400">Income</span>
            <FiTrendingUp className="text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-700 dark:text-green-300 mt-2">
            {formatNaira(totalIncome)}
          </p>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity text-green-600 dark:text-green-400 duration-200 mt-2 text-sm">
            {monthlyData?.income ? (
              <>
                {monthlyData?.income?.map((item) => (
                  <div key={item.id}>
                    {item.description} - {formatNaira(item.amount)}
                  </div>
                ))}
              </>
            ) : (
              <small>Zero</small>
            )}
          </div>
        </div>

        <div
          className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 group relative"
          title="Total savings made this month"
        >
          <div className="flex items-center justify-between">
            <span className="text-blue-600 dark:text-blue-400">Savings</span>
            <FiSave className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-300 mt-2">
            {formatNaira(totalSavings)}
          </p>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-2 text-sm text-blue-600 dark:text-blue-400">
            {monthlyData?.savings ? (
              <>
                {monthlyData?.savings?.map((item) => (
                  <div key={item.id}>
                    {item.description} - {formatNaira(item.amount)}
                  </div>
                ))}
              </>
            ) : (
              <small>Zero</small>
            )}
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
            Expenses: {formatNaira(totalExpenses)} | Bills: {formatNaira(totalBills)} |
            Debt: {formatNaira(totalDebt)}
          </div>
        </div>

        <div
          className={`p-2 rounded-lg group relative ${
            isInDangerZone
              ? "bg-red-50 dark:bg-red-900/20"
              : "bg-emerald-50 dark:bg-emerald-900/20"
          }`}
          title={getTooltipMessage()}
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
          ></p>
          <p className="text-[16px] mt-2 text-green-900">
            Balance: (Securing Your Savings 🔐) {formatNaira(remainingWithoutSavings)}
          </p>
          <p className="text-[16px] mt-2 text-red-600">
            Balance: (Unlocking Your Savings 🔓) {formatNaira(remainingWithSavings)}
          </p>

          {isMessageVisible && (
            <div className="absolute w-full top-full left-1/2 transform -translate-x-1/2 mt-2 bg-pink-800 text-white text-[15px] capitalize p-2 rounded-lg shadow-lg opacity-90">
              {getStatusMessage()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthlyOverview;