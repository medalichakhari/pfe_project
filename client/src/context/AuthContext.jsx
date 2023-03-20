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
import LoadingSpinner from "../components/shared/LoadingSpinner";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
const googleProvider = new GoogleAuthProvider();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("currenuser", currentuser);
      if (currentuser) {
        setUser(currentuser);
        currentuser.getIdToken().then(setToken);
      } else {
        setUser(null);
        setToken(null);
      }
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signUpWithEmailAndPwd = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithEmailAndPwd = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = async () => {
    await signOut(auth);
    setUser(null);
  };
  const googleSignUp = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
