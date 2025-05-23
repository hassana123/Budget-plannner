import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { formatNaira } from '../utils/currency';
import { FiChevronDown } from 'react-icons/fi';

ChartJS.register(ArcElement, Tooltip, Legend);

const Summary = ({ income, expenses, bills, savings, debt }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const userName = localStorage.getItem("userName");
  const [totals, setTotals] = useState({});

  useEffect(() => {
    const calculateTotal = items => items.reduce((sum, item) => sum + item.amount, 0);
    const total = {
      income: calculateTotal(income),
      expenses: calculateTotal(expenses),
      bills: calculateTotal(bills),
      savings: calculateTotal(savings),
      debt: calculateTotal(debt),
    };
    setTotals(total);
  }, [income, expenses, bills, savings, debt]);

  const moneyIn = totals.income;
  const saving = totals.savings;
  const moneyOut = totals.expenses + totals.bills + totals.debt;
  const balanceWithSavings = moneyIn - moneyOut - saving;
  const balanceWithoutSavings = moneyIn - moneyOut;

  const chartData = {
    labels: ['Income', 'Expenses', 'Bills', 'Savings', 'Debt'],
    datasets: [
      {
        data: [totals.income, totals.expenses, totals.bills, totals.savings, totals.debt],
        backgroundColor: ['#FF6BA9', '#FF89B9', '#FFB4D1', '#FFD4E5', '#FF4D99'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
    },
    cutout: '70%',
  };

  return (
    <div className="card p-2 mx-2">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between"
      >
        <h2 className="text-sm text-gray-800 dark:text-white">
          Hey there   {userName ? `${userName} 👋` : '👋'} <br/> <small>Here's your January Summary</small>
        </h2>
        <FiChevronDown 
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
            isExpanded ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div className="p-3 text-[12px] bg-[#2f4f4f]  dark:from-primary-dark dark:to-primary rounded-lg">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">January Flex Funds: <br/>(Protected savings 🔐 )</span>
               <div className='w-10 h-[2px] bg-white'></div>
                <span className="text-white font-semibold">

                  {formatNaira(balanceWithSavings)}<br/> <small>(Savings Hero Mode)</small>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">January Flex Funds<br/> (savings at risk 🔓)</span>
               <div className='w-10 h-[2px] bg-white'></div>

                <span className="text-white font-semibold">
                  {formatNaira(balanceWithoutSavings)} <br/> <small>(YOLO Edition)</small>
                </span>
              </div>
            </div>
          </div>
      <div className={`
        grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden transition-all duration-300
        ${isExpanded ? 'max-h-[1000px] opacity-100 mt-3' : 'max-h-0 opacity-0'}
      `}>
        <div className="space-y-2">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-green-600 dark:text-green-400">Total Money In <br/> <small>(Earnings in January)</small></span>
              <span className="font-semibold text-green-700 dark:text-green-300">
                {formatNaira(moneyIn)}
              </span>
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-blue-600 dark:text-blue-400">Total Savings  <br/> <small>(Money Locked 🔐 Away)</small></span>
              <span className="font-semibold text-blue-700 dark:text-blue-300">
                {formatNaira(saving)}
              </span>
            </div>
          </div>

          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-red-600 dark:text-red-400">Total Money Out <br/> <small>(Where It All Went)</small></span>
              <span className="font-semibold text-red-700 dark:text-red-300">
                {formatNaira(moneyOut)}  
              </span>
            </div>
            <div className="mt-2 text-sm text-red-600 dark:text-red-400">
              Custom Expenses: {formatNaira(totals.expenses)} | Bills: {formatNaira(totals.bills)} | Debt: {formatNaira(totals.debt)}
            </div>
          </div>
        </div>
        <div className="w-full max-w-xs mx-auto">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Summary;
