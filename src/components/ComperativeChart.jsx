import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ComparativeChart = ({ allMonthsData }) => {
  const labels = allMonthsData.map(({ monthKey }) => {
    const [year, month] = monthKey.split('-').map(Number);
    const date = new Date(year, month - 1);
    return date.toLocaleString('default', { month: 'short', year: 'numeric' });
  });

  const calculateTotal = (items) => items?.reduce((sum, item) => sum + item.amount, 0) || 0;

  const incomeData = allMonthsData.map(({ data }) => calculateTotal(data.income));
  const expensesData = allMonthsData.map(({ data }) => calculateTotal(data.expenses));
  const savingsData = allMonthsData.map(({ data }) => calculateTotal(data.savings));

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.3)',
        fill: false,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: 'Expenses',
        data: expensesData,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.3)',
        fill: false,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: 'Savings',
        data: savingsData,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.3)',
        fill: false,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#374151',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      title: {
        display: true,
        text: 'Financial Overview: Income vs Expenses vs Savings',
        font: {
          size: 20,
          weight: 'bold',
        },
        color: '#1f2937',
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
            let explanation = '';

            switch (label) {
              case 'Income':
                explanation = 'Total income earned in this month.';
                break;
              case 'Expenses':
                explanation = 'Total amount spent. Watch for rising trends.';
                break;
              case 'Savings':
                explanation = 'Portion of income that was saved.';
                break;
              default:
                explanation = '';
            }

            return [`${label}: ₦${value.toLocaleString()}`, explanation];
          },
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    scales: {
      y: {
        ticks: {
          color: '#4b5563',
          callback: (value) => `₦${value}`,
        },
        title: {
          display: true,
          text: 'Amount (₦)',
          color: '#374151',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      x: {
        ticks: {
          color: '#4b5563',
        },
        title: {
          display: true,
          text: 'Month',
          color: '#374151',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md h-[450px] transition hover:shadow-lg">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default ComparativeChart;
