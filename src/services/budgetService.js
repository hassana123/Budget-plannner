import { 
  doc, 
  updateDoc, 
  arrayUnion, 
  getDoc, 
  arrayRemove,
  setDoc 
} from 'firebase/firestore';
import { db } from '../../FirebaseConfig';
import { getMonthNumber } from '../utils/dateHelpers';

/**
 * Add a budget item for any given month and year.
 */
export const addBudgetItem = async (userId, category, item, month, year) => {
  try {
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

/**
 * Retrieve budget items for a specific month and year.
 * If no budget items exist for the selected month, it returns an empty object.
 */
export const getBudgetItems = async (userId, monthKey) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      console.warn("User document does not exist.");
      return {};
    }

    const monthlyBudgets = userDoc.data().monthlyBudgets || {};
    console.log("Fetched monthlyBudgets:", monthlyBudgets);

    if (monthlyBudgets[monthKey]) {
      console.log("Data found for:", monthKey, monthlyBudgets[monthKey]);
      return monthlyBudgets[monthKey];
    } else {
      console.warn(`No data found for monthKey: ${monthKey}`);
      return {}; // Return empty object if no data found
    }
  } catch (error) {
    throw new Error("Error fetching budget items: " + error.message);
  }
};


/**
 * Delete a budget item from a specific month and year.
 */
export const deleteBudgetItem = async (userId, category, itemId, month, year) => {
  try {
    const monthKey = `${year}-${getMonthNumber(month)}`;
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      throw new Error('User document does not exist');
    }

    const monthlyBudgets = userDoc.data().monthlyBudgets || {};
    const categoryItems = (monthlyBudgets[monthKey] && monthlyBudgets[monthKey][category]) || [];

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
