import { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { useQuery } from "react-query";
import { GetUser } from "../lib/fetch";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const { user, token } = useAuth();

  const { data, isLoading, isError, refetch } = useQuery(
    ["getUserData", user?.user_id, token],
    () => GetUser(user?.user_id, token)
  );

  const value = {
    company: data?.societe || null,
    setCompany: (company) => {
      if (company) {
        sessionStorage.setItem("company", JSON.stringify(company));
      } else {
        sessionStorage.removeItem("company");
      }
      return data?.societe || null;
    },
    candidate: data?.candidat || null,
    setCandidate: (candidate) => {
      if (candidate) {
        sessionStorage.setItem("candidate", JSON.stringify(candidate));
      } else {
        sessionStorage.removeItem("candidate");
      }
      return data?.candidat || null;
    },
    refresh: refetch,
  };

  if (isLoading) {
    // You could show a loading spinner or skeleton component here
    return <div>Loading...</div>;
  }

  if (isError) {
    // You could show an error message here
    return <div>Error fetching user data</div>;
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
