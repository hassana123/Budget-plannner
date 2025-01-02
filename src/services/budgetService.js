import { 
    doc, 
    updateDoc, 
    arrayUnion, 
    getDoc, 
    arrayRemove 
  } from 'firebase/firestore';
  import { db } from '../../FirebaseConfig';
  
  // Add a budget item to the user's document in the `users` collection
  export const addBudgetItem = async (userId, category, item) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const budgetItem = {
        id: `${new Date().getTime()}`, // Unique ID for the item
        category,
        description: item.description,
        amount: item.amount,
        createdAt: new Date().toISOString(),
      };
  
      await updateDoc(userDocRef, {
        budgetItems: arrayUnion(budgetItem),
      });
    } catch (error) {
      throw new Error('Error adding budget item: ' + error.message);
    }
  };
  
  // Fetch all budget items grouped by category from the user's document
  export const getBudgetItems = async (userId) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
  
      if (!userDoc.exists()) {
        throw new Error('User document does not exist');
      }
  
      const budgetItems = userDoc.data().budgetItems || [];
      const items = {};
  
      budgetItems.forEach((item) => {
        if (!items[item.category]) {
          items[item.category] = [];
        }
        items[item.category].push(item);
      });
  
      return items;
    } catch (error) {
      throw new Error('Error fetching budget items: ' + error.message);
    }
  };
  
  // Delete a budget item from the user's document in the `users` collection
  export const deleteBudgetItem = async (userId, itemId) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
  
      if (!userDoc.exists()) {
        throw new Error('User document does not exist');
      }
  
      const budgetItems = userDoc.data().budgetItems || [];
      const itemToDelete = budgetItems.find((item) => item.id === itemId);
  
      if (!itemToDelete) {
        throw new Error('Item not found');
      }
  
      await updateDoc(userDocRef, {
        budgetItems: arrayRemove(itemToDelete),
      });
    } catch (error) {
      throw new Error('Error deleting budget item: ' + error.message);
    }
  };
  