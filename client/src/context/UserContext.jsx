// import { createContext, useContext, useEffect, useState } from "react";
// import { useAuth } from "./AuthContext";

// const UserContext = createContext();
// const { user, token } = useAuth();
// export function useUser() {
//   return useContext(UserContext);
// }

// export function UserProvider({ children }) {
//   const [recruiter, setRecruiter] = useState(
//     JSON.parse(sessionStorage.getItem("recruiter"))
//   );
//   const [candidate, setCandidate] = useState(
//     JSON.parse(sessionStorage.getItem("candidate"))
//   );

//   useEffect(() => {
//     async function fetchUserData() {
//       const userInfo = await GetUser(user?.uid, token);
//       if (userInfo?.recruteur) {
//         sessionStorage.setItem("recruiter", JSON.stringify(userInfo.recruteur));
//         setRecruiter(userInfo.recruteur);
//       } else {
//         sessionStorage.removeItem("recruiter");
//         setRecruiter(null);
//       }
//       if (userInfo?.candidat) {
//         sessionStorage.setItem("candidate", JSON.stringify(userInfo.candidat));
//         setCandidate(userInfo.candidat);
//       } else {
//         sessionStorage.removeItem("candidate");
//         setCandidate(null);
//       }
//     }

//     fetchUserData();
//   }, [user, token]);

//   return (
//     <UserContext.Provider
//       value={{ recruiter, setRecruiter, candidate, setCandidate }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// }
