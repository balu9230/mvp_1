/**
 * Code referenced from Youtube channel: Web Dev Simplified - "React Authentication Crash Course With Firebase And Routing"
 */
import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../../firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  console.log("AuthProvider - |component| (currentUser)"); // @@@@
  console.log(currentUser); // @@@@

  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  console.log("AuthProvider - |component| (loading)"); // @@@@
  console.log(loading); // @@@@
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log("AuthProvider - |useEffect only once| (user)"); // @@@@
      console.log(user); // @@@@
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  
  const value = {
    currentUser,
    signUp,
    signIn,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
