import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';
import { useAuth } from '../context/AuthContext';
import MonthlySummary from '../components/MonthlySummary';
import ComparativeChart from '../components/ComperativeChart';
import ExtremesOverview from '../components/ExtremesOverview';
import { Link } from 'react-router-dom'; // Added Link

const YearlyOverview = () => {
  const { user } = useAuth();
  const [allMonthsData, setAllMonthsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllMonthsData = async () => {
      try {
        setLoading(true);
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const monthlyBudgets = userDoc.data().monthlyBudgets || {};
          const months = Object.entries(monthlyBudgets).map(([monthKey, data]) => ({
            monthKey,
            data,
          }));
          setAllMonthsData(months);
        } else {
          console.error("User data not found.");
        }
      } catch (error) {
        console.error('Error fetching monthly data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAllMonthsData();
    }
  }, [user]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  const convertMonthKeyToReadable = (monthKey) => {
    if (!monthKey) return "";
    const [year, month] = monthKey.split("-");
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
  };
  //const readableMonth = convertMonthKeyToReadable(monthKey);
  return (
    <div className="px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Yearly Overview</h1>

      {/* Monthly Data Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {allMonthsData.map(({ monthKey, data }) => (
          <Link key={monthKey} to={`/overview/${monthKey}`} className="block hover:scale-105 transition-transform">
            <MonthlySummary monthKey={monthKey} data={data} />
          </Link>
        ))}
      </div>

      {/* Comparative Chart */}
      <div className="mt-8">
        <ComparativeChart allMonthsData={allMonthsData} />
      </div>

      {/* Extremes Overview */}
      <div className="mt-8">
        <ExtremesOverview allMonthsData={allMonthsData} />
      </div>
    </div>
  );
};

export default YearlyOverview;
