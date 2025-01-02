import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import { db } from "../../FirebaseConfig"; // Ensure Firestore is configured
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (userName, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;

      // Create a Firestore document for the user
      const userDoc = doc(db, "users", userId);
      await setDoc(userDoc, {
        userName,
        email,
        createdAt: new Date().toISOString(),
        budgetData: [], // Initial placeholder for user's budget data
      });
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", userName);
      return userCredential;
    } catch (error) {
      throw new Error("Error signing up: " + error.message);
    }
  };

  const login = (email, password) => {
   /// console.log(auth.uid);

    localStorage.setItem("userId", auth.currentUser.uid);

    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    user,
    signup,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
