import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { formatNaira } from '../utils/currency';
import { FiChevronDown } from 'react-icons/fi';

ChartJS.register(ArcElement, Tooltip, Legend);

const Summary = ({ income, expenses, bills, savings, debt }) => {
  const [isExpanded, setIsExpanded] = useState(false);
const UserName=localStorage.getItem("userName");
  const calculateTotal = items => items.reduce((sum, item) => sum + item.amount, 0);

  const totals = {
    income: calculateTotal(income),
    expenses: calculateTotal(expenses),
    bills: calculateTotal(bills),
    savings: calculateTotal(savings),
    debt: calculateTotal(debt)
  };
  
const incoming = totals.income + totals.savings;
const outgoing = totals.expenses + totals.bills + totals.debt;
const netWorth = incoming - outgoing;


  const chartData = {
    labels: ['Income', 'Expenses', 'Bills', 'Savings', 'Debt'],
    datasets: [{
      data: [totals.income, totals.expenses, totals.bills, totals.savings, totals.debt],
      backgroundColor: [
        '#FF6BA9',
        '#FF89B9',
        '#FFB4D1',
        '#FFD4E5',
        '#FF4D99'
      ],
      borderWidth: 0,
    }]
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
    <div className="card p-5 mx-2">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between"
      >
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{`${UserName}'s Summary`} </h2>
        <FiChevronDown 
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
            isExpanded ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      
      <div className={`
        grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden transition-all duration-300
        ${isExpanded ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0'}
      `}>
        <div className="space-y-4">
          {Object.entries(totals).map(([key, value]) => (
            <div key={key} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="capitalize text-gray-600 dark:text-gray-300">{key}</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatNaira(value)}
                </span>
              </div>
            </div>
          ))}
          <div className="p-4 bg-gradient-to-r from-primary to-primary-light dark:from-primary-dark dark:to-primary rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">Net Worth</span>
              <span className="text-white font-semibold">
                {formatNaira(  netWorth)}
              </span>
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