import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../services/firebaseConfig";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
const googleProvider = new GoogleAuthProvider();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("currenuser", currentuser);
      setUser(currentuser);
      if (currentuser) {
        currentuser.getIdToken().then(setToken);
      } else {
        setToken(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);
  const signUpWithEmailAndPwd = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithEmailAndPwd = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    return signOut(auth);
  };
  const googleSignUp = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signUpWithEmailAndPwd,
        signInWithEmailAndPwd,
        logOut,
        googleSignUp,
        googleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
