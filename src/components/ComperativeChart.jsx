import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

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
  const labels = allMonthsData.map(({ monthKey }) => monthKey);

  const incomeData = allMonthsData.map(({ data }) => 
    data?.income?.reduce((sum, item) => sum + item.amount, 0) || 0
  );

  const expensesData = allMonthsData.map(({ data }) => 
    data?.expenses?.reduce((sum, item) => sum + item.amount, 0) || 0
  );

  const savingsData = allMonthsData.map(({ data }) => 
    data?.savings?.reduce((sum, item) => sum + item.amount, 0) || 0
  );

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
      },
      {
        label: 'Expenses',
        data: expensesData,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
      },
      {
        label: 'Savings',
        data: savingsData,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Financial Comparison',
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default ComparativeChart;
