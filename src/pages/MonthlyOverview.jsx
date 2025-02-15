import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getBudgetItems } from "../services/budgetService"; // Ensure this function is correct
import MonthlyOverview from "../components/MonthlyOverView";
const MonthlyOverviewPage = () => {
  const { monthKey } = useParams(); // Get the clicked monthKey from URL
  const { user } = useAuth();
  const [monthlyData, setMonthlyData] = useState(null);
  const [loading, setLoading] = useState(true);
//console.log(monthKey);

useEffect(() => {
  const fetchMonthlyData = async () => {
    if (!user || !monthKey) {
      console.error("User or monthKey is missing.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log("Fetching data for monthKey:", monthKey);

      const data = await getBudgetItems(user.uid, monthKey);
      console.log("Fetched data:", data);

      if (data && Object.keys(data).length > 0) {
        setMonthlyData(data);
      } else {
        console.warn("No data found for this month.");
        setMonthlyData({});
      }
    } catch (error) {
      console.error("Error fetching monthly data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchMonthlyData();
}, [user, monthKey]); 
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="px-4 py-8">
      {/* <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Detailed Summary for {monthKey}
      </h1> */}
      {monthlyData ? <MonthlyOverview monthlyData={monthlyData} monthKey={monthKey}/> : <p>No data available for this month.</p>}
    </div>
  );
};

export default MonthlyOverviewPage;
