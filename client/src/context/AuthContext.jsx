import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  confirmPasswordReset,
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
    const unsubscribe = onAuthStateChanged(auth, async (currentuser) => {
      if (currentuser) {
        const idTokenResult = await currentuser.getIdTokenResult(true);
        setUser(idTokenResult.claims);
        setToken(idTokenResult.token);
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
  const forgotPassword = (email) => {
    sendPasswordResetEmail(auth, email, {
      url: "http://localhost:5173/resetpassword",
    });
  };
  const resetPassword = (oobCode, newPassword) => {
    return confirmPasswordReset(auth, oobCode, newPassword);
  };
  const refreshToken = () => {
    return auth.currentUser.getIdToken(true);
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
        forgotPassword,
        resetPassword,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
