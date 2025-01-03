import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getBudgetItems } from '../services/budgetService';
import { getCurrentMonth } from '../utils/dateHelpers';
import toast from 'react-hot-toast';

export const useMonthlyData = () => {
  const { user } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth().month);
  const [monthlyData, setMonthlyData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBudgetItems = async () => {
      try {
        setLoading(true);
        const { year } = getCurrentMonth();
        const items = await getBudgetItems(user.uid, selectedMonth, year);
        setMonthlyData(items);
      } catch (error) {
        toast.error('Error loading budget items');
      } finally {
        setLoading(false);
      }
    };

    loadBudgetItems();
  }, [user, selectedMonth]);

  return {
    monthlyData,
    setMonthlyData,
    loading,
    selectedMonth,
    setSelectedMonth
  };
};