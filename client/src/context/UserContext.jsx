import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { GetUser } from "../lib/fetch";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const { user, token } = useAuth();
  const [company, setCompany] = useState(
    JSON.parse(sessionStorage.getItem("company"))
  );
  const [candidate, setCandidate] = useState(
    JSON.parse(sessionStorage.getItem("candidate"))
  );

  useEffect(() => {
    async function fetchUserData() {
      const userInfo = await GetUser(user?.user_id, token);
      if (userInfo?.societe) {
        sessionStorage.setItem("company", JSON.stringify(userInfo.societe));
        setCompany(userInfo.societe);
      } else {
        sessionStorage.removeItem("societe");
        setCompany(null);
      }
      if (userInfo?.candidat) {
        sessionStorage.setItem("candidate", JSON.stringify(userInfo.candidat));
        setCandidate(userInfo.candidat);
      } else {
        sessionStorage.removeItem("candidate");
        setCandidate(null);
      }
    }

    fetchUserData();
  }, [user, token]);

  return (
    <UserContext.Provider
      value={{ company, setCompany, candidate, setCandidate }}
    >
      {children}
    </UserContext.Provider>
  );
}
