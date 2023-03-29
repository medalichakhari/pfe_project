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
// import { UserProvider } from "./context/UserContext";
import JobApplication from "./pages/jobapplication/JobApplication";
import JobPosting from "./pages/jobposting/JobPosting";
import RequireAuth from "./components/RequireAuth";
import UserForm from "./components/userform/UserForm";
import ForgotPassword from "./pages/forgotresetpwd/ForgotPassword";
import ResetPassword from "./pages/forgotresetpwd/ResetPassword";
import CandidatSpace from "./pages/candidatspace/CandidatSpace";
import RecruiterSpace from "./pages/recruiterspace/RecruiterSpace";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        {/* <UserProvider> */}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/candidatspace"
                element={<CandidatSpace />}
              />
              <Route path="/offer/:offerId" element={<JobOffer />} />
              <Route element={<RequireAuth />}>
                <Route
                  path="/offer/:offerId/apply"
                  element={<JobApplication />}
                />
              </Route>
              <Route
                path="/recruiterspace"
                element={<RecruiterSpace />}
              />
              <Route element={<RequireAuth />}>
                <Route path="/postjob" element={<JobPosting />} />
              </Route>
              <Route path="/companies/:categoryId" element={<Companies />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/resetpassword" element={<ResetPassword />} />
              <Route path="/useraccount" element={<UserForm />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        {/* </UserProvider> */}
      </AuthContextProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
