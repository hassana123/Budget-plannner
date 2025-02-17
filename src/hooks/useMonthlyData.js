import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';
import { useAuth } from '../context/AuthContext';
import { getMonthNumber } from '../utils/dateHelpers';
import { getCurrentMonth } from '../utils/dateHelpers';
import toast from 'react-hot-toast';

export const useMonthlyData = () => {
  const { user } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth().month);
  const [monthlyData, setMonthlyData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const { year } = getCurrentMonth();
        const monthKey = `${year}-${getMonthNumber(selectedMonth)}`;
        
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          console.warn('User document does not exist.');
          setMonthlyData({});
          return;
        }

        const monthlyBudgets = userDoc.data().monthlyBudgets || {};
        setMonthlyData(monthlyBudgets[monthKey] || {});
      } catch (error) {
        console.error('Error fetching budget items:', error);
        toast.error('Error loading budget items');
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyData();
  }, [user, selectedMonth]);

  return {
    monthlyData,
    setMonthlyData,
    loading,
    selectedMonth,
    setSelectedMonth,
  };
};
