import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

const provider = new GoogleAuthProvider();
export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signUpWithGmail = () => {
    return signInWithPopup(auth, provider);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const updateUserProfile = (user, name, photoURL) => {
    return updateProfile(user, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      if (currentuser) {
        setuser(currentuser);
        const userInfo = { email: currentuser.email };
        axios
          .post("http://localhost:7781/jwt", userInfo)
          .then(function (response) {
            if (response.data.token) {
              localStorage.setItem("access-token", response.data.token);
            } else {
              localStorage.removeItem("access-token");
            }
          });
        setLoading(false);
      } else {
        setuser(null);
        setLoading(false);
      }
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    createUser,
    signUpWithGmail,
    updateUserProfile,
    login,
    logout,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
