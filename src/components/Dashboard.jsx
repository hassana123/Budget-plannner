// import React, { useState, useEffect } from 'react';
// import Navbar from './Navbar';
// import BudgetCard from './BudgetCard';
// import Summary from './Summary';
// import MonthlyOverview from './MonthlyOverView';
// import MonthSelector from './MonthSelector';
// import { useAuth } from '../context/AuthContext';
// import { getBudgetItems, addBudgetItem, deleteBudgetItem } from '../services/budgetService';
// import { getCurrentMonth } from '../utils/dateHelpers';
// import toast from 'react-hot-toast';

// function Dashboard() {
//   const { user } = useAuth();
//   const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth().month);
//   const [monthlyData, setMonthlyData] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadBudgetItems = async () => {
//       try {
//         setLoading(true);
//         const { year } = getCurrentMonth();
//         const items = await getBudgetItems(user.uid, selectedMonth, year);
//         setMonthlyData(items);
//       } catch (error) {
//         toast.error('Error loading budget items');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadBudgetItems();
//   }, [user, selectedMonth]);

//   const handleAddItem = async (category, item) => {
//     try {
//       if (selectedMonth !== getCurrentMonth().month) {
//         toast.error('You can only add items for the current month');
//         return;
//       }

//       await addBudgetItem(user.uid, category, item);
//       const { year } = getCurrentMonth();
//       const items = await getBudgetItems(user.uid, selectedMonth, year);
//       setMonthlyData(items);
//       toast.success('Item added successfully');
//     } catch (error) {
//       toast.error('Error adding item');
//     }
//   };

//   const handleDeleteItem = async (category, itemId) => {
//     try {
//       if (selectedMonth !== getCurrentMonth().month) {
//         toast.error('You can only delete items for the current month');
//         return;
//       }

//       await deleteBudgetItem(user.uid, category, itemId);
//       const { year } = getCurrentMonth();
//       const items = await getBudgetItems(user.uid, selectedMonth, year);
//       setMonthlyData(items);
//       toast.success('Item deleted successfully');
//     } catch (error) {
//       toast.error('Error deleting item');
//     }
//   };

//   if (loading) {
//     return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
//   }

//   return (
//     <>
//       <Navbar />
//       <main className="container mx-auto px-6 py-8">
//         <MonthSelector 
//           selectedMonth={selectedMonth} 
//           onMonthSelect={setSelectedMonth} 
//         />
        
//         <MonthlyOverview monthlyData={monthlyData} />
        
//         <Summary
//           income={monthlyData.income || []}
//           expenses={monthlyData.expenses || []}
//           bills={monthlyData.bills || []}
//           savings={monthlyData.savings || []}
//           debt={monthlyData.debt || []}
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//           <BudgetCard
//             title="Income"
//             items={monthlyData.income || []}
//             onAddItem={(item) => handleAddItem('income', item)}
//             onDeleteItem={(itemId) => handleDeleteItem('income', itemId)}
//             color="text-primary-dark"
//             disabled={selectedMonth !== getCurrentMonth().month}
//           />
          
//           <BudgetCard
//             title="Expenses"
//             items={monthlyData.expenses || []}
//             onAddItem={(item) => handleAddItem('expenses', item)}
//             onDeleteItem={(itemId) => handleDeleteItem('expenses', itemId)}
//             color="text-primary"
//             disabled={selectedMonth !== getCurrentMonth().month}
//           />
          
//           <BudgetCard
//             title="Bills"
//             items={monthlyData.bills || []}
//             onAddItem={(item) => handleAddItem('bills', item)}
//             onDeleteItem={(itemId) => handleDeleteItem('bills', itemId)}
//             color="text-primary-light"
//             disabled={selectedMonth !== getCurrentMonth().month}
//           />
          
//           <BudgetCard
//             title="Savings"
//             items={monthlyData.savings || []}
//             onAddItem={(item) => handleAddItem('savings', item)}
//             onDeleteItem={(itemId) => handleDeleteItem('savings', itemId)}
//             color="text-secondary"
//             disabled={selectedMonth !== getCurrentMonth().month}
//           />
          
//           <BudgetCard
//             title="Debt"
//             items={monthlyData.debt || []}
//             onAddItem={(item) => handleAddItem('debt', item)}
//             onDeleteItem={(itemId) => handleDeleteItem('debt', itemId)}
//             color="text-primary-dark"
//             disabled={selectedMonth !== getCurrentMonth().month}
//           />
//         </div>
//       </main>
//     </>
//   );
// }

// export default Dashboard;