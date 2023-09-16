import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Home from "./pages/home/Home";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Companies from "./pages/companies/Companies";
import JobOffer from "./pages/joboffer/JobOffer";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import { AuthContextProvider } from "./context/AuthContext";
import { StorageContextProvider } from "./context/StorageContext";
import JobApplication from "./pages/jobapplication/JobApplication";
import JobPosting from "./pages/jobposting/JobPosting";
import RequireAuth from "./components/RequireAuth";
import ForgotPassword from "./pages/forgotresetpwd/ForgotPassword";
import ResetPassword from "./pages/forgotresetpwd/ResetPassword";
import CandidatSpace from "./pages/candidatspace/CandidatSpace";
import RecruiterSpace from "./pages/recruiterspace/RecruiterSpace";
import CompanyAccount from "./pages/companyaccount/CompanyAccount";
import { UserProvider } from "./context/UserContext";
import Candidates from "./pages/candidates/Candidates";
import ChatSystem from "./pages/chatsystem/ChatSystem";
import { ChatContextProvider } from "./features/chat/context/ChatContext";
import JobsByCategory from "./pages/jobsbycategory/JobsByCategory";
import Profile from "./pages/profile/Profile";
import UserAccount from "./pages/signup/UserAccount";
import CandidatAccount from "./pages/candidataccount/CandidatAccount";
import Users from "./pages/dashboard/Users";
import About from "./pages/About";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <UserProvider>
          <StorageContextProvider>
            <ChatContextProvider>
              <BrowserRouter>
                <Routes>
                  // Protected routes
                  <Route element={<RequireAuth />}>
                    <Route path="/profile" element={<Profile />} />
                  </Route>
                  <Route element={<RequireAuth />}>
                    <Route path="/chat" element={<ChatSystem />} />
                  </Route>
                  <Route element={<RequireAuth />}>
                    <Route
                      path="/companyaccount"
                      element={<CompanyAccount />}
                    />
                  </Route>
                  <Route element={<RequireAuth />}>
                    <Route
                      path="/candidateaccount"
                      element={<CandidatAccount />}
                    />
                  </Route>
                  <Route element={<RequireAuth />}>
                    <Route path="/users" element={<Users />} />
                  </Route>
                  // Recruiter protected routes
                  <Route element={<RequireAuth allowedRoles={["recruteur"]} />}>
                    <Route
                      path="/recruiterspace"
                      element={<RecruiterSpace />}
                    />
                  </Route>
                  <Route element={<RequireAuth allowedRoles={["recruteur"]} />}>
                    <Route
                      path="/joboffer/:jobId/candidates"
                      element={<Candidates />}
                    />
                  </Route>
                  <Route element={<RequireAuth allowedRoles={["recruteur"]} />}>
                    <Route path="/postjob" element={<JobPosting />} />
                  </Route>
                  // Candidate protected routes
                  <Route element={<RequireAuth allowedRoles={["candidat"]} />}>
                    <Route path="/candidatespace" element={<CandidatSpace />} />
                  </Route>
                  <Route element={<RequireAuth allowedRoles={["user"]} />}>
                    <Route
                      path="/offer/:offerId/apply/:userId"
                      element={<JobApplication />}
                    />
                  </Route>
                  // Public routes
                  <Route path="/" element={<Home />} />
                  <Route path="/offer/:offerId" element={<JobOffer />} />
                  <Route
                    path="/category/:categoryId/jobs"
                    element={<JobsByCategory />}
                  />
                  <Route path="/companies" element={<Companies />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/forgotpassword" element={<ForgotPassword />} />
                  <Route path="/resetpassword" element={<ResetPassword />} />
                  <Route path="/useraccount" element={<UserAccount />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  // Error routes
                  <Route path="/unauthorized" element={<Unauthorized />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </ChatContextProvider>
          </StorageContextProvider>
        </UserProvider>
      </AuthContextProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
