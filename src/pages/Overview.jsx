import React from 'react';
import MonthSelector from '../components/MonthSelector';
import MonthlyOverview from '../components/MonthlyOverView';
import { useMonthlyData } from '../hooks/useMonthlyData';

const Overview = () => {
  const { monthlyData, loading } = useMonthlyData();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto my-5">
      <MonthlyOverview monthlyData={monthlyData} />
    </div>
  );
};
export default Overview;