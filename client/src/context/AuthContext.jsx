import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
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
  const [currentUser, setCurrenUser] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentuser) => {
      if (currentuser) {
        setCurrenUser(currentuser);
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

  const refreshUser = async () => {
    if (currentUser) {
      const idTokenResult = await currentUser.getIdTokenResult(true);
      setUser(idTokenResult.claims);
      setToken(idTokenResult.token);
    }
  };

  const signUpWithEmailAndPwd = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithEmailAndPwd = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const updateProfile = (updatedProfile) => {
    return auth.currentUser.updateProfile(updatedProfile);
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        user,
        token,
        signUpWithEmailAndPwd,
        signInWithEmailAndPwd,
        updateProfile,
        logOut,
        googleSignUp,
        googleSignIn,
        forgotPassword,
        resetPassword,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
