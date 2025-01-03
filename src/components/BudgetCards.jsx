import React, { useState } from 'react';
import BudgetCard from './BudgetCard';
import { useAuth } from '../context/AuthContext';
import { addBudgetItem, deleteBudgetItem } from '../services/budgetService';
import toast from 'react-hot-toast';

const BudgetCards = ({ initialMonthlyData, isCurrentMonth, setMonthlyData }) => {
    const { user } = useAuth();
   // const [monthlyData, setMonthlyData] = useState(initialMonthlyData);
  
    const handleAddItem = async (category, item) => {
      try {
        if (!isCurrentMonth) {
          toast.error('You can only add items for the current month');
          return;
        }
  
        await addBudgetItem(user.uid, category, item);
        setMonthlyData((prevData) => ({
          ...prevData,
          [category]: [...(prevData[category] || []), item],
        }));
        toast.success('Item added successfully');
      } catch (error) {
        toast.error('Error adding item');
      }
    };
  
    const handleDeleteItem = async (category, itemId) => { // Use itemId for deletion
      try {
        if (!isCurrentMonth) {
          toast.error('You can only delete items for the current month');
          return;
        }
  
        await deleteBudgetItem(user.uid, category, itemId); // Delete by itemId
        setMonthlyData((prevData) => ({
          ...prevData,
          [category]: (prevData[category] || []).filter((item) => item.id !== itemId), // Filter by id
        }));
        toast.success('Item deleted successfully');
      } catch (error) {
        toast.error('Error deleting item');
      }
    };
  
    const categories = [
      { id: 'income', title: 'Income', color: 'text-primary-dark' },
      { id: 'expenses', title: 'Expenses', color: 'text-primary' },
      { id: 'bills', title: 'Bills', color: 'text-primary-light' },
      { id: 'savings', title: 'Savings', color: 'text-secondary' },
      { id: 'debt', title: 'Debt', color: 'text-primary-dark' },
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {categories.map(({ id, title, color }) => (
          <BudgetCard
            key={id}
            title={title}
            items={initialMonthlyData[id] || []}
            onAddItem={(item) => handleAddItem(id, item)}
            onDeleteItem={(itemId) => handleDeleteItem(id, itemId)} // Pass itemId to delete
            color={color}
          />
        ))}
      </div>
    );
  };
  
export default BudgetCards;
