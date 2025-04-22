import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import { db } from "../../FirebaseConfig"; // Ensure Firestore is configured
import { doc, setDoc, getDoc } from "firebase/firestore";

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
      console.log(userCredential);
      

      // Create a Firestore document for the user
      const userDoc = doc(db, "users", userId);
      await setDoc(userDoc, {
        userName,
        email,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", userName);
      return userCredential;
    } catch (error) {
      console.log(error);
      
      throw new Error("Error signing up: " + error.message);
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Fetch the user's document from Firestore
      const userDoc = doc(db, "users", userId);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const userName = userData.userName;

        // Save the userId and userName to localStorage
        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", userName);
      } else {
        console.log("error", userSnapshot);
        
        throw new Error("User data not found in Firestore.");
      }

      return userCredential;
    } catch (error) {
      console.log(error);
      
      throw new Error("Error logging in: " + error.message);
    }
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
