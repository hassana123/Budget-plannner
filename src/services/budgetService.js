import { 
  doc, 
  updateDoc, 
  arrayUnion, 
  getDoc, 
  arrayRemove,
  setDoc 
} from 'firebase/firestore';
import { db } from '../../FirebaseConfig';
import { getCurrentMonth, getMonthNumber } from '../utils/dateHelpers';

export const addBudgetItem = async (userId, category, item) => {
  try {
    const { month, year } = getCurrentMonth();
    const monthKey = `${year}-${getMonthNumber(month)}`;
    
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        monthlyBudgets: {}
      });
    }

    const budgetItem = {
      id: `${new Date().getTime()}`,
      category,
      description: item.description,
      amount: item.amount,
      createdAt: new Date().toISOString(),
    };

    await updateDoc(userDocRef, {
      [`monthlyBudgets.${monthKey}.${category}`]: arrayUnion(budgetItem)
    });
  } catch (error) {
    throw new Error('Error adding budget item: ' + error.message);
  }
};

export const getBudgetItems = async (userId, month, year) => {
  try {
    const monthKey = `${year}-${getMonthNumber(month)}`;
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        monthlyBudgets: {}
      });
      return {};
    }

    const monthlyBudgets = userDoc.data().monthlyBudgets || {};
    return monthlyBudgets[monthKey] || {};
  } catch (error) {
    throw new Error('Error fetching budget items: ' + error.message);
  }
};

export const deleteBudgetItem = async (userId, category, itemId) => {
  try {
    const { month, year } = getCurrentMonth();
    const monthKey = `${year}-${getMonthNumber(month)}`;
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      throw new Error('User document does not exist');
    }

    const monthlyBudgets = userDoc.data().monthlyBudgets || {};
    const currentMonthBudget = monthlyBudgets[monthKey] || {};
    const categoryItems = currentMonthBudget[category] || [];
    const itemToDelete = categoryItems.find(item => item.id === itemId);

    if (!itemToDelete) {
      throw new Error('Item not found');
    }

    await updateDoc(userDocRef, {
      [`monthlyBudgets.${monthKey}.${category}`]: arrayRemove(itemToDelete)
    });
  } catch (error) {
    throw new Error('Error deleting budget item: ' + error.message);
  }
};