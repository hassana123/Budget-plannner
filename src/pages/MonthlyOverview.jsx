import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getBudgetItems } from "../services/budgetService";
import MonthlyOverview from "../components/MonthlyOverView";
import { FiArrowLeft } from "react-icons/fi";

const MonthlyOverviewPage = () => {
  const { monthKey } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [monthlyData, setMonthlyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      if (!user || !monthKey) {
        console.error("User or monthKey is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getBudgetItems(user.uid, monthKey);
        if (data && Object.keys(data).length > 0) {
          setMonthlyData(data);
        } else {
          setMonthlyData({});
          console.warn("No data found for this month.");
        }
      } catch (error) {
        console.error("Error fetching monthly data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyData();
  }, [user, monthKey]);

  const formatMonthYear = (key) => {
    const [year, month] = key.split("-").map(Number);
    const date = new Date(year, month - 1);
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-gray-600 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  return (
    <div className=" py-8 w-[95%]  mx-auto">
      {/* Back Arrow */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
      >
        <FiArrowLeft className="mr-2" />
        Back to Overview
      </button>

      {/* Page Heading */}
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Detailed Summary for {formatMonthYear(monthKey)}
      </h1>

      {/* Overview Component */}
      {monthlyData ? (
        <MonthlyOverview monthlyData={monthlyData} monthKey={monthKey} />
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          No data available for this month.
        </p>
      )}
    </div>
  );
};

export default MonthlyOverviewPage;
