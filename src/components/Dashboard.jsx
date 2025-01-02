import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import BudgetCard from './BudgetCard';
import Summary from './Summary';
import { useAuth } from '../context/AuthContext';
import { getBudgetItems, addBudgetItem, deleteBudgetItem } from '../services/budgetService';
import toast from 'react-hot-toast';

function Dashboard() {
  const { user } = useAuth();
  const UserId = localStorage.getItem("userId");
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [bills, setBills] = useState([]);
  const [savings, setSavings] = useState([]);
  const [debt, setDebt] = useState([]);
  const UserName=localStorage.getItem("userName");

  useEffect(() => {
    const loadBudgetItems = async () => {
      try {
        const items = await getBudgetItems(user.uid);
        setIncome(items.income || []);
        setExpenses(items.expenses || []);
        setBills(items.bills || []);
        setSavings(items.savings || []);
        setDebt(items.debt || []);
      } catch (error) {
        toast.error('Error loading budget items');
      }
    };

    loadBudgetItems();
  }, [user]);

  const handleAddItem = async (category, item) => {
    try {
      await addBudgetItem(UserId, category, item);
      const items = await getBudgetItems(UserId);
      
      // Update the corresponding state based on category
      switch (category) {
        case 'income':
          setIncome(items.income || []);
          break;
        case 'expenses':
          setExpenses(items.expenses || []);
          break;
        case 'bills':
          setBills(items.bills || []);
          break;
        case 'savings':
          setSavings(items.savings || []);
          break;
        case 'debt':
          setDebt(items.debt || []);
          break;
      }
      
      toast.success('Item added successfully');
    } catch (error) {
      toast.error('Error adding item');
    }
  };

  const handleDeleteItem = async (category, itemId) => {
    try {
      await deleteBudgetItem(itemId);
      const items = await getBudgetItems(UserId);
      
      // Update the corresponding state based on category
      switch (category) {
        case 'income':
          setIncome(items.income || []);
          break;
        case 'expenses':
          setExpenses(items.expenses || []);
          break;
        case 'bills':
          setBills(items.bills || []);
          break;
        case 'savings':
          setSavings(items.savings || []);
          break;
        case 'debt':
          setDebt(items.debt || []);
          break;
      }
      
      toast.success('Item deleted successfully');
    } catch (error) {
      toast.error('Error deleting item');
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-8">
            <Summary
              income={income}
              expenses={expenses}
              bills={bills}
              savings={savings}
              debt={debt}
            />
          </div>
      <main className="py-4">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BudgetCard
              title="Income"
              items={income}
              onAddItem={(item) => handleAddItem('income', item)}
              onDeleteItem={(itemId) => handleDeleteItem('income', itemId)}
              color="text-primary-dark"
            />
            
            <BudgetCard
              title="Expenses"
              items={expenses}
              onAddItem={(item) => handleAddItem('expenses', item)}
              onDeleteItem={(itemId) => handleDeleteItem('expenses', itemId)}
              color="text-primary"
            />
            
            <BudgetCard
              title="Bills"
              items={bills}
              onAddItem={(item) => handleAddItem('bills', item)}
              onDeleteItem={(itemId) => handleDeleteItem('bills', itemId)}
              color="text-primary-light"
            />
            
            <BudgetCard
              title="Savings"
              items={savings}
              onAddItem={(item) => handleAddItem('savings', item)}
              onDeleteItem={(itemId) => handleDeleteItem('savings', itemId)}
              color="text-secondary"
            />
            
            <BudgetCard
              title="Debt"
              items={debt}
              onAddItem={(item) => handleAddItem('debt', item)}
              onDeleteItem={(itemId) => handleDeleteItem('debt', itemId)}
              color="text-primary-dark"
            />
          </div>

         
        </div>
      </main>
    </>
  );
}

export default Dashboard;