const STORAGE_KEY = 'ramadanPlanner2024';

export function saveToLocalStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function loadFromLocalStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
}

export function clearLocalStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}